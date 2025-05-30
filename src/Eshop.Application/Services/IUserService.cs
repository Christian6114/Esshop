public interface IUserService
{
    Task<bool> LoginAsync(string email, string password);
}