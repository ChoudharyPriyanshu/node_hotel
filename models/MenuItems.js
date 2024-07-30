const mongoose = require('mongoose');

const menuItemschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    price:{
        type: Number,
        required : true
    },
    
    taste:{
        type: String ,
        enum:['sweet','sour','spicy']
    },
    
    is_drink:{
        type: Boolean,
        default:false
    },

    ingredients:{
        type:Array,
        default:[]
    },

    num_sales:{
        type:Number,
        default:0
    }

})

const MenuItems = mongoose.model(' MenuItems',menuItemschema);
module.exports= MenuItems;
