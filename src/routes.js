const express = require('express')
const axios = require('axios')
const path = require('path')

const routes = express.Router()

routes.get('/', async (req, res)=>{


    console.log('Request Received')
    var {search, nresults} = req.query
    if(search==undefined){
        res.sendFile(__dirname + '/index.html')
        return
    }
    // format parameters

    nresults=nresults?nresults:1

    console.log(search + ':' + nresults)

    var resposta = []
    var stringResposta = 'https://www.youtube.com/watch?v='
    //var stringzao
    axios.get(`https://www.youtube.com/results?search_query=${search}`).then(response => {

        //primeiramente link, thumbnail, titulo
        //extra: canal Duration Views Description

        var stringOriginal =  `${response.data}`
        var stringaux = stringOriginal
        var i1, i2, thumbnail, title, url;
        var i = 0;
        do{
            i1 = stringaux.search('","thumbnail"');
            stringaux = stringaux.substring(i1+37);
            i2 = stringaux.search('"');
            thumbnail = stringaux.substr(0, i2)
    
            i1 = stringaux.search('text');
            stringaux = stringaux.substring(i1+7)
            i2 = stringaux.search('"');
            title = stringaux.substr(0, i2);
    
            i1 = stringaux.search('/watch');
            stringaux = stringaux.substring(i1)
            i2 = stringaux.search('"');
            url = 'https://www.youtube.com' + stringaux.substr(0,i2);
    
            resposta.push({
                title,
                thumbnail,
                url
            })
            i++;
        }while(i<nresults)


        res.json(resposta)
    })   
})
module.exports = routes