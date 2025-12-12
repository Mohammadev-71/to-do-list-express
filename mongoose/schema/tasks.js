import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
   title: {
      type: mongoose.Schema.Types.String,
      unique: true,
      require: true
   },
   description :{
      type: mongoose.Schema.Types.String,
      require: false
   },
   completed:{
      type: mongoose.Schema.Types.Boolean,
      default: false
   }
});


export const Task = mongoose.model("Task", taskSchema)