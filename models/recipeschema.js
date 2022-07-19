const mongoose = require("mongoose")

const recipeSchema = mongoose.Schema({
    title:{
        type:String 
    },
    ingredients :{
        type:[String]
    },
    recipe:{
        type:String,
    },
    linkedVideo:{
        type:String ,
        default:null
    },
    category:{
        type:String,
        enum:{
            values:["veg" , "nonveg" , "Vegan"],
            message:"please choose proper option",
        },
    }

})

module.exports = mongoose.model("Recipe" , recipeSchema)
