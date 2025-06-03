public interface IProductoService
{
    Task<IEnumerable<ProductoDto>> ObtenerTodos();
    Task<ProductoDto?> ObtenerPorIdAsync(int id);
    Task AgregarAsync(ProductoDto productoDto);


}