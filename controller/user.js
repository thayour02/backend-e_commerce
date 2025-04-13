const mongoose = require('mongoose')
const User = require("../model/user")
const bycrypt = require('bcryptjs')
const Cart = require('../model/cart')
const { json } = require('express')

const createUser =  async(req,res)=>{
    const user = req.body
    const query ={email:user.email}
    try {
       const existingUser = await User.findOne(query)
       if(existingUser){
        return res.status(302).json({message:"user alredy exist", success:false})
       }
       const users = await User.create(user)
       return res.status(200).json({
        success:true,
        message:"account create successfully",
        users
       })
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}

const getAllUser = async(req,res)=>{
    try {
        const users = await User.find({})
        res.status(200).json({
            message:"users",
            success:true,
            users
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}


const deleteUser = async(req,res)=>{
    const userId = req.params.id
   
    try {
        const deleteUser = await User.findByIdAndDelete(userId)
        if(!deleteUser){
            return res.status(404).json({message:"user not exist"})
        }


        return res.status(200).json({
            message:"user deleted successfully",
            success:true
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getAdmin = async(req,res)=>{
    const email = req.query.email
    const query = {email:email}
    try {
       const user = await User.find(query).exec()
       if(email !== req.decoded.email){
        return res.status(403).send({message:"forbidden access"})
       }
       let admin = false
       if(user){
        admin = user?.role === "admin"
       }
       return res.status(200).json({admin})
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

const makeAdmin = async(req,res)=>{
    const userId = req.params.id
    const  {name,email,photoURL,role}= req.body

    try {
        const updatedUser = await User.findByIdAndUpdate(userId,
            {role:"admin"},{new:true, runValidators:true})
            if(!updatedUser){
                return res.status(404).json({message:"User not found"})
            }
            return res.status(202).json({
                success:true,
                message:"updated succesfully",
                updatedUser
            })
    } catch (error) {
        throw new Error(error)
    }
}
const getUserByEmail = async(req,res)=>{
    // const userId = req.params.id
    const email = req.query.email
    const query = {email:email}
    try {
        const user = await User.findOne(query)
        return res.status(200).json({
            user
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}

const updatedUser = async(req,res)=>{
    const {name,photoURL} = req.body
    const email = req.query.email

    const updateData = { name, photoURL };
    const query = {email:email}
    try {
        const update = await User.findOneAndUpdate(query,updateData,{new:true})
        res.status(200).json(update)
    } catch (error) {
        throw new Error(error)
    }
}


module.exports = {createUser,getAllUser,getUserByEmail,getAdmin,makeAdmin,deleteUser,updatedUser}