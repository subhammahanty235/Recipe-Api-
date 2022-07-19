const express = require("express")
const Recipe = require('../models/recipeschema')
const router = express.Router();
// get route to fetch all recipies 
router.get('/',async(req,res)=>{
    const queryData = {};
    const {title , category ,fields } = req.query;
    if(title){
        queryData.title = { $regex: title, $options: 'i' };
    }
    if(category){
        queryData.category = category;
    }

    let data =  Recipe.find(queryData);
    if(fields){
        const fieldList = fields.split(',').join()
        data = data.select(fieldList);
    }
    const recipies = await data;
    res.status(200).json({ length:recipies.length , recipies})
})

// post route for adding new recipies
router.post('/addnewrecipe',async(req,res)=>{
    let {title , ingredients , recipe ,linkedVideo , category } = req.body;
    // ingredients = ingredients.replaceAll(" ","");
    const ingredientsList = ingredients.split(',');
    const newRecipe = new Recipe({
        title , ingredients:ingredientsList , recipe , linkedVideo , category
    })
   const data =  await newRecipe.save();
   res.json(data);
})


module.exports = router