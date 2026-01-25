using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

using RegionServices.Model;


namespace RegionServices.DBcontext
{
    public class ApplicationDBcontext: IdentityDbContext<User>
    {
        public ApplicationDBcontext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }
        public DbSet<ConstructionProject> ConstructionProjects { get; set; }
        public  DbSet<AboutCompanies> AboutCompanies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
                
            base.OnModelCreating(modelBuilder);
            //seed roles(we can also add it to program cs)
              List<IdentityRole> Role = new List<IdentityRole>
            {

                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
                new IdentityRole { Name = "Engineer", NormalizedName = "ENGINEER" },
                new IdentityRole { Name = "Company", NormalizedName = "COMPANY" }


            };
            modelBuilder.Entity<IdentityRole>().HasData(Role);
        }
        
    }



    }