using Microsoft.EntityFrameworkCore;
using Eshop.Domain.Entities;

namespace Eshop.Infrastructure
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Producto> Productos { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Marca> Marcas { get; set; }
        public DbSet<Usuario> Usuario { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

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