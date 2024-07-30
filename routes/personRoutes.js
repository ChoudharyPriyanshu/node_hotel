const express = require('express');
const router = express.Router();
const person = require('./../models/person');

router.post('/',async (req,res)=>{

    try{
     const data = req.body //assuming the request body contains data
     const newPerson = new person(data); // create the new person document using mongoose model
    const savedPerson = await newPerson.save(); // save the new persion to the database
    console.log('data saved');
    res.status(200).json(savedPerson);
    }
    catch(err){
     console.log(err);
     res.status(500).json({error:'internal server error'});
    } 
   })
   
   // get method to get the person details
   router.get('/',async (req,res)=>{
     try{
      const data = await person.find();
      console.log('data fetched');
      res.status(200).json(data);
     }
     catch(err){
       console.log(err);
       res.status(500).json({error:'internal server error'});
     }
   })

   router.get('/:workType',async (req,res)=>{
    try{
     const workType =req.params.workType;
     if(workType=='chef' || workType=='manager' || workType=='waiter'){
      const response = await person.find({work: workType});
      console.log("response fetched");
      res.status(200).json(response);
     }
     else{
      res.status(404).json({error:'invalid workType'})
     }
    }
    catch(err){
      console.log(err);
    res.status(500).json({error:'internal server error'});
    }
})

router.put('/:id',async (req,res)=>{
    try{
    const personId = req.params.id;
    const updatedPersonData = req.body;
    
    const response = await person.findByIdAndUpdate(personId,updatedPersonData,{
        new: true, //Return The Updated Data
        runValidators: true //Run Mongoose Validations 
    });
    
    if(!response){
        return res.status(404).json({error: 'person not found'})
    }
    console.log('data updated');
    res.status(200).json(response);

    }
    catch(err){
        console.log(err);
    res.status(500).json({error:'internal server error'});
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;
        const response = await person.findByIdAndDelete(personId)
        if(!response){
            return res.status(404).json({error: 'person not found'})
        }

        console.log('data deleted');
    res.status(200).json({message:'person deleted successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});  
    }
})

module.exports = router;