const express = require('express');
const router = express.Router();
const MenuItems = require('./../models/MenuItems');

router.get('/',async (req,res)=>{
    try{
     const data = await MenuItems.find();
     console.log('data fetched');
     res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
    }
  })

  router.post('/',async (req,res)=>{
    try{
     const menudata = req.body //assuming the request body contains data
     const newMenu = new MenuItems(menudata);// create the new menu document using mongoose model
    const savedMenu = await newMenu.save();// save the new menu  to the database
    console.log('data saved');
    res.status(200).json(savedMenu);
    }
    catch(err){
     console.log(err);
     res.status(500).json({error:'internal server error'});
    }  
   })

   router.get('/:tasteType',async (req,res)=>{
    try{
     const tasteType=req.params.tasteType;
     if(tasteType== 'sweet' || tasteType == 'sour' || tasteType == 'spicy'){
      const response = await MenuItems.find({taste: tasteType});
      console.log("response fetched");
      res.status(200).json(response);
     }
     else{
      res.status(404).json({error:'invalid tasteType'})
     }
    }
    catch(err){
      console.log(err);
    res.status(500).json({error:'internal server error'});
    }
})

router.put('/:id',async (req,res)=>{
  try{
      const menuItemId = req.params.id;
      const updatedMenuItemData = req.body;
      
      const response = await MenuItems.findByIdAndUpdate(menuItemId,updatedMenuItemData,{
        new: true, //Return The Updated Data
        runValidators: true //Run Mongoose Validations 
    });

    console.log('data updated');
    res.status(400).json(response);
    
    if(!response){
        return res.status(404).json({error: 'menuItem not found'})
    }
  }
  catch(err){
    console.log(err);
  res.status(500).json({error:'internal server error'});
  }
})

router.delete('/:id',async (req,res)=>{
  try{
      const menuItemId= req.params.id;
      const response = await MenuItems.findByIdAndDelete(menuItemId)
      if(!response){
          return res.status(404).json({error: 'menuItem not found'})
      }

      console.log('data deleted');
  res.status(200).json({message:'menuItem deleted successfully'});
  }
  catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});  
  }
})

   module.exports = router;