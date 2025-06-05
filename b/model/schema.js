const {
    Schema ,
    model
} = require('mongoose');

const myschema = new Schema({
    name:{
        type :String,
        required : true,
        maxlength : 200
    },
    createdAt:{
        type : Date,
        default : Date.now,
    },
});

const taskmodel = model('Todo_Item' , myschema);

module.exports = taskmodel;