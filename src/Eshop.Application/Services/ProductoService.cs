public class ProductoService : IProductoService
{
    private readonly IProductoRepository _repo;

    public ProductoService(IProductoRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<ProductoDto>> ObtenerTodos()
    {
        var productos = await _repo.GetAllAsync();
        return productos.Select(p => new ProductoDto
        {
            Nombre = p.Nombre,
            Descripcion = p.Descripcion,
            Precio = p.Precio,
            Id_categoria = p.Id_categoria,
            Id_marca = p.Id_marca
        });
    }

public async Task AgregarAsync(ProductoDto productoDto)
{
    var producto = new Producto
    {
        Nombre = productoDto.Nombre,
        Descripcion = productoDto.Descripcion,
        Precio = productoDto.Precio,
        Id_categoria = productoDto.Id_categoria,
        Id_marca = productoDto.Id_marca
    };
    await _repo.AddAsync(producto);
}
}