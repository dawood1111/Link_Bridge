using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegionServicesapi.DBcontext;
using RegionServicesapi.DTO;
using RegionServicesapi.Mapper;

namespace RegionServicesapi.Controller
{
    [ApiController]
    [Route("SubServices")]
    public class SubServicesController : ControllerBase
    {
        private readonly ApplicationDBcontext _context;
        public SubServicesController(ApplicationDBcontext context)
        {
            _context = context;


        }
        [HttpPatch("AddSubServices")]
        public async Task<IActionResult> Create([FromBody] SubServiceDto subServiceDto)
        {
            var FindCategoryId = _context.Services.FirstOrDefaultAsync(ci => ci.ServicesName == subServiceDto.ServicesName);
            var SubServiceModel = subServiceDto.ToSubSErvices(FindCategoryId.Id);
            await _context.SubCategories.AddAsync(SubServiceModel);
            await _context.SaveChangesAsync();
            return Ok(SubServiceModel);
        }

    }
}