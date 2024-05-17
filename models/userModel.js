const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username is Required"],
    },

    email: {
      type: String,
      required: [true, "Email is Required and unique"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },
    photo:{
      type:String,
      default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
