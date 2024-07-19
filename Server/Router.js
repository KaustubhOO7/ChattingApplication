import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createUser, checkdetails } from "./Database.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(3000, () => {
  console.log("Connected to Port 3000");
});

app.post("/", async (req, res) => {
  
  const { email,password} = req.body;
  const check = await checkdetails(email,password);

  if (check !== 'user not exist') {
    return res.status(200).json({ message: check });
  }
  if(check === 'wrong email or password'){
    return res.status(200).json({ message : check});
  }
  return res.status(200).json({ messsage: check });

});

app.post("/create", async (req, res) => {
  
  const { firstName, lastName, email, password } = req.body;
  const create = await createUser(firstName, lastName, email, password);

  if (create === "saved") {
    return res.status(200).json({ message: "User Created Successfully" });
  }
  if (create === "user exist") {
    return res.status(200).json({ message: "user exist" });
  } 
  else {
    return res.status(401).json({ message: "Error" });
  }

});
