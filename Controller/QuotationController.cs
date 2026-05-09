//using System.Reflection.Metadata;
using Api.DTO;
using Api.Mapper;
using Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegionServices.DBcontext;
using RegionServices.Extension;

namespace Api.Controller
{

    //Controllers/QuotationController.cs

    [ApiController]
    [Route("api/quotations")]
    public class QuotationController : ControllerBase
    {
        private readonly QuotationPDFServices _pdfService;
        private readonly IWebHostEnvironment _env;
        private readonly ApplicationDBcontext _context;

        public QuotationController(QuotationPDFServices pdfService, IWebHostEnvironment env, ApplicationDBcontext context)
        {
            _pdfService = pdfService;
            _env = env;
            _context = context;
        }

        [HttpPost("generate")]
        public async Task<IActionResult> Generate([FromBody] QoutationDTO model)
        {
            var getEmail = User.GetEmail();
            var findUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == getEmail);

            if (findUser == null)
            {
                return NotFound("User Not Found");

            }

            var Company = await _context.AboutCompanies.FirstOrDefaultAsync(c => c.UserId == findUser.Id);

            if (Company == null)
            {
                return NotFound("Company Not Found");
            }
            var AboutComapnyId = Company.Id;




            // Save to wwwroot/pdfs/
            var pdfFolder = Path.Combine(_env.WebRootPath, "pdfs");
            Directory.CreateDirectory(pdfFolder);
            var fileName = $"QUO-{model.QuotationNumber}-{DateTime.Now:yyyyMMddHHmmss}.pdf";
            var filePath = Path.Combine(pdfFolder, fileName);


            var pdfUrl = $"{Request.Scheme}://{Request.Host}/pdfs/{fileName}";
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


            return Ok(new { pdfUrl, fileName });




        }



        [HttpGet("getQuotationsByProject")]
        [Authorize]
        public async Task<IActionResult> GetUserQuotations()
        {
            var getEmail = User.GetEmail();
            var findUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == getEmail);
            if (findUser == null)
            {
                return NotFound("User Not Found");
            }
            var quotations = await _context.QuotationRequests
                .Where(q => q.UserId == findUser.Id)
                .Include(q => q.ProjectPosts)
                .ToListAsync();


            return Ok(quotations);
        }
    }
}

