const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../../models/UserModel')

const readUser = new express.Router()

readUser.get('/', async (req, res) => {
    if(req.headers.bearer){
        const {data} = jwt.verify(req.headers.bearer, process.env.JWTSECRET)
        const user = await User.findOne({_id: data})
        if(!user){return res.status(404).send({Error: "user not found!"})}
        return res.send(JSON.stringify({userPhone: user.userPhone}))
    }
    res.status(400).send({Error: "bad request!"})
})

readUser.get('/check', async (req, res) => {
    if(!(req.headers.userphone && req.headers.secret == 'V]W9EphbD/77>V-"^q')){return res.status(400).send({Error: "bad request!"})}
    try{
        const checkUser = await User.findOne({userPhone: req.headers.userphone})
        if(!checkUser){return res.status(400).send({Error: "no user found"})}
        const token = jwt.sign({ data: checkUser.userPhone }, process.env.JWTSECRET)
        res.send({token})
    }catch(e){
        res.status(500).send({Error: "server error"})
    }
})

module.exports = readUser