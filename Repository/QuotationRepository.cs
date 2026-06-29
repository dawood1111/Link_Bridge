using Api.DTO;
using Api.Services;
using RegionServices.Mapper;
using Microsoft.EntityFrameworkCore;
using RegionServices.DBcontext;
using RegionServices.Interface;
using Api.Mapper;

namespace RegionServices.Repository
{
    public class QuotationRepository : IQuotations
    {
        private readonly ApplicationDBcontext _context;
        private readonly QuotationPDFServices _pdfService;
        private readonly IWebHostEnvironment _env;
        public QuotationRepository(ApplicationDBcontext context, QuotationPDFServices PDFServices, IWebHostEnvironment env)
        {
            _context = context;
            _pdfService = PDFServices;
            _env = env;

        }
        public async Task<List<QuotationRequest>> GetQuotations(string SearchByEmail)
        {
            var findUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == SearchByEmail);
            if (findUser == null)
            {
                return null;
            }
            var Quotation = await _context.QuotationRequests
                 .Where(q => q.UserId == findUser.Id)
                 .Include(q => q.ProjectPosts)
                 .ToListAsync();

            return Quotation;

        }
        public async Task<string> GeneratePDFQuotation(QoutationDTO model, string SearchByEmail, string Url)
        {

            var findUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == SearchByEmail);

            if (findUser == null)
            {
                return "User Not Found";

            }

            var Company = await _context.AboutCompanies.FirstOrDefaultAsync(c => c.UserId == findUser.Id);

            if (Company == null)
            {
                return "Company Not Found";
            }
            var AboutComapnyId = Company.Id;




            // Save to wwwroot/pdfs/
            var pdfFolder = Path.Combine(_env.WebRootPath, "pdfs");
            Directory.CreateDirectory(pdfFolder);
            var fileName = $"QUO-{model.QuotationNumber}-{DateTime.Now:yyyyMMddHHmmss}.pdf";
            var filePath = Path.Combine(pdfFolder, fileName);


            var pdfUrl = $"{Url}/pdfs/{fileName}";
            var QouotationModel = model.ToQuotationRequest
            (
                pdfUrl,
               Company.CompanyLogo,
               AboutComapnyId,
               Company.CompanyName,
               findUser.Email);

            byte[]? logoBytes = null;
            if (!string.IsNullOrEmpty(Company.CompanyLogo))
            {
                var logoPath = Path.Combine(_env.WebRootPath, "logos", Company.CompanyLogo);
                if (System.IO.File.Exists(logoPath))
                    logoBytes = await System.IO.File.ReadAllBytesAsync(logoPath);

            }

            // Generate PDF

            var pdfBytes = _pdfService.Generate(QouotationModel, logoBytes);
            await System.IO.File.WriteAllBytesAsync(filePath, pdfBytes);



            await _context.QuotationRequests.AddAsync(QouotationModel);
            await _context.SaveChangesAsync();
            return "Generated Successfully";

        }

    }
}