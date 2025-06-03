using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Producto
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int id_producto { get; set; }
    
    public string? ImgProducto { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public double Precio { get; set; }
    
    public int id_categoria { get; set; }
    [ForeignKey("id_categoria")]
    public Categoria? Categoria { get; set; } // Navigation property for categoria
    
    public int id_marca { get; set; }
    [ForeignKey("id_marca")]
    public Marca? Marca { get; set; } // Navigation property for marca
}

public class Categoria
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int id_categoria { get; set; }
    public string Nombre { get; set; } = string.Empty;
}

public class Marca
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int id_marca { get; set; }
    public string Nombre { get; set; } = string.Empty;
}