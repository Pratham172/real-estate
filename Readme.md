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
1. user.route.js
created a user route using express.router and exported it and then imported by index.js and given a path address
app.use("/api/user", router) and in user.route.js operations like router.get,router.post,and router.put is performed.