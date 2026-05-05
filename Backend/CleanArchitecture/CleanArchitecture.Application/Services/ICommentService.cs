using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.DTOs;

namespace CleanArchitecture.Application.Services
{
    public interface ICommentService
    {
        Task<IEnumerable<CommentDto>> GetByPostIdAsync(int postId);
        Task<CommentDto> CreateAsync(int postId, CreateCommentRequest request);
        Task<int> CountByPostIdAsync(int postId);
    }
}
