using FluentMigrator.Runner;
using SightCraft.BusinessLogicLayer;
using SightCraft.DataAccessLayer;
using SightCraft.WebAPI.Configurations;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDataAccessLayer(connectionString);
builder.Services.AddBusinessLogicLayer();

builder.Services.AddJwtAuthentication(builder.Configuration);

builder.Services.AddSwagger();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    using var scope = app.Services.CreateScope();
    var services = scope.ServiceProvider;

    var runner = services.GetRequiredService<IMigrationRunner>();
    runner.MigrateUp();
}
else
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true)
                .AllowCredentials());

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.Run();
