import mongoose from 'mongoose';

const url = "mongodb+srv://raghavsharma007r:40EvtYoSlj2wB520@cluster0.zf7liou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(url)
.then(() => console.log("Connected to MondoDB..."))
.catch((err) => console.error("Could Not Connect to DB...",err));



const UserTable = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String
});

 const User = new mongoose.model("Users",UserTable);

 export async function createUser(firstName,lastName,email, password) {
        
    const check = await checkExistingUser(email);
    if (check === "user not exist") {
      const user = new User({ firstName, lastName, email, password });
      const saved = await user.save();
      if (saved) return "saved";
      return "error";
    }
    return "user exist";
  } 

  async function checkExistingUser(email){
   
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return existingUser.firstName;
    } else {
      return 'user not exist';
    }
  }

export async function checkdetails(email,password){
    
    const existingUser = await User.findOne({email});
    if (existingUser && existingUser.password === password) {
      return existingUser.firstName;
    } else if(existingUser && existingUser.password !== password){
      return 'wrong email or password';
    } 
    else {
      return 'user not exist';
    }
}




