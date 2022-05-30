const express=require('express');
const userModel = require('../models/user');
const app = express();

//them du lieu vao
app.post('/user',async(req,res)=>{
    const u = new userModel(req.body);
    try {
        await u.save();
        res.send(u);
    } catch (error) {
        res.status(500).send(error);
    }
});

//getAll
app.get('/list', async(req,res) =>{
    const users = await userModel.find({});
    try {
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

//update
app.patch('/user/:id', async(req,res) =>{
    try {
        await userModel.findByIdAndUpdate(req.params.id,req.body);
        await userModel.save();
        res.status(200).send("Update thành công");
    } catch (error) {
        res.status(500).send(error);
    }
});

//delete
app.delete('/user/:id', async(req,res) =>{
    try {
        const user = await userModel.findByIdAndDelete(req.params.id,req.body);
        if(!user)res.status(404).send("No item found");
        res.status(200).send('Delete thành công')
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports= app;
