using CleanArchitecture.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Application.Services
{
    public interface IPostService
    {
        Task<IEnumerable<PostDto>> GetAllAsync(int page, int limit);
        Task<PostDto?> GetByIdAsync(int id);
        Task<PostDto> CreateAsync(CreatePostRequest request);
        Task<int> CountAsync();
    }
}
