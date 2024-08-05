//import important classes:
/*import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Int32 } from "mongodb";
//import schemas:
import { AdminModel,UserModel,OrderModel,ProductModel} from './Schemas.js';



//initialize app that is equal to expresss:
const app = express();
dotenv.config();
app.use(express.urlencoded())



// Our Port for server:
const Port = 3000;

//mongo connection String:
const MongoUrl ="mongodb://alihasaballah:SE12345@ac-wsmty7c-shard-00-00.luvosxy.mongodb.net:27017,ac-wsmty7c-shard-00-01.luvosxy.mongodb.net:27017,ac-wsmty7c-shard-00-02.luvosxy.mongodb.net:27017/?replicaSet=atlas-vssly9-shard-0&ssl=true&authSource=admin";




// if condition for if the urrl is false he will print the error:
if (!MongoUrl) {
    console.error("MongoDB URI not provided.");
    process.exit(1);
}

//Here we connect to our database('Porsche'):
mongoose
   .connect(MongoUrl, {dbName:'Porsche'})
   
   .then(() => {
     console.log("Database connected successfully.");

     app.listen(Port, () => { console.log(`Server is running on port ${Port}.`);});})
     
     .catch((error) => {
     console.error("Error connecting to database:", error);
    
});


app.use(express.json()); 

//---------Get all Admins------------------
app.get("/getAdmin", async (req, res) => {
    try {
        
        res.status(200).send(await AdminModel.find())
        console.log(await AdminModel.find())
        
       
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//--------------Get one Admin by Id-----------------
/*app.get("/getOneAdmin", async (req, res) => {
    try {
        
        res.status(200).send(await AdminModel.findOne({admin_id:1}))
        console.log(await AdminModel.findOne({admin_id:1}))
        
       
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});*/

//------------Add one Admin to the Database----------------
    /*app.get('/add-admin',(req,res)=>{
        const adminName='Malek lukasi';
        const InsertAdmin = new AdminModel({
            admin_name: 'Malek Lukasi',
            admin_id: "6",
            password: "Lukasi2024",
            email: "Malek.lukasi2024@gmail.com",
            fullName: "Malek ahmed sharm el sheikh"
        })
        InsertAdmin.save().then(()=>{
            console.log(`${adminName} have been succesfully inseted to your database`)
            res.json(`${adminName} have been succesfully inseted to your database`)
        })
        .catch((err)=>{
            console.log(err)
        })
        
    });*/


