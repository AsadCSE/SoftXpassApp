const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../../models/UserModel')
const readEntries = new express.Router()

readEntries.get('/', async (req, res) => {
    if(req.headers.bearer){
        jwt.verify(req.headers.bearer, process.env.JWTSECRET, async (err, data) => {
            if(err) {return res.status(406).send({Error: "not acceptable!"})}
            try {
                const user = await User.findOne({_id: data.data})
                if(!user) {return res.status(404).send({Error: "user not found!"})}
                const dcrypted = user.userVault.map((entry) => {
                    const dcrypt = jwt.verify(entry.sitePass, process.env.JWTSECRET)
                    return {
                        _id: entry._id,
                        site: entry.site,
                        siteLogin: entry.siteLogin,
                        sitePass: dcrypt,
                        siteNote: entry.siteNote
                    }
                })
                res.send(JSON.stringify(dcrypted))
            }catch(e) {
                res.status(500).send({Error: "server error!"})
            }
        })
    }else{
        res.status(400).send({Error: "bad request!"})
    }
})

module.exports = readEntries