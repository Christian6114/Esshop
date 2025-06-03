public interface IProductoService
{
    Task<IEnumerable<ProductoDto>> ObtenerTodos();
    Task<ProductoDto?> ObtenerPorIdAsync(int id);
    Task<ProductoDto> AgregarAsync(ProductoDto productoDto);
}