using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace Api.Services
{
    public class QuotationPDFServices
    {
        public byte[] Generate(QuotationRequest q, byte[]? logoBytes)
        {
            QuestPDF.Settings.License = LicenseType.Community;

            var subtotal = q.FinancialItems.Sum(i => i.Total);
            var discount = subtotal * (q.DiscountPercentage / 100);
            var taxBase = subtotal - discount;
            var tax = taxBase * (q.TaxPercentage / 100);
            var grandTotal = taxBase + tax;

            return QuestPDF.Fluent.Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(1.5f, Unit.Centimetre);
                    page.DefaultTextStyle(x => x.FontSize(10).FontFamily("Arial"));

                    page.Header().Element(h => BuildHeader(h, q, logoBytes));
                    page.Content().Element(c => BuildContent(c, q, subtotal, discount, tax, grandTotal));
                    page.Footer().Element(f => BuildFooter(f));
                });
            }).GeneratePdf();
        }

        // ── HEADER ──────────────────────────────────────────
        private void BuildHeader(IContainer c, QuotationRequest q, byte[]? logo)
        {
            c.Column(col =>
            {
                col.Item().Row(row =>
                {
                    if (logo != null)
                        row.ConstantItem(90).Image(logo).FitWidth();

                    row.RelativeItem().PaddingLeft(10).Column(info =>
                    {
                        info.Item().Text(q.CompanyName).FontSize(16).Bold().FontColor("#1a3c6e");
                        info.Item().Text($" {q.CompanyEmail}").FontSize(9);
                    });

                    row.ConstantItem(130).Column(badge =>
                    {
                        badge.Item().Background("#1a3c6e").Padding(8)
                            .Text("QUOTATION").FontSize(15).Bold()
                            .FontColor(Colors.White).AlignCenter();

                        badge.Item().Border(1).BorderColor(Colors.Grey.Lighten2)
                            .Padding(6).Column(meta =>
                            {
                                MetaRow(meta, "Ref :", q.QuotationNumber);
                                MetaRow(meta, "Date:", q.Date.ToString("dd MMM yyyy"));

                            });
                    });
                });

                col.Item().PaddingTop(6).Background("#1a3c6e").Height(3);
            });
        }

        // ── CONTENT ─────────────────────────────────────────
        private void BuildContent(IContainer c, QuotationRequest q,
            decimal subtotal, decimal discount, decimal tax, decimal grandTotal)
        {
            c.Column(col =>
            {
                col.Spacing(10);

                // Client Info
                col.Item().Element(e => BuildInfoBox(e, "PREPARED FOR", new[]
                {

                    q.ClientCompany,

                }));

                // Company Profile
                col.Item().Element(e => BuildSection(e, "COMPANY PROFILE", body =>
                {
                    body.Item().Text(q.CompanyHistory).LineHeight(1.5f).FontSize(9);



                    if (q.KeyAchievements.Any())
                    {
                        body.Item().PaddingTop(4).Text("Key Achievements:").Bold().FontSize(9);
                        foreach (var achievement in q.KeyAchievements)
                            body.Item().Text($"  - {achievement}").FontSize(9);
                    }
                }));


                col.Item().Element(e => BuildSection(e, "SCOPE OF WORK & PRICING", body =>
                {
                    body.Item().Table(table =>
                    {
                        table.ColumnsDefinition(cols =>
                        {
                            cols.ConstantColumn(35);   // Item No
                            cols.RelativeColumn(4);    // Description
                            cols.ConstantColumn(40);   // Unit
                            cols.ConstantColumn(55);   // Qty
                            cols.ConstantColumn(75);   // Unit Price
                            cols.ConstantColumn(75);   // Total
                        });

                        // Table header
                        table.Header(header =>
                        {
                            foreach (var h in new[]
                            {
                                "Item", "Description", "Unit", "Qty",
                                $"Unit Price\n({q.Currency})",
                                $"Total\n({q.Currency})"
                            })
                                header.Cell().Background("#2d5fa8").Padding(5)
                                    .Text(h).Bold().FontColor(Colors.White).FontSize(8);
                        });

                        // Table rows
                        bool alt = false;
                        foreach (var item in q.FinancialItems)
                        {
                            var bg = alt ? Colors.Grey.Lighten4 : Colors.White;
                            table.Cell().Background(bg).Padding(4).Text(item.ItemNo).FontSize(9);
                            table.Cell().Background(bg).Padding(4).Text(item.Description).FontSize(9);
                            table.Cell().Background(bg).Padding(4).AlignCenter().Text(item.Unit).FontSize(9);
                            table.Cell().Background(bg).Padding(4).AlignRight().Text(item.Quantity.ToString("N2")).FontSize(9);
                            table.Cell().Background(bg).Padding(4).AlignRight().Text(item.UnitPrice.ToString("N2")).FontSize(9);
                            table.Cell().Background(bg).Padding(4).AlignRight().Text(item.Total.ToString("N2")).FontSize(9).Bold();
                            alt = !alt;
                        }
                    });

                }));

                // Financial Summary
                col.Item().Element(e => BuildSection(e, "FINANCIAL SUMMARY", body =>
                {
                    body.Item().AlignCenter().Width(250).Column(totals =>
                    {
                        TotalRow(totals, "Subtotal:", $"{subtotal:N2} {q.Currency}");

                        if (q.DiscountPercentage > 0)
                            TotalRow(totals,
                                $"Discount ({q.DiscountPercentage}%):",
                                $"-{discount:N2} {q.Currency}",
                                "#c0392b");

                        if (q.TaxPercentage > 0)
                            TotalRow(totals,
                                $"{q.TaxLabel} ({q.TaxPercentage}%):",
                                $"{tax:N2} {q.Currency}");

                        totals.Item().Background("#1a3c6e").Padding(7).Row(row =>
                        {
                            row.RelativeItem().Text("GRAND TOTAL")
                                .Bold().FontColor(Colors.White).FontSize(11);
                            row.ConstantItem(110).AlignRight()
                                .Text($"{grandTotal:N2} {q.Currency}")
                                .Bold().FontColor(Colors.White).FontSize(11);
                        });
                    });


                }));

                // Terms & Conditions
                if (!string.IsNullOrEmpty(q.TermsAndConditions))
                    col.Item().Element(e => BuildSection(e, "TERMS & CONDITIONS", (body =>
                    {
                        body.Item().Text("Terms And Condition").Bold().FontSize(9);
                        body.Item().Text(q.TermsAndConditions).FontSize(9).LineHeight(1.5f);
                        if (!string.IsNullOrEmpty(q.PaymentTerms) || !string.IsNullOrEmpty(q.DeliveryTimeline))
                        {
                            body.Item().PaddingTop(10).Row(row =>
                            {
                                if (!string.IsNullOrEmpty(q.PaymentTerms))
                                    row.RelativeItem().Column(c2 =>
                                    {
                                        c2.Item().Text("Payment Terms").Bold().FontSize(9);
                                        c2.Item().Text(q.PaymentTerms).FontSize(9);
                                    });

                                if (!string.IsNullOrEmpty(q.DeliveryTimeline))
                                    row.RelativeItem().Column(c2 =>
                                    {
                                        c2.Item().Text("Delivery / Execution Period").Bold().FontSize(9);
                                        c2.Item().Text(q.DeliveryTimeline).FontSize(9);
                                    });
                            });
                        }

                    })
                    ));


                // Notes
                if (!string.IsNullOrEmpty(q.Notes))
                    col.Item().Background(Colors.Yellow.Lighten4).Border(1)
                        .BorderColor(Colors.Yellow.Darken2).Padding(8)
                        .Text($"Note: {q.Notes}").FontSize(9).Italic();

                // Signatures
                col.Item().PaddingTop(20).Row(row =>
                {
                    row.RelativeItem().Column(sig =>
                    {
                        sig.Item().Text("Authorized Signature").Bold().FontSize(9);
                        sig.Item().PaddingTop(25).BorderBottom(1).Width(160);
                        sig.Item().PaddingTop(4).Text(q.CompanyName).FontSize(9);
                    });

                    row.RelativeItem().Column(sig =>
                    {
                        sig.Item().Text("Client Acceptance").Bold().FontSize(9);
                        sig.Item().PaddingTop(25).BorderBottom(1).Width(160);

                        sig.Item().Text("Date: _______________").FontSize(9);
                    });
                });
            });
        }

        // ── HELPER METHODS ───────────────────────────────────
        private void BuildInfoBox(IContainer c, string title, string[] lines)
        {
            c.Background(Colors.Grey.Lighten4).Padding(8).Column(col =>
            {
                col.Item().Text(title).Bold().FontSize(8).FontColor(Colors.Grey.Darken2);
                foreach (var line in lines.Where(l => !string.IsNullOrEmpty(l)))
                    col.Item().Text(line).FontSize(9);
            });
        }

        private void BuildSection(IContainer c, string title, Action<ColumnDescriptor> body)
        {
            c.Column(col =>
            {
                col.Item().Background("#1a3c6e").Padding(6)
                    .Text(title).Bold().FontColor(Colors.White).FontSize(10);
                col.Item().Border(1).BorderColor(Colors.Grey.Lighten2)
                    .Padding(10).Column(body);
            });
        }

        private void TotalRow(ColumnDescriptor col, string label, string value, string color = "#000000")
        {
            col.Item().BorderBottom(1).BorderColor(Colors.Grey.Lighten2).Padding(5).Row(row =>
            {
                row.RelativeItem().Text(label).FontSize(9);
                row.ConstantItem(110).AlignRight().Text(value).FontSize(9).FontColor(color);
            });
        }

        private void MetaRow(ColumnDescriptor col, string label, string value)
        {
            col.Item().Row(row =>
            {
                row.ConstantItem(55).Text(label).Bold().FontSize(8);
                row.RelativeItem().Text(value).FontSize(8);
            });
        }

        private void BuildFooter(IContainer c)
        {
            c.BorderTop(1).BorderColor(Colors.Grey.Lighten2).PaddingTop(5).Row(row =>
            {
                row.RelativeItem()
                    .Text("This is a computer-generated quotation.")
                    .FontSize(8).Italic().FontColor(Colors.Grey.Darken1);

                row.ConstantItem(80).AlignRight().Text(x =>
                {
                    x.Span("Page ").FontSize(8);
                    x.CurrentPageNumber().FontSize(8);
                    x.Span(" / ").FontSize(8);
                    x.TotalPages().FontSize(8);
                });
            });
        }
    }
}