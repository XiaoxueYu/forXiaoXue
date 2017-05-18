var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var MealSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    category: {
    type: ObjectId,
    ref: 'categories'
    },
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
    },
    findByTitle:function(_title,cb){
		return this
		.findOne({title: _title})
		.exec(cb)
	}
}

module.exports = MealSchema