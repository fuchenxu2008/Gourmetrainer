const mongoose = require('mongoose')
const { port, mongoUrl } = require('../config');
const Recipe = require('../schema/Recipe/model')
const User = require('../schema/User/model')
const UserLevel = require('../schema/UserLevel/model')

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
}, () => {
console.log("√ [Database Connected]")
});

function NumAscSort(a,b)
{   
    return a.steps.length - b.steps.length;
}

// function aggregateRecipe(){
//     // select the tags with more than 20 dishes
//     Recipe.aggregate(
//         [
//             {$group : {_id:"$tags",count:{$sum:1}}},
//             // {$match : {count:{$gte:20}}},
//         ],(err,aggregation)=>{
//             console.log('aggregation: ', aggregation);
            // aggregation.forEach(cata => {
            //     const tmp = cata.count
                // console.log(element.count)
                // find all tags that satisfy the demand
                // Recipe.find({tags: cata._id},async (err2,result) =>{
                //     if (err2) console.log("err found: ",err2)            
                    // sort the difficulty of dishes based on the length of procedures
                    // result.sort(NumAscSort);
                    // result.forEach(dish => {
                    //     try{
                    //         console.log("length:",dish.steps.length,"tags:",dish.tags,"id:",dish._id)
                    //     }catch(error){
                    //         console.log("error found: ",dish.title)
                    //     }
                    // })
                    // let min = result[0].steps.length
                    // let max = result[result.length-1].steps.length 
                    // const fifthPoint = Math.round((max-min)/5)
                    // console.log("fifthPoint:",fifthPoint)
                    // console.log("min:",min,"max:",max)
                    // dicide the difficulties of each dishes
                    // result.forEach(dish => {
                    //     const dif = dish.steps.length - min
                    //     const uid = dish._id
                    //     let level = 0
                    //     if( dif < fifthPoint){
                    //         level = 1
                    //     }else if(dif >= fifthPoint && dif < 2*fifthPoint){
                    //         level = 2
                    //     }else if(dif >= 2*fifthPoint && dif < 3*fifthPoint){
                    //         level = 3
                    //     }else if(dif >= 3*fifthPoint && dif < 4*fifthPoint){
                    //         level = 4 
                    //     }else if(dif >= 4*fifthPoint){
                    //         level = 5
                    //     }
                        // console.log("dish:",dish._id,"level:",level)
                        // Recipe.findByIdAndUpdate(uid,{level},{new: true},(err,doc)=>{
                        //     if(err) console.log("err found in:",uid)
                        //     console.log("level:",level,"added in:",uid)
                        // })
                    // })
                    // console.log("level add to cata:",cata._id)
                // }
                // )
            // });
//             // return console.log(aggregation)
//         }
//     )
// }

// function test(){
//     User.findByIdAndUpdate("5bffc62c2263a629b5ed1211",{level:1},{new: true},(err,doc)=>{
//         if(err) console.log("err:",err)
//         console.log(doc)
//     })
// }

// aggregateRecipe()
// test()




// UserLevel.findById({_id:"5bfd072dccf0d260c89fd24f"},(err,entry)=>{
//     if(err) console.log("err found:",err.errmsg)
//     const level = entry.levelSet
//     UserLevel.findByIdAndUpdate({user_id:"5bfd072dccf0d260c89fd24f"}, {levelSet:{
//         ...level,
//         "粤菜":1
//     }},{new: true},(err,doc)=>{
//         if(err) console.log("err:",err)
//         return console.log(doc)
//     })
// })



UserLevel.create({userid:"5c167ae30ce91f82af346c9a",levelSet:{"粤菜":1}},(error,user)=>{
    if (error) console.error("error found in createing:",error.errmsg)
    return console.log("user added:",user.user)
})