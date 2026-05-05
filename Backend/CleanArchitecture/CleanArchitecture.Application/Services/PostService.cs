using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.DTOs;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Exceptions;
using CleanArchitecture.Domain.Interfaces;

namespace CleanArchitecture.Application.Services
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _postRepository;
        private readonly IUnitOfWork _unitOfWork;

        public PostService(IPostRepository postRepository, IUnitOfWork unitOfWork)
        {
            _postRepository = postRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<PostDto>> GetAllAsync(int page, int limit)
        {
            var posts = await _postRepository.GetAllAsync(page, limit);
            return posts.Select(p => new PostDto
            {
                Id = p.Id,
                Username = p.Username,
                Email = p.Email,
                Content = p.Content,
                CreatedAt = p.CreatedAt
            });
        }
        public async Task<PostDto?> GetByIdAsync(int id)
        {
            var post = await _postRepository.GetByIdAsync(id);
            if (post == null)
                throw new NotFoundException("Post", id);

            return new PostDto
            {
                Id = post.Id,
                Username = post.Username,
                Email = post.Email,
                Content = post.Content,
                CreatedAt = post.CreatedAt
            };
        }
        public async Task<PostDto> CreateAsync(CreatePostRequest request)
        {
            var post = Post.Create(request.Username, request.Email, request.Content);
            await _postRepository.AddAsync(post);
            await _unitOfWork.SaveChangesAsync();

            return new PostDto
            {
                Id = post.Id,
                Username = post.Username,
                Email = post.Email,
                Content = post.Content,
                CreatedAt = post.CreatedAt
            };
        }
        public async Task<int> CountAsync()
        {
            return await _postRepository.CountAsync();
        }
    }
}
