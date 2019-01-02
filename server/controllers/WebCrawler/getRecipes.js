const axios = require("axios")
const { addReceipe } = require("../recipeController")

const API_URL = 'http://apis.juhe.cn/cook'
const API_KEY = 'a0c106ec027b8ac08cd151cdb0a203a2'

// a function designed for waiting an interval of time when crwaling data from external API
async function sleep(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}

// fucntion to get the recipe category id with name from the API
async function getCategoryIdList() {
    const { data } = await axios.get(`${API_URL}/category?key=${API_KEY}&parentid=10002`)
    return data.result[0].list.map(cata => ({ id: cata.id, name: cata.name }))
}

// Crawl recipe from external API 
async function getRecipe(id, cata, rn = 30) {
    let finish = false
    let index = 0
    while (!finish) {
        const { data } = await axios.get(`${API_URL}/index?key=${API_KEY}&cid=${id}&pn=${index}&rn=${rn}`)
        if (!data.result) {
            console.log('Catagory of', cata, 'is done!')
            finish = true;
        } else {
            index += rn
            for (const recipe of data.result.data) {
                addReceipe(recipe, cata)
                await sleep(100)
            }
        }
    }
}

// receive a number of recipes, followed by an interval of waiting
async function main() { 
    const categoryList = await getCategoryIdList();
    for (const cata of categoryList) {
        await getRecipe(cata.id, cata.name)
        await sleep(100)
    } 
}

module.exports = main