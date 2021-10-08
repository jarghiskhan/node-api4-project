const express = require("express"); 
const server = express();
const Users = require("./users/model.js");
server.use(express.json());

console.log("Server waiting for duty.")

server.get("/api/users", (req, res) => {
    Users.find().then((users) => {
      res.status(200).json(users);
    })
    .catch(()=>{
        res.status(500).json({ message: "The users information could not be retrieved" })
    })
  });

  server.post("/api/register", (req, res) => {
    const newUser = req.body;
    if (!newUser.name || !newUser.password) {
      res.status(400).json({message:"Please provide name and password for the user"});
    } else {
      Users.insert(newUser)
        .then((user) => {
          res.status(201).json(user);
        })
        .catch(() => {
          res.status(500).json({ message: "There was an error while saving the user to the database"});
        });
    }
  });

  server.post("/api/login", (req, res) => {
    const user = req.body;
    
    if (!user.name || !user.password) {
      res.status(400).json({message:"Please provide name and password for the user"});
    } else {
      Users.login(user)
      .then((user)=>{
          res.status(200).json({message: `Welcome ${user.name}`})
      })
      .catch((err)=>{
          res.status(500).json({message:`There was an error with login. ${err}`})
      })
    }
  });

  module.exports =server;