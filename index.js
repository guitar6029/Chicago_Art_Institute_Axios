const express = require('express');
const ejs = require('ejs');
const app = express();
const portNumber = process.env.PORT_NUMBER || 3000;
const axios = require('axios');


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.set('views', (__dirname + '/views'));
// app.set('views', (__dirname + '/views/partials'))
app.use(express.static('./public'));


let randomPage = Math.floor(Math.random() * 2000);
console.log(randomPage);

const url = `https://api.artic.edu/api/v1/artworks?page=${randomPage}`;


app.get('/', (req, res, next) => {
    axios.get(url).then(response => {
        res.render('index', { artData: response.data.data });
    })
})

app.get('/about', (req,res)=>{
    res.render('about');
})

app.listen(portNumber, () => {
    console.log(`Listening on port # ${portNumber}`);
})
