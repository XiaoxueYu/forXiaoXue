var mongoose = require('mongoose')
var MealSchema = require('../schemas/meal')
var Meal  = mongoose.model('Meal', MealSchema)

module.exports = Meal

