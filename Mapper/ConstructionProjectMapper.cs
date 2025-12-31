using Microsoft.VisualBasic;
using RegionServicesapi.DTO;
using RegionServicesapi.Model;
namespace RegionServicesapi.Mapper
{
     public static class EngineerProjectMapper
    {
        public static ConstructionProject ToEngineerProject(this EngineerProjectDTO projectEngineerDTO,string userId, IWebHostEnvironment hostEnvironment)
        {
             var NewConstructionProject= new ConstructionProject
            {
                ProjectTitle=projectEngineerDTO.ProjectTitle,
                ProjectDescription=projectEngineerDTO.ProjectDescription,
                ProjectLocation=projectEngineerDTO.ProjectLocation,
                ProjectSize=projectEngineerDTO.ProjectSize ,
                StartDate=projectEngineerDTO.StartDate,
                EndDate=projectEngineerDTO.EndDate,
                ProjectStatus=projectEngineerDTO.ProjectStatus,
                UserId=userId,
                Images=new List<Images>()//initialize images list
                
            };

            if (string.IsNullOrEmpty(hostEnvironment.WebRootPath))
            {
                throw new Exception("WebRootPath is null. Make sure IWebHostEnvironment is properly injected.");
            }
            if(projectEngineerDTO.ImagesList != null && projectEngineerDTO.ImagesList.Count > 0)//check if images list is not null and count greater than zero
            {
                var uploadPath = Path.Combine(hostEnvironment.WebRootPath, "upload/ConstructionProject");//set upload path
            
               if (!Directory.Exists(uploadPath))
                      {
                   Directory.CreateDirectory(uploadPath);
                       }
            foreach(var img in projectEngineerDTO.ImagesList)
            {
                if(img.Length > 0)
                {
                    var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(img.FileName)}";//generate unique file name
                    var filePath = Path.Combine(uploadPath, uniqueFileName);//set file path
                    using(var stream = new FileStream(filePath, FileMode.Create))//create file stream
                    {
                        img.CopyTo(stream);
                    }
                    NewConstructionProject.Images.Add(new Images//add new image to images list
                    {
                        Image = $"/upload/ConstructionProject/{uniqueFileName}"
                    });
                }

                
            }

          
        }
        return NewConstructionProject;

        
    }
    }

}