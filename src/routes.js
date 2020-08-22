const express = require('express')
const axios = require('axios')
const path = require('path')

const routes = express.Router()

routes.get('/', async (req, res)=>{
    console.log('Request Received')
    const {search} = req.query
    if(search==undefined){
        res.sendFile(__dirname + '/index.html')
        return
    }
    console.log(search)
    var stringResposta = 'https://www.youtube.com/watch?v='
    //var stringzao
    axios.get(`https://www.youtube.com/results?search_query=${search}`).then(response => {
        var stringOriginal =  `${response.data}`
        var i1 = stringOriginal.search('videoId');
        var string1 = stringOriginal.substring(i1+10);
        var i2 = string1.search(',');
        var string2 = string1.substr(0, i2-1)
        console.log(string2)
        stringResposta+=string2
        res.json({
            "Success": "true",
            "Search": stringResposta
        })
    })   
})
module.exports = routes