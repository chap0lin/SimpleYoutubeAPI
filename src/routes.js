const express = require('express')
const axios = require('axios')
const path = require('path')

const VideosController = require('./Controllers/VideosController')
const PlaylistsController = require('./Controllers/PlaylistsController')
const routes = express.Router()

routes.get('/videos', VideosController.index)
routes.get('/playlists', PlaylistsController.index)
routes.get('/playlist', PlaylistsController.show)
routes.get('/', async (req, res)=>{
    res.sendFile(__dirname + '/index.html') 
})
module.exports = routes