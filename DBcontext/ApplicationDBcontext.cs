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
        public DbSet<HelpRequest> HelpRequests { get; set; }
        public DbSet<Services> Services { get; set; }
        public DbSet<SubServices> SubCategories { get; set; }
        public DbSet<AboutHelper> AboutHelpers { get; set; }
        public DbSet<ImagePost> ImagePosts { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<HelpRequest>()
            .HasOne(c => c.Services).
            WithMany(h => h.HelpRequests).
            HasForeignKey(ci => ci.ServiceId);

            modelBuilder.Entity<HelpRequest>()
            .HasOne(u => u.Useres).
            WithMany(h => h.HelpRequests).
            HasForeignKey(ui => ui.UserId);

            modelBuilder.Entity<ImagePost>()
            .HasOne(h => h.helpRequest).
            WithMany(i => i.ImagePosts).
            HasForeignKey(hi => hi.HelpRequestId);

            modelBuilder.Entity<SubServices>()
            .HasOne(c => c.services).
            WithMany(sc => sc.SubServices).
            HasForeignKey(ci => ci.ServiceId);

            modelBuilder.Entity<AboutHelper>()
            .HasOne(u => u.HelperUser).
            WithOne(hu => hu.aboutHelper)
            .HasForeignKey<AboutHelper>(ui => ui.UserId);

            modelBuilder.Entity<Services>()
            .HasOne(u=>u.Users).
            WithMany(s=>s.services).
            HasForeignKey(ui=>ui.userId);
                

            base.OnModelCreating(modelBuilder);




            //seed roles(we can also add it to program cs)
            List<IdentityRole> Role = new List<IdentityRole>
            {
                new IdentityRole{
                    Name="Admin",
                    NormalizedName="ADMIN"

                },
                new IdentityRole{
                    Name="User",
                    NormalizedName="USER"
                },
                new IdentityRole{
                    Name="helper",
                    NormalizedName="HELPER"

                }


            };
            modelBuilder.Entity<IdentityRole>().HasData(Role);
        }
        
    }
}