# Porsche Website Project

## Project Description

This project is a fully-functional Porsche website developed from scratch by our team. We created both the backend and frontend, connected them, and used MongoDB to store our data.

## Features

- User and Admin authentication with JWT.
- Separate login pages for users and admins.
- MongoDB for data storage.
- Express.js for backend routing and middleware.
- EJS templating engine for rendering views.
- Cookie-based authentication.
- Basic CRUD operations for user and admin data.

## Project Structure

```bash
/project-root
├── Middleware
│   └── authMiddleware.js
├── Schemas.js
├── views
│   ├── About_us.ejs
│   ├── Account.ejs
│   ├── AccountAdmin.ejs
│   ├── AdminHome.ejs
│   ├── car-details.ejs
│   ├── Contact.ejs
│   ├── CreateAdmin.ejs
│   ├── DeleteOrder.ejs
│   ├── index.ejs
│   ├── Login.ejs
│   ├── LoginAdmin.ejs
│   ├── MalekCar.ejs
│   ├── Order.ejs
│   ├── ShowOrderes.ejs
│   ├── Signup.ejs
│   ├── UserHome.ejs
│   └── images
├── .env
├── index.js
└── package.json
```
## 1.Installation and Setup

### Clone the repository:
```bash
git clone https://github.com/MalekAmmarr/porsche-website.git
cd porsche-website
```
## 2.Install the dependencies:
```bash
npm install
```
## 3.Set up environment variables:
Create a .env file in the project root and add your MongoDB connection string:
```bash
MONGODB_URI=mongodb://username:password@host:port/database
JWT_SECRET=your_jwt_secret
```
## 4.Run the application:
```bash
npm start
```
The server will start on http://localhost:3000

## Middleware
### authMiddleware.js
```javascript
import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'our secret', (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/Login');
            } else {
                next();
            }
        });
    } else {
        res.redirect('/Login');
    }
};

export const requireAuth2 = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'our secret', (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/LoginAdmin');
            } else {
                next();
            }
        });
    } else {
        res.redirect('/LoginAdmin');
    }
};
```
### Package.json
```json
{
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.4.5",
    "ejs": "^3.1.10",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.3.4",
    "nodemon": "^3.1.0"
  },
  "name": "server",
  "version": "1.0.0",
  "description": "connect",
  "main": "index.ejs",
  "type": "module",
  "scripts": {
    "start": "nodemon index.js"
  },
  "author": "",
  "license": "ISC"
}
```

### index.js

```javascript
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { AdminModel, UserModel, OrderModel, ProductModel, getPrice } from './Schemas.js';
import bcrypt from 'bcrypt';
import { requireAuth, requireAuth2 } from './Middleware/authMiddleware.js';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const createToken = (id) => {
    return jwt.sign({ id }, 'our secret', { expiresIn: '2m' });
};

const Port = 3000;

const MongoUrl = process.env.MONGODB_URI;

if (!MongoUrl) {
    console.error("MongoDB URI not provided.");
    process.exit(1);
}

mongoose.connect(MongoUrl, { dbName: 'Porsche' })
    .then(() => {
        console.log("Database connected successfully.");
        app.listen(Port, () => { console.log('Server is running on port', Port); });
    })
    .catch((error) => {
        console.error("Error connecting to database:", error);
    });

app.set('view engine', 'ejs');
app.use(express.static('views'));

app.get('/', (req, res) => {
    res.render('index');
    console.log("You're in the index");
});

// Define other routes and middleware...

```
## Contributing
We welcome contributions! Please fork the repository and submit a pull request for review.

## License
This project is licensed under the MIT License.
