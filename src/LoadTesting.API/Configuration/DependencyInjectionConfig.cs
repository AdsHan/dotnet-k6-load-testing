using LoadTesting.API.Application.Services;
using LoadTesting.API.Data;
using LoadTesting.API.Data.Repositories;
using Microsoft.EntityFrameworkCore;

namespace LoadTesting.API.Configuration;

public static class DependencyInjectionConfig
{
    public static IServiceCollection AddDependencyConfiguration(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<CatalogDbContext>(options => options.UseInMemoryDatabase("CatalogDB"));

        services.AddScoped<IProductRepository, ProductRepository>();

        services.AddTransient<ProductPopulateService>();

        return services;
    }
}
