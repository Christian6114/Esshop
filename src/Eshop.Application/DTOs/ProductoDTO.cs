public class ProductoDto
{
    public int id_producto { get; set; }
    public string? ImgProducto { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public double Precio { get; set; }
    public string Categoria { get; set; } = string.Empty; // Changed from id_categoria
    public string Marca { get; set; } = string.Empty;     // Changed from id_marca
}