
using System.Threading.Tasks;

namespace Eshop.Domain
{
    public interface IUsuarioRepository
    {
        Task<Usuario> CreateAsync(Usuario usuario);
        Task<Usuario?> GetByEmailAsync(string email);
    }
}