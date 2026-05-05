using CleanArchitecture.Domain.Exceptions;
using System.Net;
using System.Text.Json;

namespace CleanArchitecture.API.Middleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (NotFoundException ex)
            {
                _logger.LogWarning(ex.Message);
                await WriteErrorResponse(context, HttpStatusCode.NotFound, "NOT_FOUND", ex.Message);
            }
            catch (DomainException ex)
            {
                _logger.LogWarning(ex.Message);
                await WriteErrorResponse(context, HttpStatusCode.BadRequest, "DOMAIN_ERROR", ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error inesperado");
                await WriteErrorResponse(context, HttpStatusCode.InternalServerError, "SERVER_ERROR", "Ocurrió un error inesperado.");
            }
        }

        private static async Task WriteErrorResponse(
            HttpContext context,
            HttpStatusCode statusCode,
            string code,
            string message)
        {
            context.Response.StatusCode = (int)statusCode;
            context.Response.ContentType = "application/json";

            var response = new
            {
                success = false,
                error = new { code, message }
            };

            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}