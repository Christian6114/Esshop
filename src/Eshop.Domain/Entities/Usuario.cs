using System.ComponentModel.DataAnnotations;

namespace Eshop.Domain.Entities
{
    public class Usuario
{
    [Key]
    public int Id_usuario { get; set; }
    public string Email { get; set; } = string.Empty;
    public string contraseña { get; set; } = string.Empty;
}
}

