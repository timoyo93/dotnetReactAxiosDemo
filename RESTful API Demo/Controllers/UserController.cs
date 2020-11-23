using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RESTful_API_Demo.Models;
using RESTful_API_Demo.Services;

namespace RESTful_API_Demo.Controllers
{
    [ApiController]
    [Route("api")]
    public class PersonController : ControllerBase
    {
        private IUserService _userService;

        public PersonController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("users")]
        public List<User> GetAllPersonsFromList()
        {
            return _userService.GetUsers();
        }

        [HttpGet("users/{id}")]
        public User GetPersonFromList([FromRoute] int id)
        {
            var user = _userService.GetOneUser(id);
            return user;
        }

        [HttpPost("users")]
        public User AddPersonToList([FromBody] User user)
        {
            var result = _userService.AddUser(user);
            return result;
        }

        [HttpPut("users/{id}")]
        public User UpdatePerson([FromRoute] int id, [FromBody] User user)
        {
            var result = _userService.UpdateUser(id, user);
            return result;
        }

        [HttpDelete("users/{id}")]
        public string DeletePersonFromList([FromRoute] int id)
        {
            var userToRemove = _userService.DeleteUser(id);
            return $"User with Id: {userToRemove} was removed!";
        }
    }
}