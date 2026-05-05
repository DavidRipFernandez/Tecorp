using CleanArchitecture.Application.DTOs;
using CleanArchitecture.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace CleanArchitecture.API.Controllers
{
    [ApiController]
    [Route("api/v1/posts")]
    public class PostsController : ControllerBase
    {
        private readonly IPostService _postService;

        public PostsController(IPostService postService)
        {
            _postService = postService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int limit = 10)
        {
            var posts = await _postService.GetAllAsync(page, limit);
            var total = await _postService.CountAsync();

            return Ok(new
            {
                success = true,
                data = posts,
                meta = new { page, limit, total }
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var post = await _postService.GetByIdAsync(id);
            return Ok(new { success = true, data = post });
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePostRequest request)
        {
            var post = await _postService.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = post.Id }, new
            {
                success = true,
                data = post
            });
        }
    }
}