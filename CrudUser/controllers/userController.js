const express=require('express');
const userModel = require('../models/user');
const app = express();

app.get('/',( req ,res) => {
    res.render('users/addOrEdit.hbs',{
        viewTitle:"Information Product"
    });
});

//them du lieu vao
app.post('/add',async(req,res)=>{
    console.log(req.body);
    if(req.body.id ==''){
        //add user
        addRecord(req,res);
    }else{
        //update user
        updateRecord(req,res);
    }
   
});

//funtion add record
function addRecord(req,res){
    const u = new userModel(req.body);
    try {
         u.save();
        // res.send(u);
        res.render('users/addOrEdit.hbs',{
            viewTitle:"Insert Product susscessfuly"
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

//funtion update record
function updateRecord(req,res){
    userModel.findOneAndUpdate({_id:req.body.id},req.body,{new:true}, ( err , doc ) =>{
        if(!err){
            res.redirect('/user/list');
        }else{
            console.log(err);
            res.render('users/addOrEdit.hbs',{
                viewTitle:"Error Update"
            });
        }
    });
}

// app.get('/list',(req,res)=>{
//     res.render('users/view-users.hbs',{
//         viewTitle:"LIST UERS"
//     });
// });

//đọc ra file json
app.get('/list-json',(req,res)=>{
    userModel.find({}).then(users=>{  
        res.json(users);
    })
   
});
//gọi ra web
app.get('/list',(req,res)=>{
    userModel.find({}).then(users=>{
        res.render('users/view-users.hbs',{
            users: users.map(user => user.toJSON())
        });
    })
   
});

//xu li su kien edit
app.get('/edit/:id',(req,res)=> {
    userModel.findById(req.params.id,(err,user) => {
        if(!err){
            res.render('users/addOrEdit.hbs',{
                viewTitle:"Update Product ",
                user:user.toJSON()
            });
        }
    });
});

//delete
app.get('/delete/:id',async(req,res)=> {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id,req.body);
        if(!user)res.status(404).send("No item found");
        // res.status(200).send('Delete thành công')
        else{
            res.redirect('/user/list');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports= app;
