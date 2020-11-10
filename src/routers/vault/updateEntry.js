const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../../models/UserModel')
const updateEntry = new express.Router()

updateEntry.post('/', async (req, res) => {
    if(req.headers.bearer && req.body.updateId){
        jwt.verify(req.headers.bearer, process.env.JWTSECRET, async (err, data) => {
            if(err) {return res.status(406).send({Error: "not acceptable!"})}
            try {
                const user = await User.findOne({_id: data.data})
                if(!user) {return res.status(404).send({Error: "user not found!"})}
                const entries = user.userVault.filter((entry) => entry._id == req.body.updateId ? false : true)
                entries.push({
                    site: req.body.site,
                    siteLogin: req.body.siteLogin,
                    sitePass: req.body.sitePass
                })
                await User.findOneAndUpdate({_id: data.data}, {userVault: entries})
                res.send()
            }catch(e) {
                res.status(500).send({Error: "server error!"})
            }
        })
    }else{
        res.status(400).send({Error: "bad request!"})
    }
})

module.exports = updateEntry