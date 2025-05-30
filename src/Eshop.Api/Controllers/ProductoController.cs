using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/[controller]")]
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
        var productos = await _service.ObtenerTodos();
        return Ok(productos);
    }


    [HttpPost]
    public async Task<IActionResult> Crear([FromBody] ProductoDto productoDto)
    {
        await _service.AgregarAsync(productoDto);
        return CreatedAtAction(nameof(GetAll), null);
    }

}