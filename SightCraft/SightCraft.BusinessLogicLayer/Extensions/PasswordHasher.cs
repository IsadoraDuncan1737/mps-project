using SightCraft.Domain.Resources;
using System.Security.Cryptography;
using System.Text;

namespace SightCraft.BusinessLogicLayer.Extensions
{
    public static class PasswordHasher
    {
        public static string Hash(string password)
        {
            var algorithm = SHA512.Create();

            var inputBytes = Encoding.UTF8.GetBytes(password);

            var hash = algorithm.ComputeHash(inputBytes);

            var result = Convert.ToHexString(hash);

            return result;
        }

        public static bool IsHashVerified(string password, string hashedPassword)
        {
            var algorithm = SHA512.Create();

            var inputBytes = Encoding.UTF8.GetBytes(password);

            var hash = algorithm.ComputeHash(inputBytes);

            var result = Convert.ToHexString(hash);

            return result == hashedPassword;
        }
    }
}
