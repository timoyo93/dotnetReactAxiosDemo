using System.Collections.Generic;
using RESTful_API_Demo.Models;

namespace RESTful_API_Demo.Services
{
    public interface IUserService
    {
        public List<User> GetUsers();
        public User GetOneUser(int id);
        public User AddUser(User user);
        public User UpdateUser(int id, User user);
        public string DeleteUser(int id);
    }
}