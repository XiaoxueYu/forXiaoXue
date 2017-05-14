var mongoose = require('mongoose')

var MealSchema = new mongoose.Schema({
    name:String,
    category:String,
    poster:String,
    money:Number,
    meta:{
        cteateAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})

MealSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt=Date.now()
    }else{
        this.meta.updateAt = Date.now();
    }
    next()
})

MealSchema.statics = {
    fetch:function(cb){
        return this
        .find({})
        .sort('meta.updateAt')
        .exec(cb)
    },
    findById:function(id,cb){
        return this 
        .findOne({_id:id})
        .exec(cb)
    }

}

module.exports = MealSchema