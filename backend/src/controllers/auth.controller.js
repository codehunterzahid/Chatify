import User from "../models/Users.js";
import jwt from "jsonwebtoken";
export async function signup(req, res) {
  const { fullName, email, password } = req.body;
  
  try {
    if(!fullName || !email || !password) {
      return res.status(400).json({message: "All fields are required"});
    }
    
    if(password.length < 8) {
      return res.status(400).json({message: "Password must be at least 8 characters long"});
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
      return res.status(400).json({message: "Invalid email"});
    }
    
    const existingUser = await User.findOne({ email });
    if(existingUser) {
      return res.status(400).json({message: "Email already exists"});
    }
    
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomeAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    
    const newUser = new User({
      fullName,
      email,
      password,
      profilePicture: randomeAvatar,
    });
    
    const token = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET_KEY ,{
      expiresIn: "7d",
    })
    
    
  } catch (error) {
    
  }
  
}

export function login(req, res) {
  res.send("Login Route");
}

export function logout(req, res) {
  res.send("Logout Route");
}
