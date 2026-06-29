using Api.DTO;
using RegionServices.DTO;
namespace RegionServices.Interface
{
    public interface IQuotations
    {
        public Task<List<QuotationRequest>> GetQuotations(string SearchByEmail);
        public Task<string> GeneratePDFQuotation(QoutationDTO model, string SearchByEmail, string Url);

    }
}