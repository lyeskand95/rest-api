var mongoose =require('mongoose');
var Schema=mongoose.Schema;

module.exports=mongoose.model('user.model',Schema({
      lastname: {
        type: String,
        required:true 
    },
      firstname: {
        type: String,
        required:true 
    },
    age: {
        type: Number
    }
}))