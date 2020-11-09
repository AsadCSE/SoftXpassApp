const express = require('express')
const errorRouter = new express.Router()

errorRouter.get('/', (req, res) => res.status(403).send(JSON.stringify({Error: 'Access Forbidden'})))
errorRouter.post('/', (req, res) => res.status(403).send(JSON.stringify({Error: 'Access Forbidden'})))
errorRouter.put('/', (req, res) => res.status(403).send(JSON.stringify({Error: 'Access Forbidden'})))
errorRouter.patch('/', (req, res) => res.status(403).send(JSON.stringify({Error: 'Access Forbidden'})))
errorRouter.delete('/', (req, res) => res.status(403).send(JSON.stringify({Error: 'Access Forbidden'})))

module.exports = errorRouter