const axios = require("axios")
const {addReceipe} = require("../recipeController")

async function getCategoryID() {
    const {
        data
    } = await axios.get("http://apis.juhe.cn/cook/category?key=a0c106ec027b8ac08cd151cdb0a203a2&parentid=10002")
    return data.result[0].list;
}

async function sleep(ms){
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}

async function getRecipe(id,cata) {
    let finish = false
    let index = 0
    while (!finish) {
        const {data} = await axios.get(`http://apis.juhe.cn/cook/index?key=a0c106ec027b8ac08cd151cdb0a203a2&cid=${id}&pn=${index}&rn=30`)
        if (!data.result) {
            console.log('Catagory of', cata, 'is done!')
            finish = true;
        } else {
            // console.log("index:", index)
            index += 30     
            // decide difficulty level
            // implement data in the mongodb database
            for (const recipe of data.result.data) {
                //extract the tags
                recipe.tags = recipe.tags.split(";")[0]
                addReceipe(recipe,cata)
                await sleep(100)
            }
        }
    }
}


async function main() { 
    // const categoryList = await getCategoryID();
    // const categoryIdList = categoryList.map(categoryObj => categoryObj.id)
    // console.log("categoryIdList:", categoryIdList)
    const { data } = await axios.get("http://apis.juhe.cn/cook/category?parentid=10002&dtype=&key=a0c106ec027b8ac08cd151cdb0a203a2")
    const list = data.result[0].list.map(cata => ({ id: cata.id, name: cata.name }))
    // console.log(list)
    for (const cata of list) {
        console.log("categoryId:", cata.id, 'name:', cata.name)
        await getRecipe(cata.id,cata.name)
        await sleep(500)
    } 
}

module.exports = main