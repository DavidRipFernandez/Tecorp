using CleanArchitecture.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Domain.Interfaces;

public interface IPostRepository
{
    Task<IEnumerable<Post>> GetAllAsync(int page, int limit);
    Task<Post?> GetByIdAsync(int id);
    Task AddAsync(Post post);
    Task<int> CountAsync();
}
