public interface IProductoRepository
{
    Task<IEnumerable<Producto>> GetAllAsync();


        Task AddAsync(Producto producto);

}


