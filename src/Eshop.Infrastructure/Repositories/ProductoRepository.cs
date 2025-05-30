using Microsoft.EntityFrameworkCore;
using Eshop.Infrastructure;


public class ProductoRepository : IProductoRepository
{
    private readonly AppDbContext _context;

    public ProductoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Producto>> GetAllAsync()
    {
        return await _context.Productos.ToListAsync();
    }

    public async Task AddAsync(Producto producto)
{
    _context.Productos.Add(producto);
    await _context.SaveChangesAsync();
}



}
