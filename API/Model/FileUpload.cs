using Microsoft.AspNetCore.Http;

namespace LearnModelBinding.Models
{
    public class FileUpload
    {
        public string Name { get; set; }
        public IFormFile File { get; set; }
    }
}
