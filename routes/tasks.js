import express from "express";
const router = express.Router();
import {Task} from "../mongoose/schema/tasks.js"
import {fileURLToPath} from "url";
import path, { dirname } from "path";
import { addTaskValidationSchema } from "../utils/validationSchemas.js";
import { validationResult, matchedData, checkSchema } from "express-validator";

// DEF: get the paths of frontend files :
const __filename = fileURLToPath(import.meta.url);
const __direname = dirname(__filename)



// DEF: Handel GET of the home page:
router.get("/tasks", async (req, res)=>{
   try {
      const tasks = await Task.find();
      res.status(200).sendFile(path.join(__direname, "../", "frontend","home","home.html"))
   } catch (error) {
      res.status(500).send({error: error.message})
   }
});

// DEF: Handle GET of the data of home page:
router.get("/api/tasks", async (req, res)=>{
   try {
      req.session.visited = true,
      res.cookie("hello", "world", {maxAge:60000, signed:true})
      const tasks = await Task.find();
      res.status(200).send(tasks)
   } catch (error) {
      res.status(500).send({error: error.message})
   }
});


// DEF: Handle GET of the add task HTML page :
router.get("/tasks/add",async(req, res)=>{
   try {
      if(req.signedCookies.hello&&req.signedCookies.hello === "world"){
         return res.status(200).sendFile(path.join(__direname, "../", "frontend", "add", "add.html"))
      }else{
         res.status(400).send({errors:[{msg:"you need the correct cookie"}]})
      }
   } catch (error) {
      res.status(400).send({error:error.message})
   }
} )

// DEF : Handle POST request to add a new task to the database:
router.post("/api/tasks/add",checkSchema(addTaskValidationSchema), async(req,res)=>{
   try {
      const result = validationResult(req);
      if(!result.isEmpty()) return res.status(400).send({errors: result.array()});
      const data = matchedData(req)
      const existingTask = await Task.findOne({title: data.title})
      if(existingTask) return res.status(400).send({errors: [{msg: "title should be unique"}]})
      const newTask = new Task(data);
      await newTask.save();
      res.status(200).send({msg: "added Successfully!", newTask})
   } catch (error) {
      res.status(400).send({error: error.message})
   }
});


// DEF: Handle GET the old data on the update page
router.get("/api/tasks/:id", async(req, res)=>{
   try {
      const tasks = await Task.findById(req.params.id);
      res.status(200).send(tasks)
   } catch (error) {
      res.status(404).send({error: error.message})
   }
})


// DEF: Handle GET the update HTML page: 
router.get("/tasks/update/:id", async(req, res)=>{
   try {
      if(req.signedCookies.hello && req.signedCookies.hello === "world"){
         res.status(200).sendFile(path.join(__direname, "../", "frontend","update","update.html"))
      }else{
         res.status(400).send({errors:[{msg:"you need the correct cookie"}]})
      }
      
   } catch (error) {
      console.log(error, error.message)
   }
})


// DEF: Handle put the new data in the database :
router.put("/api/tasks/update/:id",checkSchema(addTaskValidationSchema),async(req, res)=>{
   try {
      const result = validationResult(req);
      const data = matchedData(req)
      const existingTask = await Task.findOne({title: data.title});
      if(existingTask) return res.status(400).send({errors: [{msg:"title should be unique"}]})
      const {id} = req.params;
      const checkTask = await Task.findById(id);
      if(!checkTask) return res.status(400).send({errors: [{msg:"Not found"}]})
      const task = await Task.findByIdAndUpdate(id,data, {new:true});
      res.status(200).send({msg:"Updated successfully!" ,task})
   } catch (error) {
      res.status(400).send({error: error.message})
   }
});

// DEF: Handle DELETE data form the database :
router.delete("/api/tasks/:id", async(req, res)=>{
   try {
      const {id} = req.params;
      await Task.findByIdAndDelete(id);
      res.status(200).send({msg: "task deleted"});
   } catch (error) {
      res.status(400).send({error: error.message})
   }
})
export default router