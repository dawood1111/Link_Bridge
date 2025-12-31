using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using RegionServicesapi.DBcontext;
using RegionServicesapi.GenerateToken;
using RegionServicesapi.IInterface;
<<<<<<< HEAD
using RegionServicesapi.Interface;
using RegionServicesapi.Model;
using RegionServicesapi.Repository;
=======
using RegionServicesapi.Model;
>>>>>>> 40c7716103912476e76d10d313be518b8f89666b

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});



builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
    });

builder.Services.AddDbContext<ApplicationDBcontext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));

});
builder.Services.AddIdentity<User, IdentityRole>(v =>
{
    v.Password.RequireDigit = true;
    v.Password.RequiredLength = 6;
    v.Password.RequireUppercase = true;
    v.Password.RequireLowercase = true;


}).AddEntityFrameworkStores<ApplicationDBcontext>();
builder.Services.AddAuthentication(a =>
{
    a.DefaultAuthenticateScheme =
    a.DefaultChallengeScheme =
    a.DefaultForbidScheme =
    a.DefaultSignInScheme =
    a.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(option =>
#pragma warning disable CS8604 // Possible null reference argument.

{
    option.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateAudience = true,
        ValidateIssuer = true,
        ValidateLifetime = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidAudience = builder.Configuration["JWT:audience"],
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"])),
        RoleClaimType = ClaimTypes.Role
    };
});


builder.Services.AddScoped<ICreateToken, Token>();
<<<<<<< HEAD
builder.Services.AddScoped<IConstructionCompany,ConstructionProjectRepo>();



var google=builder.Configuration.GetSection("GoogleAuth");
builder.Services.AddAuthentication().AddGoogle(options =>
{
    options.ClientId = google["ClientId"];
    options.ClientSecret = google["ClientSecret"];
});



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
                 
        });
});

=======


>>>>>>> 40c7716103912476e76d10d313be518b8f89666b
var app = builder.Build();

var webRootPath = Path.Combine(builder.Environment.ContentRootPath, "wwwroot");
if (!Directory.Exists(webRootPath))
{
    Directory.CreateDirectory(webRootPath);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
<<<<<<< HEAD
app.UseCors("AllowReactApp");
app.UseAuthentication();
app.UseAuthorization();
app.UseDefaultFiles();
=======
app.UseAuthentication();
app.UseAuthorization();
>>>>>>> 40c7716103912476e76d10d313be518b8f89666b
app.MapControllers();

app.Run();
