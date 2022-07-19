require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const hbs = require('hbs')
const path = require("path")
const app = express();
app.use(express.json());
app.use(cors());

// database connection -->
const connecttoDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected successfully")
    } catch (error) {
        console.log(error)
    }
    
}
const port = 80 || process.env.PORT
connecttoDb()
// <--
// set the view engine
app.set('view engine' , 'hbs')
app.set('views' , path.join(__dirname , 'views'));
app.use('/static',express.static('static'));
app.use(express.urlencoded());


// routes -->
app.get('/',(req,res)=>{
    res.render('index')
    // res.send("successfully connected")
})
app.use("/api/v1/recipies" , require('./routes/recipies'))
// <--
app.listen(port ,()=>{
    console.log("server started on port "+ port)
})
