import commentsModel from "../models/commentsModel.js";
import authModel from "../models/authModel.js";
import mongoose from 'mongoose';

export const getComments = async(req, res) => {
    if(!req.userId) return res.json({message: "Unauthorized! Kindly Login / Sign In again!"})
   try {
    const commentsData = await commentsModel.find();
    res.status(200).json(commentsData);
   } catch (error) {
       res.status(404).json({message: error.message});
   }
}

export const addComment = async(req, res) => {
   const comment = req.body;
   const name = req.body.name;
   if(!req.userId) return res.json({message: "Unauthorized! Kindly Login / Sign In again!"})
   const newComment = new commentsModel(comment);
    try {
        const existingUser = await authModel.findOne({name});
        if(!existingUser){
           return res.status(404).json({message: 'Unauthorized! Please Login / Sign Up'});
        }
        await newComment.save()
        res.status(200).json({message: 'Commented Successfully!', data: newComment})
    } catch (error) {
       res.status(404).json({message: error.message});
    }
}

export const editComment = async(req,res) => {
    const comment = req.body
    const {id: _id} = req.params
    if(!req.userId) return res.json({message: "Unauthorized! Kindly Login / Sign In again!"})
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({message: 'No Comment Found !'})
    try {
        const updatedComment = await commentsModel.findByIdAndUpdate(_id, {...comment, _id}, {new: true});
        res.status(200).json({message: 'Comment Updated Successfully!', updatedComment})
    } catch (error) {
       res.status(404).json({message: error.message});
    }
}

export const deleteComment = async(req, res) => {
    const {id: _id} = req.params
    if(!req.userId) return res.json({message: "Unauthorized! Kindly Login / Sign In again!"})
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({message: 'No Comment Found !'})
    try {
        await commentsModel.findByIdAndRemove(_id);
    res.status(200).json({message: 'Comment Deleted Successfully!'});
    } catch (error) {
       res.status(404).json({message: error.message});
    }
}