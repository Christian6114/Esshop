using Microsoft.EntityFrameworkCore;
using Eshop.Infrastructure;
using Eshop.Domain.Entities;

public class ProductoRepository : IProductoRepository
{
    private readonly AppDbContext _context;

    public ProductoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Producto>> GetAllAsync()
    {
        var productos = await _context.Productos
            .Include(p => p.Categoria)
            .Include(p => p.Marca)
            .ToListAsync();
        Console.WriteLine($"Productos encontrados: {productos.Count}");
        foreach (var p in productos)
        {
            Console.WriteLine($"Producto: {p.Nombre}, Categoria: {p.Categoria?.Nombre}, Marca: {p.Marca?.Nombre}");
        }
        return productos;
    }

    public async Task<Producto?> GetByIdAsync(int id)
    {
        Console.WriteLine($"Buscando producto con ID: {id}");
        var producto = await _context.Productos
            .Include(p => p.Categoria)
            .Include(p => p.Marca)
            .FirstOrDefaultAsync(p => p.id_producto == id);
        if (producto == null)
        {
            Console.WriteLine($"Producto con ID {id} no encontrado.");
        }
        else
        {
            Console.WriteLine($"Producto encontrado: {producto.Nombre}, Categoria: {producto.Categoria?.Nombre}, Marca: {producto.Marca?.Nombre}");
        }
        return producto;
    }

    public async Task AddAsync(Producto producto)
    {
        _context.Productos.Add(producto);
        await _context.SaveChangesAsync();
    }
}