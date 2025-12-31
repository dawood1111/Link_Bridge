using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RegionServicesapi.Model;

namespace RegionServicesapi.DBcontext
{
    public class ApplicationDBcontext : IdentityDbContext<User>
    {
        public ApplicationDBcontext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }
         public DbSet<AboutCompanies> AboutCompanies { get; set; }
        public DbSet<ConstructionProject> ConstructionProjects { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

         

           



                
            base.OnModelCreating(modelBuilder);




            //seed roles(we can also add it to program cs)
            List<IdentityRole> Role = new List<IdentityRole>
            {
                new IdentityRole{
                    Name="Admin",
                    NormalizedName="ADMIN"

                },
                new IdentityRole{
                    Name="ConstructionCompany",
                    NormalizedName="CONSTRUCTIONCOMPANY"
                },
                new IdentityRole{
                    Name="ITCompany",
                    NormalizedName="ITCOMPANY"

                }


            };
            modelBuilder.Entity<IdentityRole>().HasData(Role);
        }
        
    }
}