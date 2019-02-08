const mongoose=require('../connect');
const schema=mongoose.Schema;

const usuarios=schema({
    nombre:String,
    edad:Number,
    fecha:{
      type:Date,
      default:Date.now()
    }
});

const user=mongoose.model('Users',usuarios);

module.exports=user;
