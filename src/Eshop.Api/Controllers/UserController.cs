using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

[HttpPost("login")]
public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
{
    if (string.IsNullOrWhiteSpace(loginDto.Email) || string.IsNullOrWhiteSpace(loginDto.Password))
        return BadRequest("Email y password son requeridos.");

    var existe = await _userService.LoginAsync(loginDto.Email, loginDto.Password);
    if (!existe)
        return Unauthorized();

    return Ok();
}
}