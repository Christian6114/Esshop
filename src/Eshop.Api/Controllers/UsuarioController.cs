using Eshop.Application;
using Eshop.Application.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Eshop.Application.DTOs;
using System;

namespace Eshop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;

        public UsuarioController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost("registro")]
        public async Task<IActionResult> Registrar([FromBody] UsuarioRegistroDto dto)
        {
            try
            {
                var usuario = await _usuarioService.RegistrarUsuarioAsync(dto);
                return Ok(new { Message = "Usuario registrado exitosamente", UsuarioId = usuario.IdUsuario });

            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                // Ahora el servicio debe retornar (token, nombre)
                var (token, nombre) = await _usuarioService.LoginAsync(loginDto.Email.ToLower(), loginDto.Password);
                return Ok(new { token, nombre });
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }
    }
}