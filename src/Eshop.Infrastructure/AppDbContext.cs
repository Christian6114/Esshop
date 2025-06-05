using Microsoft.EntityFrameworkCore;


namespace Eshop.Infrastructure
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

         public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Producto> Productos { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Marca> Marcas { get; set; }
        
       

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

           modelBuilder.Entity<Usuario>(entity =>
    {
        entity.ToTable("Usuario");
        entity.HasKey(e => e.IdUsuario);
        entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
        entity.Property(e => e.Nombre).HasColumnName("nombre");
        entity.Property(e => e.Apellido).HasColumnName("apellido");
        entity.Property(e => e.Email).HasColumnName("email");
        entity.Property(e => e.Password).HasColumnName("password");
        entity.Property(e => e.Direccion).HasColumnName("direccion");
        entity.Property(e => e.Telefono).HasColumnName("telefono");
        entity.Property(e => e.Rol).HasColumnName("rol");
    });

            // Producto configuration
            modelBuilder.Entity<Producto>()
                .HasKey(p => p.id_producto)
                .HasName("PK_Productos");
            modelBuilder.Entity<Producto>()
                .Property(p => p.id_producto)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Producto>()
                .ToTable("productos"); // Ensure correct table name

            // Categoria configuration
            modelBuilder.Entity<Categoria>()
                .HasKey(c => c.id_categoria)
                .HasName("PK_Categorias");
            modelBuilder.Entity<Categoria>()
                .Property(c => c.id_categoria)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Categoria>()
                .ToTable("categoria"); // Map to singular table name

            // Marca configuration
            modelBuilder.Entity<Marca>()
                .HasKey(m => m.id_marca)
                .HasName("PK_Marcas");
            modelBuilder.Entity<Marca>()
                .Property(m => m.id_marca)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Marca>()
                .ToTable("marca"); // Map to singular table name



            // Relationships
            modelBuilder.Entity<Producto>()
                .HasOne(p => p.Categoria)
                .WithMany()
                .HasForeignKey(p => p.id_categoria)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Producto>()
                .HasOne(p => p.Marca)
                .WithMany()
                .HasForeignKey(p => p.id_marca)
                .OnDelete(DeleteBehavior.Restrict);

           
        }
    }
}