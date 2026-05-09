using Api.DTO;

namespace Api.Mapper
{
    public static class QouatinoMapper
    {
        public static QuotationRequest ToQuotationRequest(this QoutationDTO  dto, String pdfUrl , String CompanyLogo,int AboutComapnyId, String compnyName, String companyEmail)
        {
         return new QuotationRequest
            {
                QuotationNumber = dto.QuotationNumber,
                Date = dto.Date,
                CompanyName = compnyName,
                CompanyEmail = companyEmail,
                ClientCompany = dto.ClientCompany,
                CompanyHistory = dto.CompanyHistory,
                KeyAchievements = dto.KeyAchievements,
                PaymentTerms = dto.PaymentTerms,
                DeliveryTimeline = dto.DeliveryTimeline,
                TermsAndConditions = dto.TermsAndConditions,
                Notes = dto.Notes,
                DiscountPercentage = dto.DiscountPercentage,
                TaxPercentage = dto.TaxPercentage,
                TaxLabel = dto.TaxLabel,
                Currency = dto.Currency,
                ProjectId = dto.ProjectId,
                UserId = dto.UserId,
                
                FinancialItems = dto.FinancialItems.Select(fi => new FinancialItem
                {
                    ItemNo = fi.ItemNo,
                    Description = fi.Description,
                    Unit = fi.Unit,
                    Quantity = fi.Quantity,
                    UnitPrice = fi.UnitPrice,
                    

                }).ToList()
                ,
                PDFurl = pdfUrl,
                CompanyLogo =CompanyLogo,
                AboutCompaniesId = AboutComapnyId
            };
        }
     
    }
}