using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Eshop.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add JWT authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("clave_super_secreta_eshop")),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true
        };
    });

// Add DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add controllers
builder.Services.AddControllers();

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register services
builder.Services.AddScoped<IProductoService, ProductoService>();
builder.Services.AddScoped<IProductoRepository, ProductoRepository>();
builder.Services.AddScoped<IUserService, UserService>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add authorization
builder.Services.AddAuthorization();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.UseRouting();
app.MapControllers();

app.MapPost("/productos", async (ProductoDto productoDto, IProductoService service) =>
{
    var createdProducto = await service.AgregarAsync(productoDto);
    return Results.Created($"/productos/{createdProducto.id_producto}", createdProducto);
});

app.MapPost("/login", async (LoginDto loginDto, IUserService userService) =>
{
    if (string.IsNullOrWhiteSpace(loginDto.Email) || string.IsNullOrWhiteSpace(loginDto.Password))
        return Results.BadRequest(new { message = "Email y password son requeridos." });

    var existe = await userService.LoginAsync(loginDto.Email, loginDto.Password);
    if (!existe)
        return Results.Json(new { message = "Credenciales incorrectas." }, statusCode: 401);

    return Results.Ok(new { success = true });
});

app.Run();