using System.ComponentModel.DataAnnotations;

public class ProductoDto
{
    
    public string Nombre { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public double Precio { get; set; }
    public int Id_categoria { get; set; }

    public int Id_marca { get; set; }
}