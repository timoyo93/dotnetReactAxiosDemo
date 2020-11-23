using System.Collections.Generic;
using RESTful_API_Demo.Models;

namespace RESTful_API_Demo.Services
{
    public class UserService : IUserService
    {
        private List<User> _userList;

        public UserService()
        {
            _userList = new List<User>
            {
                new User
                {
                    Id = 1,
                    Firstname = "Timo",
                    Lastname = "Yolo"
                },
                new User
                {
                    Id = 2,
                    Firstname = "Tim",
                    Lastname = "Stecher"
                }
            };
        }
        public List<User> GetUsers()
        {
            return _userList;
        }

        public User GetOneUser(int id)
        {
            var userFromList = new User();
            for (var index = _userList.Count - 1; index >= 0; index--)
            {
                if (_userList[index].Id == id)
                {
                    userFromList = _userList[index];
                }
            }

            return userFromList;
        }

        public User AddUser(User user)
        {
            _userList.Add(user);
            return user;
        }

        public User UpdateUser(int id, User user)
        {
            for (var index = _userList.Count - 1; index >= 0; index--)
            {
                if (_userList[index].Id == id)
                {
                    _userList[index] = user;
                }
            }

            return user;
        }

        public string DeleteUser(int id)
        {
            for (var index = _userList.Count - 1; index >= 0; index--)
            {
                if (_userList[index].Id == id)
                {
                    _userList.RemoveAt(index);
                }
            }

            return id.ToString();
        }
    }
}