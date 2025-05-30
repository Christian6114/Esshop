using Eshop.Infrastructure;
using Eshop.Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class UserService : IUserService
{
    private readonly AppDbContext _context;

    public UserService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<bool> LoginAsync(string email, string password)
    {
        var usuario = await _context.Usuario
            .FirstOrDefaultAsync(u => u.Email == email && u.contraseña == password);

        return usuario != null;
    }
}