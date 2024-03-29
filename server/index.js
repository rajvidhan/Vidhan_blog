const express = require("express")

require('dotenv').config();
const userRoutes = require("./routes/user")
const authRoutes = require("./routes/auth");
const postRoutes= require("./routes/post");
const commentRoutes = require("./routes/comment-route")
const cookieParser = require("cookie-parser")
const {connectToCloudinary} = require("./config/cloudinary");
const cors = require("cors")
const fileUpload = require("express-fileupload");
const path = require("path");
const app = express();

app.use(cors({ origin: 'https://vidhan-blog-1.onrender.com' }));


app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// connect  to cloudinary 
connectToCloudinary();


require("./config/databaseConnection").connectdb();


const __dirname1 = path.resolve();


// middlewares 
app.use(express.json());
app.use(cookieParser());





// useing routes 
app.use("/api/v1/profile",userRoutes);
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/post",postRoutes)
app.use("/api/v1/comment",commentRoutes)


app.use(express.static(path.join(__dirname1,'/clint/dist')))
app.get("*",(req,res)=>{
res.sendFile(path.join(__dirname1,'clint','dist','index.html'))
})

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})