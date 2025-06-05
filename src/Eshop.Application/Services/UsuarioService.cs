using Eshop.Application;
using Eshop.Application.DTOs;
using Eshop.Domain;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;
using Microsoft.Extensions.Configuration;

using Eshop.Application.Services;


namespace Eshop.Application.Services
{
    public class UsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IConfiguration _configuration;

        public UsuarioService(IUsuarioRepository usuarioRepository, IConfiguration configuration)
        {
            _usuarioRepository = usuarioRepository;
            _configuration = configuration;
        }

        public async Task<Usuario> RegistrarUsuarioAsync(UsuarioRegistroDto dto)
        {
            var existingUser = await _usuarioRepository.GetByEmailAsync(dto.Email);
            if (existingUser != null)
            {
                throw new Exception("El email ya está registrado.");
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            Console.WriteLine($"Hashed password for {dto.Email}: {hashedPassword}"); // Add logging

            var usuario = new Usuario
            {
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Email = dto.Email.ToLower(), // Ensure email is stored in lowercase
                Password = hashedPassword,
                Direccion = string.IsNullOrEmpty(dto.Direccion) ? string.Empty : dto.Direccion,
                Telefono = string.IsNullOrEmpty(dto.Telefono) ? string.Empty : dto.Telefono,
                Rol = "cliente"
            };

            var createdUser = await _usuarioRepository.CreateAsync(usuario);
            Console.WriteLine($"User created with ID: {createdUser.IdUsuario}"); // Add logging
            return createdUser;
        }
            public async Task<(string token, string nombre)> LoginAsync(string email, string password)
        {
            var usuario = await _usuarioRepository.GetByEmailAsync(email.ToLower());
            Console.WriteLine($"Usuario encontrado: {usuario != null}, Email: {email}");
            if (usuario == null)
            {
                Console.WriteLine("Usuario no encontrado.");
                throw new Exception("Credenciales incorrectas.");
            }
            bool passwordValid = BCrypt.Net.BCrypt.Verify(password, usuario.Password);
            Console.WriteLine($"Password válido: {passwordValid}");
            if (!passwordValid)
            {
                Console.WriteLine("Contraseña incorrecta.");
                throw new Exception("Credenciales incorrectas.");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"] ?? "clave_super_secreta_eshop");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
            new Claim(ClaimTypes.Name, usuario.Email),
            new Claim(ClaimTypes.Role, usuario.Rol),
            new Claim(ClaimTypes.NameIdentifier, usuario.IdUsuario.ToString())
        }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // Retorna el token y el nombre del usuario
            return (tokenString, usuario.Nombre);
        }

    }
}