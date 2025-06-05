using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Eshop.Infrastructure;
using Eshop.Infrastructure.Repositories;
using Eshop.Application.Services;
using Eshop.Application;
using Eshop.Domain;

var builder = WebApplication.CreateBuilder(args);

// Agrega configuración JWT - clave de al menos 32 caracteres para evitar error IDX10720
var jwtKey = builder.Configuration["Jwt:Key"] ?? "EstaEsUnaClaveMuySeguraDeAlMenos32Chars!";

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtKey)),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true
        };
    });

// Configura DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Agrega controladores
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registra servicios y repositorios
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<UsuarioService>();
builder.Services.AddScoped<IProductoService, ProductoService>();
builder.Services.AddScoped<IProductoRepository, ProductoRepository>();

// CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Authorization
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

app.MapControllers();

app.MapPost("/productos", async (ProductoDto productoDto, IProductoService service) =>
{
    var createdProducto = await service.AgregarAsync(productoDto);
    return Results.Created($"/productos/{createdProducto.id_producto}", createdProducto);
});

app.MapPost("/login", async (LoginDto loginDto, UsuarioService usuarioService) =>
{
    if (string.IsNullOrWhiteSpace(loginDto.Email) || string.IsNullOrWhiteSpace(loginDto.Password))
        return Results.BadRequest(new { message = "Email y password son requeridos." });

    try
    {
        var token = await usuarioService.LoginAsync(loginDto.Email, loginDto.Password);
        return Results.Ok(new { success = true, token });
    }
    catch (Exception ex)
    {
        return Results.Json(new { message = ex.Message }, statusCode: 401);
    }
});

app.Run();
