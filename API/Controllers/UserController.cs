using LearnModelBinding.Models;
using Microsoft.AspNetCore.Mvc;

namespace LearnModelBinding.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [BindProperties(SupportsGet = true)]
    public class UserController : ControllerBase
    {
        public string Id {get;set;}
        public string Name {get;set;}

        [HttpGet("GetRequest")]
        public string GetRequest()
        {
            return $"Your request has Id: {this.Id} and Name: {this.Name}";
        }

        [HttpGet("GetRequest/{id?}")]
        public string GetRequest([FromQuery] int id, [FromRoute] string name)
        {
            return $"Your request has Id: {id} and Name: {name}";
        }

        [HttpGet("GetComplexRequest")]
        public User GetComplexRequest([FromQuery] User user)
        {
            return user;
        }

        [HttpPost("PostRequest")]
        public User PostRequest(User user)
        {
            return user;
        }

        [HttpPost("PostRequestForm")]
        public User PostRequestForm([FromForm] User user)
        {
            return user;
        }

        [HttpPost("SendFile")]
        public string SendFile([FromForm] FileUpload data)
        {
            return $"File Name: {data.Name}; File Size: {data.File.Length / 1000} KB";
        }
    }
}
