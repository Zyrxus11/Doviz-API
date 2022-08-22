const express = require("express")
const app = express();
const { response, request } = require("express")
const fetch = require("node-fetch")
const Ddos = require('ddos')
const ejs = require('ejs')
var ddos = new Ddos({burst:3,limit:4,maxcount:15,maxexpiry:120,checkinterval:1,testmode:false,responseStatus:403,errormessage:'Forbidden'});
const cors = require('cors')
app.use(cors())
app.use(ddos.express)

app.get('/', function(request, response)  {

// index daha hazır olmadıgı için /api ye yönlendiriyor. 
    response.redirect("/api")
})

app.get('/api', function(request,response)  {

    fetch(`https://dovizkurlari-l6vtviaacq-uc.a.run.app/api/doviz`).then(a => a.json()).then(x => {

    response.status(200).json({
    status: true,
        DOLAR: {

            alış: x.USD.ForexBuying,
            satış: x.USD.ForexSelling

        },
        EURO: {

            alış: x.EUR.ForexBuying,
            satış: x.EUR.ForexSelling

        },
        AZN: {

            alış: x.AZN.ForexBuying,
            satış: x.AZN.ForexSelling

        }

    }) 

})
    })

app.listen(8000,() => console.log('Sunucu çalışıyor.'))

console.log('=====================')
console.log('Yüklendi: API')
console.log('=====================')