const { nanoid } = require("nanoid");

function getId() {
  return nanoid().slice(0, 5);
}

const dummyUsers = () => [
  { id: getId(), name: "Ed Carter", password: "1234" },
  { id: getId(), name: "Mary Edwards", password: "asdf" },
];

let users = dummyUsers();

const find = () => {
  // SELECT * FROM users;
  return Promise.resolve(users);
};

const insert = ({ name, password }) => {
  // INSERT INTO users (name, bio) VALUES ('foo', 'bar');
  const newUser = { id: getId(), name, password };
  users.push(newUser);
  return Promise.resolve(newUser);
};

const login = (userInput) => {
  const returnedUser = users.find((user) => {
    if(user.name === userInput.name && user.password ===userInput.password){
        return user;
    }else{
        return null;
    }  
  });

  return Promise.resolve(returnedUser);
};

module.exports = {
    find,
    insert, 
    login
}