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
            id_producto = p.id_producto,
            ImgProducto = p.ImgProducto,
            Nombre = p.Nombre,
            Descripcion = p.Descripcion,
            Precio = p.Precio,
            id_categoria = p.id_categoria,
            id_marca = p.id_marca
        });
    }

    public async Task AgregarAsync(ProductoDto productoDto)
    {
        var producto = new Producto
        {
            // id_producto is not set here as it's typically auto-generated
            ImgProducto = productoDto.ImgProducto,
            Nombre = productoDto.Nombre,
            Descripcion = productoDto.Descripcion,
            Precio = productoDto.Precio,
            id_categoria = productoDto.id_categoria,
            id_marca = productoDto.id_marca
        };
        await _repo.AddAsync(producto);
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
        id_categoria = producto.id_categoria,
        id_marca = producto.id_marca
    };
}
}