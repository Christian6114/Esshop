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

    public async Task<Producto?> GetByIdAsync(int id)
{
    Console.WriteLine($"Buscando producto con ID: {id}");
    var producto = await _context.Productos.FindAsync(id);
    if (producto == null)
    {
        Console.WriteLine($"Producto con ID {id} no encontrado.");
    }
    else
    {
        Console.WriteLine($"Producto encontrado: {producto.Nombre}");
    }
    return producto;
}



    public async Task AddAsync(Producto producto)
    {
        _context.Productos.Add(producto);
        await _context.SaveChangesAsync();
    }
}
