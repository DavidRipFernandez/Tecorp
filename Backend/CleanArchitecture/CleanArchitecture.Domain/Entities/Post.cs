using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Domain.Entities
{
    public class Post
    {
        public const int MaxContentLength = 1000;
        public int Id { get; private set; }
        public string Username { get; private set; } = string.Empty;
        public string Email { get; private set; } = string.Empty;
        public string Content { get; private set;  } = string.Empty;
        public DateTime CreatedAt { get; private set; }

        public ICollection<Comment> Comments { get; private set; }  = new List<Comment>(); 
        private Post(){}
        public static Post Create(string username, string email, string content)
        {
            if (string.IsNullOrWhiteSpace(username))
                throw new Exceptions.DomainException("El username es requerido.");

            if (string.IsNullOrWhiteSpace(email))
                throw new Exceptions.DomainException("El email es requerido.");

            if (string.IsNullOrWhiteSpace(content))
                throw new Exceptions.DomainException("El contenido es requerido.");

            if (content.Length > MaxContentLength)
                throw new Exceptions.DomainException($"El contenido no puede superar {MaxContentLength} caracteres.");

            return new Post
            {
                Username = username.Trim(),
                Email = email.Trim().ToLower(),
                Content = content.Trim(),
                CreatedAt = DateTime.UtcNow
            };
        }

    }
}
