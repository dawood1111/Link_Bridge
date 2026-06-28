//using System.Reflection.Metadata;
using Api.DTO;
using Api.Mapper;
using Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegionServices.DBcontext;
using RegionServices.Extension;
using RegionServices.Interface;

namespace Api.Controller
{

    //Controllers/QuotationController.cs

    [ApiController]
    [Route("api/quotations")]
    public class QuotationController : ControllerBase
    {

        private readonly ApplicationDBcontext _context;
        private readonly IQuotations _IQuotation;

        public QuotationController(ApplicationDBcontext context, IQuotations IQuotation)
        {

            _context = context;
            _IQuotation = IQuotation;
        }

        [HttpPost("generate")]
        public async Task<IActionResult> Generate([FromBody] QoutationDTO model)
        {
            var getEmail = User.GetEmail();
            var Url = $"{Request.Scheme}://{Request.Host}";
            var result = await _IQuotation.GeneratePDFQuotation(model, getEmail, Url);
            if (result != "Generated Successfully")
                return BadRequest(result);

            return Ok("Generated Successfully");




        }

        [HttpGet("getQuotationsByProject")]
        [Authorize]
        public async Task<IActionResult> GetUserQuotations()
        {
            var getEmail = User.GetEmail();
            var Quotation = await _IQuotation.GetQuotations(getEmail);
            return Ok(Quotation);
        }


        [Authorize]
        [HttpDelete("DeleteQuotationsRequest")]
        public async Task<IActionResult> DeleteQuotationRequest(int Id)
        {


            var FindUser = await _context.QuotationRequests.FindAsync(Id);

            if (FindUser == null)
            {
                return NotFound("No User With That Id");
            }
            _context.QuotationRequests.Remove(FindUser);
            await _context.SaveChangesAsync();
            return Ok("Deleted Successfully");
        }
    }
}
;
