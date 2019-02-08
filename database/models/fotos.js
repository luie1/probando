const mongoose=require('../connect');
const schema=mongoose.Schema;

const fotosUsuers= schema({
    usuario:{
      type:schema.Types.ObjectId,
      ref:'Users'
    },
    img:String;
});
