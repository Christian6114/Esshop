using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


public class Usuario
{
    [Key]
    [Column("id_usuario")]
    public int IdUsuario { get; set; }

    [Column("nombre")]
    public string Nombre { get; set; }  = string.Empty;

    [Column("apellido")] 
    public string Apellido { get; set; }  = string.Empty;

    [Column("email")]
    public string Email { get; set; }  = string.Empty;

    [Column("password")]
    public string Password { get; set; }  = string.Empty;

    [Column("direccion")]
    public string Direccion { get; set; }  = string.Empty;

    [Column("telefono")]
    public string Telefono { get; set; }  = string.Empty;

    [Column("rol")]
    public string Rol { get; set; } = string.Empty;
}