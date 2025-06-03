using System.ComponentModel.DataAnnotations;

public class ProductoDto
{
    public int id_producto { get; set; }
    public string? ImgProducto { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public double Precio { get; set; }
    public int id_categoria { get; set; }
    public int id_marca { get; set; }
}