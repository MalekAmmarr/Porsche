//import important classes:
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Int32 } from "mongodb";
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken'

//import schemas:
import { AdminModel, UserModel, OrderModel, ProductModel,getPrice} from './Schemas.js';
import bcrypt from 'bcrypt';
import { requireAuth ,requireAuth2} from './Middleware/authMiddleware.js';
dotenv.config();

//initialize app that is equal to expresss:
const app = express();
dotenv.config();
app.use(express.urlencoded())
app.use(cookieParser())



//create token:
const createToken = (id) => {
    return jwt.sign({ id }, 'our secret', { expiresIn: 2 * 60 * 1000 })
}


// Our Port for server:
const Port = 3000;

//mongo connection String:
const MongoUrl = "mongodb://alihasaballah:SE12345@ac-wsmty7c-shard-00-00.luvosxy.mongodb.net:27017,ac-wsmty7c-shard-00-01.luvosxy.mongodb.net:27017,ac-wsmty7c-shard-00-02.luvosxy.mongodb.net:27017/?replicaSet=atlas-vssly9-shard-0&ssl=true&authSource=admin";




// if condition for if the urrl is false he will print the error:
if (!MongoUrl) {
    console.error("MongoDB URI not provided.");
    process.exit(1);
}

//Here we connect to our database('Porsche'):
mongoose
    .connect(MongoUrl, { dbName: 'Porsche' })

    .then(() => {
        console.log("Database connected successfully.");

        app.listen(Port, () => { console.log('Server is running on port', Port); });
    })

    .catch((error) => {
        console.error("Error connecting to database:", error);

    });


//register view engine
app.set('view engine', 'ejs');


// Serve static files (images)
app.use(express.static('views')); // Assuming your images are stored in a directory named 'public'
// Define routes
app.get('/', (req, res) => {
    res.render('index');
    console.log("You're in the index");
});

app.get('/Login', (req, res) => {
    res.render('Login');
    console.log("You're in the Login page");
});

app.get('/car-details', (req, res) => {
    res.render('car-details');
    console.log("You're in the Car details page");
});
app.get('/AliCar', (req, res) => {
    res.render('AliCar');
    console.log("You're in the Ali's Car details page");
});
app.get('/MalekCar', (req, res) => {
    res.render('MalekCar');
    console.log("You're in the Malek's Car details page");
});
app.get('/HossCar', (req, res) => {
    res.render('HossCar');
    console.log("You're in the Hoss's Car details page");
});

app.get('/Contact', (req, res) => {
    res.render('Contact');
    console.log("You're in the Contact page");
});

app.get('/About_us', (req, res) => {
    res.render('About_us');
    console.log("You're in the About Us page");
});

app.get('/LoginAdmin', (req, res) => {
    res.render('LoginAdmin');
    console.log("You're in the LoginAdmin page");
});
let AdminInfo='';
app.post('/LoginAdmin', async (req, res) => {
    const {email,password}=req.body;
    try{
        const Admin=await AdminModel.loginAdmin(email,password)
        const token=createToken(Admin._id);
        res.cookie('jwt',token,{maxAge:2*60*1000});
        AdminInfo=Admin;
        res.redirect('./AccountAdmin');
       
    }catch(err){
        console.log(err)
    }
});
app.get('/AccountAdmin',requireAuth2, async (req, res) => {
    let path1='';
    if (AdminInfo.email === 'omar.hossam3@gmail.com') {
        path1 = './images/clients/Hoss.jpg';
    } else if (AdminInfo.email === 'ali@yahoo.com') {
        path1 = './images/clients/3elwa.jpg';
    } else if (AdminInfo.email === 'malekammar0@outlook.com') {
        path1 = './images/clients/Malekk.jpg';
    } else if (AdminInfo.email === 'Boudy@outlook.com') {
        path1 = './images/clients/boudy.jpg';
    } else if (AdminInfo.email === 'galal@outlook.com') {
        path1 = './images/clients/Gallal.jpg';
    } else if (AdminInfo.email === 'bahaa@outlook.com') {
        path1 = './images/clients/bahaa.jpg';
    } else {
        // Optionally, set a default path or handle unknown emails
        path1 = './images/clients/DefoultPhoto.jpeg';
    }
    try {
        // Fetch user orders from the database
        const AdminOrders = await OrderModel.find();

        // Log the orders to the console
        console.log("Admin Orders:", AdminOrders);

        // Render the 'Account' page with the retrieved orders
        res.render('AccountAdmin', { AdminInfo, path1, AdminOrders});

        console.log("You're in the AdminAccount page");
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error("Error fetching Admin orders:", error);
        res.status(500).send("Internal Server Error");
    }
});
app.get('/Signup', (req, res) => {
    res.render('Signup');
    console.log("You're in the Signup page");
});
app.post('/Signup', (req, res) => {

    const newUser = new UserModel(req.body);
    newUser.save().then(() => {
        console.log("new User have been succesfully inseted to your database");
        res.redirect('/');
    })
        .catch((err) => {
            console.log(err)
        })

});

//Examples routes:
/*app.get('/set-cookie',(req,res)=>{
    res.cookie('newUser',true)
    res.cookie('isEmployee',false,{maxAge:1*60*1000})
    res.send('you got a cookie');
})
app.get('/get-cookies',(req,res)=>{
    const cookies=req.cookies
    res.json(cookies)
})*/
//post login page:
let UserInfo='';
app.post('/Login',async (req, res) => {
    const {email,password}=req.body;
    try{
        const User=await UserModel.loginUser(email,password)
        const token=createToken(User._id)
        res.cookie('jwt',token,{maxAge:2*60*1000})
        res.redirect('./Account')
        UserInfo=User
    }catch(err){
        console.log(err)
  
}
});

app.get('/Account', async (req, res) => {
    let path='';
    if (UserInfo.email === 'omar.hossam3@gmail.com') {
        path = './images/clients/Hoss.jpg';
    } else if (UserInfo.email === 'ali@yahoo.com') {
        path = './images/clients/3elwa.jpg';
    } else if (UserInfo.email === 'malekammar0@outlook.com') {
        path = './images/clients/Malekk.jpg';
    } else if (UserInfo.email === 'Boudy@outlook.com') {
        path = './images/clients/boudy.jpg';
    } else if (UserInfo.email === 'galal@outlook.com') {
        path = './images/clients/Gallal.jpg';
    } else if (UserInfo.email === 'bahaa@outlook.com') {
        path = './images/clients/bahaa.jpg';
    } else {
        // Optionally, set a default path or handle unknown emails
        path = './images/clients/DefaultPhoto.jpg';
    }
    try {
        // Fetch user orders from the database
        const UserOrders = await OrderModel.find({ email: UserInfo.email });

        // Log the orders to the console
        console.log("User Orders:", UserOrders);

        // Render the 'Account' page with the retrieved orders
        res.render('Account', { UserInfo, path, UserOrders});

        console.log("You're in the Account page");
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error("Error fetching user orders:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/Logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/');
})
app.get('/UserHome',requireAuth, (req, res) => {
    res.render('UserHome',{UserInfo});
    console.log("You're in the UserHome page");
});
app.get('/Order', requireAuth, (req, res) => {
    res.render('Order');
    console.log("You're in the Order page");
});
app.post('/Order', (req, res) => {
    //console.log(req.body);
    const newOrder = new OrderModel(req.body);
    getPrice(newOrder,newOrder.car_model);
    newOrder.save().then(() => {
        console.log("new Order have been succesfully inseted to your database");
        res.redirect('./UserHome');
    })
        .catch((err) => {
            console.log(err)
        })
});
app.get('/AdminHome',requireAuth2, (req, res) => {
    res.render('AdminHome');
    console.log("You're in the AdminHome page");
});

app.get('/ShowOrderes', async (req, res) => {
    let path1 = '';

    if (AdminInfo.email === 'omar.hossam3@gmail.com') {
        path1 = './images/clients/Hoss.jpg';
    } else if (AdminInfo.email === 'ali@yahoo.com') {
        path1 = './images/clients/3elwa.jpg';
    } else if (AdminInfo.email === 'malekammar0@outlook.com') {
        path1 = './images/clients/Malekk.jpg';
    } else if (AdminInfo.email === 'Boudy@outlook.com') {
        path1 = './images/clients/boudy.jpg';
    } else if (AdminInfo.email === 'galal@outlook.com') {
        path1 = './images/clients/Gallal.jpg';
    } else if (AdminInfo.email === 'bahaa@outlook.com') {
        path1 = './images/clients/bahaa.jpg';
    } else {
        // Optionally, set a default path or handle unknown emails
        path1 = './images/clients/DefoultPhoto.jpeg';
    }

    try {
        // Fetch user orders from the database
        const AdminOrders = await OrderModel.find();

        // Log the orders to the console
        console.log("Admin Orders:", AdminOrders);

        // Render the 'Account' page with the retrieved orders
        res.render('ShowOrderes', { AdminInfo, path1, AdminOrders });

        console.log("You're in the ShowOrderes page");
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error("Error fetching Admin orders:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/CreateAdmin', (req, res) => {
    res.render('CreateAdmin');
    console.log("You're in the CreateAdmin page");
});
app.post('/CreateAdmin', (req, res) => {

    const newAdmin = new AdminModel(req.body);
    newAdmin.save().then(() => {
        console.log("new Admin have been succesfully inseted to your database");
        res.redirect('/AdminHome');
    })
        .catch((err) => {
            console.log(err)
        })

});

app.get('/DeleteOrder', (req, res) => {
    res.render('DeleteOrder');
    console.log("You're in the DeleteOrder page");
});
app.post('/DeleteOrder', async(req, res) => {

    const {order_id}=req.body;
    try{
        await OrderModel.deleteUser(order_id)
        res.redirect('./AdminHome')
        
    }catch(err){
        console.log(err)
    }
});

