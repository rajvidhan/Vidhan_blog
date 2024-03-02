const mongoose  = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true,
            unique:true
        },
        image:{
            type:String,
            default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUXnhdI3LEPWrIltf3G-tEXa6uYEiKlbIPJQ&usqp=CAU"
        },
        category:{
            type:String,
            default:"uncategorized"
        },
        Title:{
            type:String,
            required:true,
            unique:true
        },

    },
    {timestamps:true}
);

module.exports = mongoose.model("Post",postSchema);