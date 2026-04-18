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
        public DbSet<Project> ConstructionProjects { get; set; }
        public  DbSet<AboutCompanies> AboutCompanies { get; set; }
        public DbSet<QuotationRequest> QuotationRequests { get; set; }
        public DbSet<FinancialItem> FinancialItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Project>().
            HasMany(p => p.Images)
            .WithOne(i => i.Project)
            .HasForeignKey(i => i.ConstructionProjectId);

            modelBuilder.Entity<QuotationRequest>()
            .HasMany(q => q.FinancialItems)
            .WithOne(t => t.QuotationsRequest)
            .HasForeignKey(t => t.QuotationRequestId);

             modelBuilder.Entity<QuotationRequest>()
             .Ignore(q => q.CompanyLogo);

             modelBuilder.Entity<Project>().
             HasMany(p => p.QuotationRequests)
             .WithOne(q => q.ProjectPosts)
             .HasForeignKey(q => q.ProjectId);

             modelBuilder.Entity<User>()
             .HasMany(u => u.quotationRequests).
                WithOne(q => q.user)
                .HasForeignKey(q => q.UserId);
             

                
            base.OnModelCreating(modelBuilder);
            //seed roles(we can also add it to program cs)
              List<IdentityRole> Role = new List<IdentityRole>
            {

                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
                new IdentityRole { Name = "User", NormalizedName = "USER" },
                 new IdentityRole { Name = "Company", NormalizedName = "COMPANY" }
                 


            };
            modelBuilder.Entity<IdentityRole>().HasData(Role);
        }
        
    }



    }