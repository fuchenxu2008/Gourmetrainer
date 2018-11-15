const express = require("express")
const debugskr = require('morgan')
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const Recipe = require("./models/Recipe")
const CookedHistory = require("./models/CookedHistory")
const User = require("./models/User")
const Level = require("./models/Level")
const setRouter = require("./routes")
const main = require("./controllers/WebCrawler/getRecipes")
// const app = express(); 



mongoose.connect("mongodb://gourmetrainer:xjtlu215123@kyrie.top:27017/Gourmetrainer",{useNewUrlParser: true },()=>{
    console.log("database connected")
    // main()
    //     .then(() => console.log("all done"))
    //     .catch(err => console.log("!!!Main thread error:", err.errmsg))
})

CookedHistory.create({
    user: "5bebcde05706274c309ed41c",
    recipe: "7464",
    rating: 5
},(error, level) =>{
    if (error) return console.log("error found:", error)
    return console.log("Level added:",level)
})



// app.use(debugskr("dev"))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))

// setRouter(app)
// const axios = require("axios")
// const {addReceipe} = require("./controllers/recipeController")
// axios.get(`http://apis.juhe.cn/cook/index?key=a0c106ec027b8ac08cd151cdb0a203a2&cid=10&rn=2`).then(res =>{
//     // console.log("res.data:", res.data.result.data)
//     res.data.result.data.forEach(recipe => {
//         //extract the tags
//         recipe.tags = recipe.tags.split(";")[0]
//         addReceipe(recipe)
//     }); 
// })


// app.listen(3333, () => {console.log("server started")});


