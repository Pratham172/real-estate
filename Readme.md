functional documentation backend

1. index.js

* import express
* Run server on port 7000
* import mongoose
* connect to Mongo Database using mongoose.connect

models
1. user.model.js
Here created a User Shema for organize userdata by usig mongoose.Schema 

Routing:
* Install react-router-dom: npm install react-router-dom
* It is a third party library and it is not built in react library

1. user.route.js
created a user route using express.router and exported it and then imported by index.js and given a path address
app.use("/api/user", router) and in user.route.js operations like router.get,router.post,and router.put is performed.

2. auth.route.js
created a user authentication router where signUp and signIn routing was made and import two functions signin and signup from controller/auth.control.js
* router.post("/sign-up", signup);
* router.post("/sign-in", signin);

Controller:

1. auth.control.js
In auth.control there are two functions signup and signin
* Importing  userSchema: (import User from "../models/user.model.js";)
1. signup function:
signup function is assync function to handle asynchronous tasks and then we have required user data from req.body after requiring user data we have to hash the password and store it in database.For hashing password we have to install package called bcryptjs then hashing of password is made using bcryptjs.hashSync(password,salt) where salt is random number and then we have to update this user information in user shema and saved.  
