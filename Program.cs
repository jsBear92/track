using Track.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Track API", Version = "v1" });
});

// Configure DbContext with Secure Connection String
var connectionString = builder.Configuration.GetConnectionString("trackAppDBCon");
var dbPassword = builder.Configuration["DbPw"];
var connectionStringBuilder = new SqlConnectionStringBuilder(connectionString)
{
    Password = dbPassword
};
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionStringBuilder.ConnectionString));

builder.Services.AddSingleton<IConfiguration>(builder.Configuration);


var app = builder.Build();

app.UseCors(c => c.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
