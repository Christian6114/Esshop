using Microsoft.EntityFrameworkCore;
using Eshop.Domain.Entities;
using Eshop.Infrastructure; // Add this for AppDbContext

public class ProductoService : IProductoService
{
    private readonly IProductoRepository _repo;
    private readonly AppDbContext _context;

    public ProductoService(IProductoRepository repo, AppDbContext context)
    {
        _repo = repo;
        _context = context;
    }

    public async Task<IEnumerable<ProductoDto>> ObtenerTodos()
    {
        var productos = await _repo.GetAllAsync();
        return productos.Select(p => new ProductoDto
        {
            id_producto = p.id_producto,
            ImgProducto = p.ImgProducto,
            Nombre = p.Nombre,
            Descripcion = p.Descripcion,
            Precio = p.Precio,
            Categoria = p.Categoria?.Nombre ?? string.Empty,
            Marca = p.Marca?.Nombre ?? string.Empty
        });
    }

    public async Task<ProductoDto?> ObtenerPorIdAsync(int id)
    {
        var producto = await _repo.GetByIdAsync(id);
        if (producto == null) return null;

        return new ProductoDto
        {
            id_producto = producto.id_producto,
            ImgProducto = producto.ImgProducto,
            Nombre = producto.Nombre,
            Descripcion = producto.Descripcion,
            Precio = producto.Precio,
            Categoria = producto.Categoria?.Nombre ?? string.Empty,
            Marca = producto.Marca?.Nombre ?? string.Empty
        };
    }

    public async Task<ProductoDto> AgregarAsync(ProductoDto productoDto)
    {
        Console.WriteLine($"Agregando producto: {productoDto.Nombre}, Categoria: {productoDto.Categoria}, Marca: {productoDto.Marca}");
        var categoria = await _context.Categorias
            .FirstOrDefaultAsync(c => c.Nombre == productoDto.Categoria);
        if (categoria == null)
        {
            Console.WriteLine($"Categoría '{productoDto.Categoria}' no encontrada.");
            throw new ArgumentException($"Categoría '{productoDto.Categoria}' no encontrada.");
        }

        var marca = await _context.Marcas
            .FirstOrDefaultAsync(m => m.Nombre == productoDto.Marca);
        if (marca == null)
        {
            Console.WriteLine($"Marca '{productoDto.Marca}' no encontrada.");
            throw new ArgumentException($"Marca '{productoDto.Marca}' no encontrada.");
        }

        var producto = new Producto
        {
            ImgProducto = productoDto.ImgProducto,
            Nombre = productoDto.Nombre,
            Descripcion = productoDto.Descripcion,
            Precio = productoDto.Precio,
            id_categoria = categoria.id_categoria,
            id_marca = marca.id_marca
        };
        await _repo.AddAsync(producto);

        Console.WriteLine($"Producto agregado con ID: {producto.id_producto}");
        return new ProductoDto
        {
            id_producto = producto.id_producto,
            ImgProducto = producto.ImgProducto,
            Nombre = producto.Nombre,
            Descripcion = producto.Descripcion,
            Precio = producto.Precio,
            Categoria = categoria.Nombre,
            Marca = marca.Nombre
        };
    }
}