// 📦 Packages
const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const cors = require('cors')
const fetch = require("node-fetch");
global.fetch = require("node-fetch");
const app = express();

// 🧰 Utils
const port = process.env.PORT || 3000;
const version = "v.1.0.2";
const projectname = "PinterestScraper"
app.use(cors())

// 📦 Important 
const domainurl=`http://localhost:${port}`
const webhookurl="YOUR WEBHOOK URL";
const avatar ="https://cdn-icons-png.flaticon.com/128/145/145808.png";


// 🛣️ Routes
app.use(express.static('public'))
app.set('view engine', 'ejs')


// fetch function discord

function faster(p_message , p_url , p_color){
    fetch(
        `${webhookurl}`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // the username to be displayed
            username: 'Pinterest | Scraper',
            // the avatar to be displayed
            avatar_url:
              `${avatar}`,
            // contents of the message to be sent
            // content:
            // //   'Someone Visited HomePage',
            // enable mentioning of individual users or roles, but not @everyone/@here
            allowed_mentions: {
              parse: ['users', 'roles'],
            },
            // embeds to be sent
            embeds: [
              {
                // decimal number colour of the side of the embed
                color: `${p_color}`,
                // author
                // - icon next to text at top (text is a link)
                author: {
                  name: 'Pinterest | Scraper',
                  url: `https://github.com/healer-op`,
                  icon_url: `${avatar}`,
                },
                // embed title
                // - link on 2nd row
                title: `${p_message}`,
                url:
                  `${p_url}`,
                // thumbnail
                // - small image in top right corner.
                thumbnail: {
                  url:
                    `${avatar}`,
                },
                // embed description
                // - text on 3rd row
                // description: 'description',
                // // custom embed fields: bold title/name, normal content/value below title
                // // - located below description, above image.
                // fields: [
                //   {
                //     name: 'field 1',
                //     value: 'value',
                //   },
                //   {
                //     name: 'field 2',
                //     value: 'other value',
                //   },
                // ],
                // image
                // - picture below description(and fields)
                // image: {
                //   url:
                //     'ss',
                // },
                // footer
                // - icon next to text at bottom
                footer: {
                  text: 'Pinterest | Scraper',
                  icon_url:
                    `${avatar}`,
                },
              },
            ],
          }),
        }
      );
    
}


//error function
if(webhookurl =="YOUR WEBHOOK URL"){
    console.log("🔴 please change webhook url");
}


// Homepage
app.get("/" , function(req,res){
    console.log(`[⭐]${projectname} ${version} New Page Visit`)
    res.render('home')
    faster("New Homepage visit" , domainurl , 3066993)
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
    faster(tli , tli , 15158332)
})

app.listen(port, function(){
    console.log(`[📶]${projectname} ${version} is Working on http://localhost:${port}`);
})
