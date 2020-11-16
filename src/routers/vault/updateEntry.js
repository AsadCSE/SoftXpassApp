const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../../models/UserModel')
const updateEntry = new express.Router()

updateEntry.put('/', async (req, res) => {
        if(req.headers.bearer && req.body.updateId && req.body.siteNote.length < 101 && req.body.sitePass){
        jwt.verify(req.headers.bearer, process.env.JWTSECRET, async (err, data) => {
            if(err) {return res.status(406).send({Error: "not acceptable!"})}
            try {
                const user = await User.findOne({_id: data.data})
                if(!user) {return res.status(404).send({Error: "user not found!"})}
                const entries = user.userVault.filter((entry) => entry._id == req.body.updateId ? false : true)
                const crypt = jwt.sign(req.body.sitePass, process.env.JWTSECRET)
                entries.push({
                    site: req.body.site,
                    siteLogin: req.body.siteLogin,
                    sitePass: crypt,
                    siteNote: req.body.siteNote
                })
                await User.findOneAndUpdate({_id: data.data}, {userVault: entries})
                res.send({Success: "entry updated"})
            }catch(e) {
                res.status(500).send({Error: "server error!"})
            }
        })
    }else{
        res.status(400).send({Error: "bad request!"})
    }
})

module.exports = updateEntry