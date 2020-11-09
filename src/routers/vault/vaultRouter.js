const express = require('express')

//import routers
const createEntry = require('./createEntry')
const readEntry = require('./readEntry')
const updateEntry = require('./updateEntry')
const deleteEntry = require('./deleteEntry')

const readEntries = require('./readAllEntries')
const deleteEntries = require('./deleteAllEntries')

const errorRouter = require('../error/error')

//create vault router
const vaultRouter = new express.Router()

//add routing
vaultRouter.use('/create', createEntry)
vaultRouter.use('/read', readEntry)
vaultRouter.use('/update', updateEntry)
vaultRouter.use('/delete', deleteEntry)

vaultRouter.use('/readall', readEntries)
vaultRouter.use('/deleteall', deleteEntries)

//deny all other accesses
vaultRouter.use('*', errorRouter)

module.exports = vaultRouter