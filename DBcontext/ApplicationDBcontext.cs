using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

using RegionServices.Model;


namespace RegionServices.DBcontext
{
    public class ApplicationDBcontext : IdentityDbContext<User>
    {
        public ApplicationDBcontext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }
        public DbSet<Project> ConstructionProjects { get; set; }
        public DbSet<AboutCompanies> AboutCompanies { get; set; }
        public DbSet<QuotationRequest> QuotationRequests { get; set; }
        public DbSet<FinancialItem> FinancialItems { get; set; }
        public DbSet<UserNotification> Notifications { get; set; }
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

            modelBuilder.Entity<Project>().
            HasMany(p => p.QuotationRequests)
            .WithOne(q => q.ProjectPosts)
            .HasForeignKey(q => q.ProjectId)
            .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<User>()
          .HasMany(u => u.quotationRequests).
             WithOne(q => q.user)
             .HasForeignKey(q => q.UserId).
             OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<AboutCompanies>()
            .HasMany(a => a.quotationRequest)
            .WithOne(q => q.AboutCompany)
            .HasForeignKey(q => q.AboutCompaniesId)
            .IsRequired(false);
            modelBuilder.Entity<User>().
            HasMany(a => a.constructionProject).
            WithOne(u => u.user).
            HasForeignKey(u => u.UserId);
            modelBuilder.Entity<User>().
            HasMany(u => u.Notifications).
            WithOne(n => n.Users).
            HasForeignKey(n => n.UserId);




            base.OnModelCreating(modelBuilder);

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