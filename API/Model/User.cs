using Microsoft.AspNetCore.Mvc;

namespace LearnModelBinding.Models
{
    public class User
    {
        [FromHeader(Name = "test-header")]
        public string header {get;set;}
        public int Id { get; set; }
        public string Name { get; set; }
        public string Department { get; set; }
        public string[] Roles { get; set; }
    }

}
