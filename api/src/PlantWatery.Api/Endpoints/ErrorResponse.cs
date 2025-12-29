using System.Net;
using ErrorOr;

namespace PlantWatery.Api.Endpoints;

public class ErrorResponse
{
    public int StatusCode { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;

    public ErrorResponse(Error error, HttpStatusCode statusCode)
    {
        StatusCode = (int)statusCode;
        Code = error.Code;
        Message = error.Description;
    }
}
