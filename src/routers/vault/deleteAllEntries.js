const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../../models/UserModel')
const deleteEntries = new express.Router()

deleteEntries.post('/', async (req, res) => {
    if(!!req.headers.bearer){
        jwt.verify(req.headers.bearer, process.env.JWTSECRET, async (err, data) => {
            if(err) {return res.status(406).send({Error: "not acceptable!"})}
            try {
                await User.findOneAndUpdate({_id: data.data}, {userVault: []})
                res.send()
            }catch(e) {
                res.status(500).send({Error: "server error!"})
            }
        })
    }else{
        res.status(400).send({Error: "bad request!"})
    }
})

module.exports = deleteEntries