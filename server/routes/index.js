const userRoute = require("./userRoute")

module.exports = function setRouter(app){
    app.use(userRoute)
}