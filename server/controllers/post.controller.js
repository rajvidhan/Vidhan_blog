const Post = require("../models/post");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const isAdmin = req.user.isAdmin;
    const userId = req.user.id;

    const imageFile = req.body.image;

    if (!isAdmin) {
      return res.json({
        message: "you are not allow to create a post",
        success: false,
      });
    }
    if (!title || !content) {
      return res.json({
        message: "All fields are required..",
        success: false,
      });
    }

    const Title = title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-z0-9-]/g, "-");

    const newPost = await Post.create({
      userId: userId,
      title: title,
      content: content,
      Title: Title,
      category: category,
      image: imageFile,
    });

    return res.json({
      data: newPost,
      message: "Post creation successfully..",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: "post creation failed",
      success: false,
    });
  }
};

exports.uploadimage = async (req, res) => {
  try {
    const image = req.files.image;

    console.log("image", image);

    const imageUrl = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    return res.json({
      message: "Image uploaded successfully",
      success: true,
      data: imageUrl.secure_url,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: "Cant upload the image",
      success: false,
    });
  }
};

exports.fetchAllPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    const postDetails = await Post.find({ userId: userId }).sort({
      createdAt: -1,
    });
    return res.json({
      message: "All posts fetch successfully",
      success: true,
      data: postDetails,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: "Can't fetch the posts",
      success: false,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    console.log("hello");

    const { PostId } = req.body;
    console.log(PostId);

    await Post.findByIdAndDelete(PostId);
    return res.json({
      message: "Post delete successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
};

exports.fetchPreData = async (req, res) => {
  try {
    const { postId } = req.body;

    const postDetails = await Post.findById(postId);

    return res.json({
      data: postDetails,
      message: "Fetch  successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: "Can't fetch the data ",
      success: false,
    });
  }
};

exports.updatepost = async (req, res) => {
  try {
    const { title, _id, content, category, image } = req.body;

    const postId = _id;
    const isAdmin = req.user.isAdmin;
    if (!isAdmin) {
      return res.json({
        message: "you are not allow to update a post",
        success: false,
      });
    }
    if (!title || !content) {
      return res.json({
        message: "All fields are required..",
        success: false,
      });
    }

    const Title = title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-z0-9-]/g, "-");

    const updateWholePost = await Post.findByIdAndUpdate(
      postId,
      {
        title: title,
        content: content,
        Title: Title,
        category: category,
        image: image,
      },
      { new: true }
    );

    return res
      .json({
        success: true,
        message: "Post update successfully",
      })
      .status(200);
  } catch (error) {
    return res
      .json({
        success: false,
        message: "Post update Failed",
      })
      .status(400);
  }
};
