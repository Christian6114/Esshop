public interface IProductoService
{
    Task<IEnumerable<ProductoDto>> ObtenerTodos();

    Task AgregarAsync(ProductoDto productoDto);
}