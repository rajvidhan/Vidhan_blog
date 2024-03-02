const express = require("express")

require('dotenv').config();
const userRoutes = require("./routes/user")
const authRoutes = require("./routes/auth");
const postRoutes= require("./routes/post");
const commentRoutes = require("./routes/comment-route")
const cookieParser = require("cookie-parser")
const {connectToCloudinary} = require("./config/cloudinary");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();




app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// connect  to cloudinary 
connectToCloudinary();


require("./config/databaseConnection").connectdb();


app.use(
	cors({
		origin:"http://localhost:5173",
		credentials:true,
	})
);
// middlewares 
app.use(express.json());
app.use(cookieParser());





// useing routes 
app.use("/api/v1/profile",userRoutes);
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/post",postRoutes)
app.use("/api/v1/comment",commentRoutes)





app.listen(3000,()=>{
    console.log("server is running on port 3000")
})