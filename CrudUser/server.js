
const express = require('express');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const exphdbs =require('express-handlebars');
//khai bao thu vien routes
 const userRouter = require('./routes/userRoutes');
const userController = require('./controllers/userController');
var url = "mongodb://localhost:27017/dbQLPost";
const app= express();
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json());
// { extname: '.hbs', defaultLayout: "main"}
app.engine('.hbs', exphdbs.engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine','.hbs');
app.use(express.json());

mongoose.connect(url,{useUnifiedTopology:true, useNewUrlParser:true});

app.use(userRouter);
//khi goi localhost post3000 thi user/ ==> userController
app.use('/user',userController);
app.listen(3000,()=>{
    console.log('Server is running');
})