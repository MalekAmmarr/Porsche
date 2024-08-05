//have do it without "Required" because it gives error

import mongoose from "mongoose";
import bcrypt from 'bcrypt';
//import important classes:
import express from "express";

import dotenv from "dotenv";
import { Int32 } from "mongodb";
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken'

//Admin Schema:
const AdminSchema = new mongoose.Schema({
    admin_name: String,
    admin_id: Number,
    password: String,
    email: String,
    fullName: String
},{timestamps:true});
//user Schema:
const userSchema=new mongoose.Schema({
        username: String,
        user_id: Number,
        email: String,
        password: String,
        DateOfBirth: Date,
        address: String,
        fullName: String   
},{timestamps:true});
export const getPrice= async function(Order,car_model){
  if(car_model=='Porsche 911'){
    Order.price=160000
  }
  if(car_model=='Porsche macan'){
    Order.price=9500;
  }
  if(car_model=='Porsche Taycan'){
    Order.price=160000;
  }
  if(car_model=='Porsche Panamera'){
    Order.price=95500
  }
  
}
//order Schema:
const orderSchema = new mongoose.Schema({
  email: { type: String },
  user_id: { type: Number },
  car_model: { type: String },
  color: { type: String },
  price: { type: Number },
  Payment_Method:{type: String},
  order_id:{type: Number}


}, { timestamps: true });

//Product schema:
const ProductSchema = new mongoose.Schema({
    car_id: Number,
    model: String,
    year: Number,
    price: Number,
    color: String,
    mileage: Number,
    horsepower: Number,
    condition: String,
    availability: String,
    category: String
},{timestamps:true});  

//Hashing Password(user):
userSchema.pre('save',(async function(next){
const salt= await bcrypt.genSalt()
this.password=await bcrypt.hash(this.password,salt);
next();
}))
//Hashing Password(admin):
AdminSchema.pre('save',(async function(next){
  const salt= await bcrypt.genSalt()
  this.password=await bcrypt.hash(this.password,salt);
  next();
  }))

AdminSchema.statics.loginAdmin =async function(email,password){
  const Admin= await this.findOne({email: email});
  if(Admin){
    const auth=await bcrypt.compare(password,Admin.password)
    if(auth){
         return Admin;
    }
    throw Error("Incorrect Password")
    
  }throw Error('Incorrect Email!')

}
userSchema.statics.loginUser =async function(email,password){
  const user= await this.findOne({email: email});
  if(user){
    const auth=await bcrypt.compare(password,user.password)
    if(auth){
         return user;
    }
    throw Error("Incorrect Password")
    
  }throw Error('Incorrect Email!')

}
orderSchema.statics.deleteUser = async function(order_id) {
    // Find the user by email
    const user = await this.findOne({ order_id: order_id});
    
    if (user) {
            // Delete the user if the password matches
            await this.deleteOne({order_id: order_id});
            return { message: 'User deleted successfully'};
        }throw new Error('wrong Order_id');
};


const AdminModel=mongoose.model('admin',AdminSchema);
const UserModel=mongoose.model('user',userSchema);
const ProductModel=mongoose.model('product',ProductSchema);
const OrderModel = mongoose.model('order', orderSchema);
export { AdminModel, UserModel, ProductModel,OrderModel};