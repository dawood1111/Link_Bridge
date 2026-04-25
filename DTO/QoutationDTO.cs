namespace Api.DTO
{
    public class QoutationDTO
    {    

    // Header
    public int Id { get; set; }
    // Header
    public string QuotationNumber { get; set; }
    public DateTime Date { get; set; }

   

    // Company Info
    public string CompanyName { get; set; }
    public string CompanyEmail { get; set; }

    // Client Info
   
    public string ClientCompany { get; set; }


    // Company History
    public string CompanyHistory { get; set; }      // paragraph text
 
    public List<string> KeyAchievements { get; set; }

   
    // Financial Section
    public List<FinancialItemsDTO>? FinancialItems { get; set; } 
    

    // ── TERMS ────────────────────────────────
    public string PaymentTerms { get; set; }     // "50% upfront, 50% on delivery"
    public string DeliveryTimeline { get; set; } // "6 weeks from signing"
    public string TermsAndConditions { get; set; }
    public string Notes { get; set; }


        // ── FINANCIAL ────────────────────────────
    public decimal DiscountPercentage { get; set; }   // optional
    public decimal TaxPercentage { get; set; }        // VAT or any tax
    public string TaxLabel { get; set; } = "VAT";    // "VAT", "GST", "Tax", etc.
    public string Currency { get; set; } = "USD";


    public String PDFurl { get; set; }

    public String UserId { get; set; }
    public int ProjectId { get; set; }

    public int? AboutCompaniesId { get; set; }

        
    }
}