using ITE.Catalog.Domain.DomainObjects;
using LoadTesting.API.Data.Entities;

namespace LoadTesting.API.Data.Repositories;

public interface IProductRepository : IRepository<ProductModel>
{
    Task<List<ProductModel>> GetAllAsync();
    Task<ProductModel> GetByIdAsync(int id);
    Task AddAsync(ProductModel product);
    Task UpdateAsync(ProductModel product);
}