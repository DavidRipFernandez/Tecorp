using CleanArchitecture.Application.DTOs;
using CleanArchitecture.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace CleanArchitecture.API.Controllers
{
    [ApiController]
    [Route("api/v1/posts/{postId}/comments")]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetByPostId(int postId)
        {
            var comments = await _commentService.GetByPostIdAsync(postId);
            var total = await _commentService.CountByPostIdAsync(postId);

            return Ok(new
            {
                success = true,
                data = comments,
                meta = new { total }
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(int postId, [FromBody] CreateCommentRequest request)
        {
            var comment = await _commentService.CreateAsync(postId, request);
            return StatusCode(201, new
            {
                success = true,
                data = comment
            });
        }
    }
}