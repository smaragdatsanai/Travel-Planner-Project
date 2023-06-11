import {User}  from "./db/database.mjs";
import bcrypt from "bcrypt"



export async function addUser(username, password, Email) {
    try {
      if (!username || !password)
        throw new Error("missing username or password")
      let user = await User.findOne({ where: { Username: username } })
      if (user)
       throw new Error(`User ${username} already exists`) 
      const Password_hash = await bcrypt.hash(password, 10)
      user = await User.create({
        Username: username,
        Email: Email,
        Password: Password_hash
        
      });
      
      return user; 
    } catch (error) {
      throw error;
    }
  }
  
  
  export async function login(username,password){
      try {
          if (!username || !password)
              throw new Error("missing username or password")
  
          let user = await User.findOne({ where: { Username: username } })
          
          if (!user)
          throw new Error(`User ${username} doesn't exist`)
          const match = await bcrypt.compare(password, user.Password)
          if(match){
              return user
          }
          else
              throw new Error("Wrong credentials")
          
      } catch (error) {
          throw error
      }
    }  
