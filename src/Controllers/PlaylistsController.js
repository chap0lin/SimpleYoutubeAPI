const axios = require('axios')
module.exports = {
    async index(req, res){
        console.log('Request Received /playlists index')
        var {search, nresults} = req.query
        if(search==undefined){
            res.json({
                "Error":"Search Field Undefined"
            })
            return
        }
        // format parameters

        nresults=nresults?nresults:1

        console.log(search + ':' + nresults)

        var resposta = []
        var stringResposta = 'https://www.youtube.com/watch?v='
        //var stringzao
        axios.get(`https://www.youtube.com/results?search_query=${search}&sp=EgIQAw%253D%253D`).then(response => {

            //primeiramente link, thumbnail, titulo
            //extra: canal Duration Views Description

            var stringOriginal =  `${response.data}`
            var stringaux = stringOriginal
            var i1, i2, thumbnail, title, playlistId, videoId;
            var i = 0;
            do{
                i1 = stringaux.search('playlistRenderer');
                stringaux = stringaux.substring(i1)
                i1 = stringaux.search('playlistId')
                stringaux = stringaux.substring(i1+13)
                i2 = stringaux.search('"');
                playlistId = stringaux.substr(0, i2);


                i1 = stringaux.search('simpleText')
                stringaux = stringaux.substring(i1+13)
                i2 = stringaux.search('"');
                title = stringaux.substr(0, i2);

                i1 = stringaux.search('"url"');
                stringaux = stringaux.substring(i1+7);
                i2 = stringaux.search('"');
                thumbnail = stringaux.substr(0, i2)
        
                i1 = stringaux.search('/watch');
                stringaux = stringaux.substring(i1+9)
                i2 = stringaux.search('list');
                videoId = stringaux.substr(0,i2-6);
                //i1 = stringaux.search('"');
                //playlistId = stringaux.substring(i2+1,i1)
                //url = url.replace('\\u0026', '&')
        
                resposta.push({
                    title,
                    thumbnail,
                    videoId,
                    playlistId
                })
                i++;
            }while(i<nresults)


            res.json(resposta)
        })   
    },
    async show(req, res){
        console.log('Request Received /playlists show')
        var {source, firstItem, nresults} = req.query
        if(source==undefined){
            res.json({
                "Error":"Source Field Undefined"
            })
            return
        }
        // format parameters

        nresults=nresults?nresults:100

        console.log(source + ':' + nresults)

        var resposta = []
        //var stringzao
        axios.get(`https://www.youtube.com/watch?v=${firstItem}\&list=${source}`).then(response => {

            //primeiramente link, thumbnail, titulo
            //extra: canal Duration Views Description

            var stringOriginal =  `${response.data}`
            var stringaux = stringOriginal
            var i1, i2, thumbnail, title, url;
            var i = 0;
            do{
                i1 = stringaux.search('playlistPanelVideoRenderer');
                if(i1 == -1)
                    break
                stringaux = stringaux.substring(i1)
                i1 = stringaux.search('simpleText')
                stringaux = stringaux.substring(i1+13)
                i2 = stringaux.search('"}');
                title = stringaux.substr(0, i2);

                i1 = stringaux.search(`thumbnails`);
                stringaux = stringaux.substring(i1+21);
                i2 = stringaux.search('"');
                thumbnail = stringaux.substr(0, i2)
        
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
    }
}