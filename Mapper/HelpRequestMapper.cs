using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Hosting.Internal;
using RegionServicesapi.DTO;
using RegionServicesapi.Model;

namespace RegionServicesapi.Mapper
{
    public static class HelpRequestMapper
    {
        public static async Task<HelpRequest> ToHelpRequest(this HelpRequestDto helpRequestDto, int ServiceId, IWebHostEnvironment hostEnvironment, string userId)
        {

            var request = new HelpRequest
            {
                Region = helpRequestDto.Region,
                Description = helpRequestDto.Description,
                ServiceId = ServiceId,
                PostDate = DateTime.UtcNow,
                ImagePosts = new List<ImagePost>(),
                UserId = userId
            };
            if (string.IsNullOrEmpty(hostEnvironment.WebRootPath))
            {
                throw new Exception("WebRootPath is null. Make sure IWebHostEnvironment is properly injected.");
            }

            if (helpRequestDto.Image != null && helpRequestDto.Image.Count > 0)
            {
                var uploadPath = Path.Combine(hostEnvironment.WebRootPath, "upload/helpRequest");


                if (!Directory.Exists(uploadPath))
                    Directory.CreateDirectory(uploadPath);
                foreach (var image in helpRequestDto.Image)
                {
                    if (image.Length > 0)
                    {
                        var uniqeFileName = $"{Guid.NewGuid()}{Path.GetExtension(image.FileName)}";
                        var filePath = Path.Combine(uploadPath, uniqeFileName);
                        using (var Stream = new FileStream(filePath, FileMode.Create))
                        {
                            await image.CopyToAsync(Stream);
                        }
                        request.ImagePosts.Add(new ImagePost
                        {
                            ImagePath = $"/upload/helpRequest/{uniqeFileName}"

                        });

                    }
                }
            }

            return request;


        }

    }
}