using System.Text;
using System.Text.Json.Serialization;
using bnl_dark_api.DataBase;
using Microsoft.EntityFrameworkCore;
using bnl_dark_api.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.OData;
using Microsoft.AspNetCore.OData.NewtonsoftJson;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddControllers()
    .AddOData(opt =>
        opt.AddRouteComponents("odata", GetEdmModel())
            .Expand()
            .Filter()
            .Count()
            .Select()
            .OrderBy()
            .SkipToken()
            .EnableQueryFeatures(100)
    );

builder.Services.AddCors(options =>
{
    options.AddPolicy("development", builder =>
    {
        builder.WithOrigins("*", "https://localhost:44456", "http://10.100.206.40", "*/*")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .SetIsOriginAllowed(origin => true)
            .AllowCredentials();
    });
});

builder.Services.AddAuthentication(opt => {
        opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = false,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "https://localhost:44456",
            ValidAudience = "https://localhost:44456",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("drog-e@supersecret"))
        };
    });

builder.Services.AddSwaggerGen();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    });
}
else
{
    app.UseHsts();
}

//app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseRouting();
app.UseCors("development");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();

static IEdmModel GetEdmModel()
{
    var builder = new ODataConventionModelBuilder();
    builder.EntitySet<Robot>(nameof(Robot));
    builder.EntitySet<Room>(nameof(Room));
    builder.EntitySet<Medicine>(nameof(Medicine));
    
    return builder.GetEdmModel();
}
