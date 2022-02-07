
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import authModel from "../models/authModel.js";

export const signin = async(req, res) => {
 const {email, password} = req.body;
 try {
     const existingUser = await authModel.findOne({email});
     if(!existingUser){
        return res.status(404).json({message: 'User Does not Exist!'});
     }
     const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
     if(!isPasswordCorrect){
        return res.status(400).json({message: 'Invalid Credentials !'});
     } 
     const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.SECRET_KEY, {expiresIn: '2h'});
     res.status(200).json({ data: existingUser, token, message: 'Signed In Successfully!'});

 } catch (error) {
    res.status(404).json({message: error.message});
 }
}

export const signup = async(req, res) => {
    const {firstName, lastName, email, password, confirmPassword} = req.body;
    try {
        const existingUser = await authModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'User Already Exist!'});
        }
        if(password !== confirmPassword){
            return res.status(400).json({message: 'Passwords Mismatched!'});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const body = {
            name: `${firstName} ${lastName}`,
            email: email,
            password: hashedPassword,
        }
        const data = await authModel.create(body);
        if(data){
            const token = jwt.sign({email: data.email, id: data._id}, process.env.SECRET_KEY, {expiresIn: '2h'});
            res.status(200).json({ data, token, message: 'Account Created Successfully!'});
        }
    } catch (error) {
    res.status(404).json({message: error.message});
    }
}

 