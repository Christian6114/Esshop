using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("[controller]")]
public class ProductosController : ControllerBase
{
    private readonly IProductoService _service;

    public ProductosController(IProductoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var productos = await _service.ObtenerTodos();
            return Ok(productos);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> Crear([FromBody] ProductoDto productoDto)
    {
        try
        {
            await _service.AgregarAsync(productoDto);
            return CreatedAtAction(nameof(GetAll), new { id = productoDto.id_producto });
        }
        catch (Exception ex)
        {
            return BadRequest($"Error al crear producto: {ex.Message}");
        }
    }

[HttpGet("{id}")]
public async Task<IActionResult> ObtenerPorId(int id)
{
    try
    {
        var producto = await _service.ObtenerPorIdAsync(id);
        if (producto == null)
        {
            return NotFound($"Producto con ID {id} no encontrado.");
        }
        return Ok(producto);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Error interno al obtener producto: {ex.Message}");
    }
}
}