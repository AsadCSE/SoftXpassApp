const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../../models/UserModel')
const jwt = require('jsonwebtoken')
const updateUser = new express.Router()

updateUser.put('/', async (req, res) => {
    if(!(req.headers.token && req.body.userPass)){return res.status(400).send({Error: "bad request"})}
    try{
        jwt.verify(req.headers.token, process.env.JWTSECRET, async (err, data) => {
            if(err) {return res.status(400).send({Error: "bad request"})}
            const user = await User.findOne({userPhone: data.data})
            if(!user){return res.send({Error: "bad request"})}
            const passCrypt = await bcrypt.hash(req.body.userPass, 3)
            await User.findOneAndUpdate({userPhone: user.userPhone}, {userPass: passCrypt}, {new:true})
            res.send({Success: "password updated"})
        })
    }catch(e){
        res.status(500).send({Error: "server error"})
    }
})

module.exports = updateUser