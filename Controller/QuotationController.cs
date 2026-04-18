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

    // Controllers/QuotationController.cs
  
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
        [Authorize(Roles = "Company")]
        public async Task<IActionResult> Generate([FromBody] QoutationDTO model)
        {
            // Handle logo
          
               // byte[]? logoBytes = null;
            //if (model.CompanyLogo != null)
            //{
              //  using var ms = new MemoryStream();
               // await model.CompanyLogo.CopyToAsync(ms);
                //logoBytes = ms.ToArray();
            //}




            // Save to wwwroot/pdfs/
            var pdfFolder = Path.Combine(_env.WebRootPath, "pdfs");
            Directory.CreateDirectory(pdfFolder);
            var fileName = $"QUO-{model.QuotationNumber}-{DateTime.Now:yyyyMMddHHmmss}.pdf";
            var filePath = Path.Combine(pdfFolder, fileName);
           

            var pdfUrl = $"{Request.Scheme}://{Request.Host}/pdfs/{fileName}";
              var QouotationModel = model.ToQuotationRequest(pdfUrl);
              
            // Generate PDF
              
         //  var pdfBytes = _pdfService.Generate(QouotationModel,logoBytes);
            //await System.IO.File.WriteAllBytesAsync(filePath, pdfBytes);

             Console.WriteLine("Financial Items : " + QouotationModel.FinancialItems.Count);

            await  _context.QuotationRequests.AddAsync(QouotationModel);
            await _context.SaveChangesAsync();


            return Ok(new { pdfUrl, fileName });



        }
        [HttpGet("getQuotations")]
        public async Task<IActionResult> GetQuotations()
        {
            var quotations = await _context.QuotationRequests.Select(p=>p.PDFurl).ToListAsync();
            return Ok(quotations);  
        }


   [HttpGet("getQuotationsByProjectId")]
        public async Task<IActionResult> GetUserQuotations()
        {
            var getEmail = User.GetEmail();
            var findUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == getEmail);
            if (findUser == null)            {
                return NotFound("User Not Found");
            }
            var quotations = await _context.QuotationRequests
                .Where(q => q.UserId == findUser.Id)
                .ToListAsync();

            if (quotations == null || quotations.Count == 0)
            {
                return NotFound("No quotations found for the specified project ID.");
            }

            return Ok(quotations);
        }



    }




}

