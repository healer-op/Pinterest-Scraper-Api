// 📦 Packages
const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const app = express();

// 🧰 Utils
const port = process.env.PORT || 3000;
const version = "v.1.0.2";
const projectname = "PinterestScraper"

// 📦 Links

// 🛣️ Routes
app.use(express.static('public'))
app.set('view engine', 'ejs')

// Homepage
app.get("/" , function(req,res){
    console.log(`[⭐]${projectname} ${version} New Page Visit`)
    res.render('home')
})

app.get("/api" , function(req,res){
    var tli = req.query.s;
    console.log(`[🟢]${projectname} ${version} Data For : ${tli} Requested`)
    var data={};
    data.name = "Pinterest Imgs";
    data.author = "🌟healer-op";
    data.projectlink = "https://github.com/healer-op";
    data.imgs = [];
    axios.get(`${tli}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('img').each((i,element) =>{
            
            const img = $(element).attr('src')
            if(img){
                if(!img.includes("75x75")){
                    data.imgs.push(img);
                }
                
            }
            
        });
    })
    .then(() => {
        res.send(data);
    });
})

app.listen(port, function(){
    console.log(`[📶]${projectname} ${version} is Working on http://localhost:${port}`);
})