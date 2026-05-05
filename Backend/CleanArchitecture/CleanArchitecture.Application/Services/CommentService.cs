using CleanArchitecture.Application.DTOs;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Exceptions;
using CleanArchitecture.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Application.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IPostRepository _postRepository;
        private readonly IUnitOfWork _unitOfWork;
        public CommentService(
             ICommentRepository commentRepository,
             IPostRepository postRepository,
             IUnitOfWork unitOfWork)
        {
            _commentRepository = commentRepository;
            _postRepository = postRepository;
            _unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<CommentDto>> GetByPostIdAsync(int postId)
        {
            var comments = await _commentRepository.GetByPostIdAsync(postId);
            return comments.Select(c => new CommentDto
            {
                Id = c.Id,
                PostId = c.PostId,
                Username = c.Username,
                Email = c.Email,
                Content = c.Content,
                CreatedAt = c.CreatedAt
            });
        }
        public async Task<CommentDto> CreateAsync(int postId, CreateCommentRequest request)
        {
            var post = await _postRepository.GetByIdAsync(postId);
            if (post == null)
                throw new NotFoundException("Post", postId);

            var comment = Comment.Create(postId, request.Username, request.Email, request.Content);
            await _commentRepository.AddAsync(comment);
            await _unitOfWork.SaveChangesAsync();

            return new CommentDto
            {
                Id = comment.Id,
                PostId = comment.PostId,
                Username = comment.Username,
                Email = comment.Email,
                Content = comment.Content,
                CreatedAt = comment.CreatedAt
            };
        }
        public async Task<int> CountByPostIdAsync(int postId)
        {
            return await _commentRepository.CountByPostIdAsync(postId);
        }
    }
}
