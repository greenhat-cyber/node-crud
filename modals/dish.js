const mongoose = require('mongoose');

const AddonSchema = new mongoose.Schema({
    dish_id: String,
    dish_name: String,
    dish_price: Number,
    dish_image: String,
    dish_currency: String,
    dish_calories: Number,
    dish_description: String,
    dish_Availability: Boolean,
    dish_Type: Number
});

const AddonCategorySchema = new mongoose.Schema({
    addon_category: String,
    addon_category_id: String,
    addon_selection: Number,
    nexturl: String,
    addons: [AddonSchema]
});

const DishSchema = new mongoose.Schema({
    dish_id: String,
    dish_name: String,
    dish_price: Number,
    dish_image: String,
    dish_currency: String,
    dish_calories: Number,
    dish_description: String,
    dish_Availability: Boolean,
    dish_Type: Number,
    nexturl: String,
    addonCat: [AddonCategorySchema]
});

const MenuCategorySchema = new mongoose.Schema({
    menu_category: String,
    menu_category_id: String,
    menu_category_image: String,
    nexturl: String,
    category_dishes: [DishSchema]
});

const RestaurantSchema = new mongoose.Schema({
    restaurant_id: String,
    restaurant_name: String,
    restaurant_image: String,
    table_id: String,
    table_name: String,
    branch_name: String,
    nexturl: String,
    table_menu_list: [MenuCategorySchema]
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;
