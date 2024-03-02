const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    // fetch data
    const { username, email, password } = req.body;

    // validation
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // hashpassword
    const hashedpassword = await bcrypt.hash(password, 10);

    //  chek user is present or not
    const user = await User.findOne({
      email,
    });

    if (user) {
      return res.json({
        message: "user is already exist",
        success: false,
      });
    }

    // create theuser
    const newUser = await User.create({
      username,
      email,
      password: hashedpassword,
    });

    return res.json({
      message: "SignUp successfull",
      success: true,
    });
  } catch (error) {
    return res
      .json({
        message: error.message,
        success: false,
      })
      .status(400);
  }
};

exports.login = async (req, res) => {
  try {
    
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "All fields are required>>",
      });
    }

    // ceck the valid user or not
    const userDetails = await User.findOne({ email });

    if (!userDetails) {
      return res.json({
        message: "Invalid User",
        success: false,
      });
    }

    const passwordVerify = await bcrypt.compare(password, userDetails.password);
    if (!passwordVerify) {
      return res.json({
        message: "Invalid Password",
        success: false,
      });
    }

    // create  the token after te all validation s

    const token = jwt.sign({ id: userDetails._id,isAdmin:userDetails.isAdmin}, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        data:userDetails,
        token,
        message: "User Login successfully..",
        success: true,
      });
  } catch (error) {
    return res
      .json({
        message: error.message,
        success: false,
      })
      .status(400);
  }
};

exports.google = async (req, res) => {
  // in this controller we have to write the code for if user is exist then we have to login that user else we have create the profile of them
  try {
   
    const { email, googlePhotoUrl, name } = req.body;

    if (!email || !googlePhotoUrl || !name) {
      return res
        .json({
          success: false,
          message: "all fields are required",
        })
        .status(400);
    }

    const userDetails = await User.findOne({ email });

    if (!userDetails) {
      //  in this  case we have to create a user by the help of random password ..because password is require is our schema

      const getRandomPassword = Math.random().toString(36).slice(-8);
      const hashedpassword = await bcrypt.hash(getRandomPassword, 10);
      const userDetails = await User.create({
        email: email,
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        password: hashedpassword,
        image:googlePhotoUrl
      });


      const token = jwt.sign({ _id: userDetails._id,isAdmin:userDetails.isAdmin }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        data:userDetails,
        token,
        message: "User Login successfully..",
        success: true,
      });



    } else {
      // token k liye ..phle jiskiprofile ka token hai uski id phir secret and uske bad expires etc
      const token = jwt.sign({ _id: userDetails._id,isAdmin:userDetails.isAdmin }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      return res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          data:userDetails,
          token,
          message: "User Login successfully..",
          success: true,
        });
    }
  } catch (error) {
   return res.json({
    message:"Signup failed",
    success:false
   })
  }
};
