const FoodService = require('../service/food_services');
const FoodModel = require('../model/food_model');

exports.addFood = async function(req, res, next) {
    try {
        const { name, ingredients, preparing } = req.body;
        const adder = req.body.adder || "sistem";
        const type = req.body.type || "Tip Belirtilmemiş";
        const category = req.body.category || "Food";
        const food = await FoodService.addFood(adder, name, ingredients, preparing, category, type);
        res.status(201).json({
            message: "food saved",
            food
        });
    } catch (error) {
        next(error);
    }
};

// Get foods added by the user
exports.getAddedFoods = async function(req, res, next) {
    try {
        const { adder } = req.body;
        const foods = await FoodService.getAddedFoods(adder);
        res.json(foods);
    } catch (error) {
        next(error);
    }
}

// Find foods by ingredients
exports.findFoodsByIngredients = async function(req, res, next) {
    try {
        const { ingredients, category } = req.body;
        const foods = await FoodService.findFoodsByIngredients(ingredients, category);
        res.json(foods);
    } catch (error) {
        next(error);
    }
};

// Get adder by food
exports.getAdderByFood = async function(req, res, next) {
    try {
        const { name, ingredients, preparing } = req.body;
        const food = await FoodService.getAdderByFood(name, ingredients, preparing);
        res.json(food);
    } catch (error) {
        next(error);
    }
};
/*----------------içindekilerde 2 adet su olan yemekte su artırsak o yemek de çıkacak-------------------
exports.findFoodsByOnlyIngredients = async function (req, res, next) {
    try {
        const { ingredients } = req.body;
        const foods = await FoodService.findFoodsByOnlyIngredients(ingredients);
        res.json(foods);
    } catch (error) {
        next(error);
    }
}
*/
exports.findFoodsByOnlyIngredients = async function (req, res, next) {
    try {
        const { ingredients } = req.body;

        // ingredients değişkeninin bir dizi olup olmadığını kontrol et
        if (!Array.isArray(ingredients)) {
            throw new TypeError('ingredients must be an array');
        }

        const foods = await FoodService.findFoodsByOnlyIngredients(ingredients);
        res.json(foods);
    } catch (error) {
        next(error);
    }
}
exports.returnAllFoodByCategory = async function (req,res,next){
    try {
        const {category} = req.body;
        const foods = await FoodModel.find({category:category});
        res.json(foods);
    } catch (error) {
        next(error);;
    }
}
exports.returnAllFoods = async function (req,res,next){
    try {
        const foods = await FoodModel.find();
        res.json(foods);
    } catch (error) {
        next(error);
    }
}

/*
const FoodService = require('../service/food_services');
const FoodModel = require('../model/food_model');

exports.addFood = async function(req, res, next) {
    try {
        const {adder, name, ingredients, preparing } = req.body;
        //NULL CHECK İLE EĞER VERİ NULL GELİRSE SİSTEM OLARAK KAYDET
        //const addeduser = req.body.addeduser || "sistem";
        const food = FoodService.addFood(adder, name, ingredients, preparing);
        res.json(food);
        res.status(201).json({
            message: "food saved",
            food
        });
    } catch (error) {
        next(error);
    }
};

//KULLANICININ EKLEDİĞİ YEMEKLERİNİ GETİRME
exports.getAddedFoods = async function(req, res, next) {
    try {
        const { adder } = req.body;
        const foods = await FoodService.getAddedFoods(adder);
        res.json(foods);
    } catch (error) {
        next(error);
    }
}
//YEÖEĞİ MALZEMELERİNE GÖRE BULMA
exports.findFoodsByIngredients = async function(req, res, next) {
    try {
        const { ingredients } = req.body;
        const foods = await FoodService.findFoodsByIngredients(ingredients);
        res.json(foods);
    } catch (error) {
        next(error);
    }
};
//YEMEK ÖZELLİKLERİNE GÖRE EKLEYENİ GETİRME
exports.getAdderByFood = async function(req, res, next) {
    try {
        const {name, ingredients, preparing } = req.body;
        const food = await FoodService.getAdderByFood( name, ingredients, preparing);
        res.json(food);
    } catch (error) {
        next(error);
    }
};
*/











//YEMEĞİ DB'YE KAYDETME(addeduser require deil)
/*
exports.save = async function(req, res, next) {
    try {
        const {name, ingredients, preparing } = req.body;
        //NULL CHECK İLE EĞER VERİ NULL GELİRSE SİSTEM OLARAK KAYDET
        const addeduser = req.body.addeduser || "sistem";
        const food = new FoodModel({ addeduser, name, ingredients, preparing });
        await food.save();
        res.status(201).json({
            message: "food saved",
            food
        });
    } catch (error) {
        next(error);
    }
};*/





/*
const FoodService = require('../service/food_services');
const FoodModel = require('../model/food_model');
exports.save = async function(req, res, next) {
    try {
        const { userId, name, ingredients, preparing } = req.body;
        //const food = await FoodService.saveFood(userId, name, ingredients, preparing);
        //burada FoodService.saveFood fonksiyonunu çağırmak yerine doğrudan FoodModel.save() fonksiyonunu çağırıyoruz.
        //çünkü burada userId required değil, ama fonksiyonun içinde required olduğu için hata alıyoruz, öyle yapmadım o yüzden.
        const food = new FoodModel({ userId, name, ingredients, preparing });
        await food.save();
        res.status(201).json({
            message: "food saved",
            food
        });
    } catch (error) {
        next(error);
    }
};
exports.findFoodsByIngredients = async function (req, res, next) {
    try {
        const { ingredients } = req.body;
        const foods = await FoodService.findFoodsByIngredients(ingredients);
        res.json(foods);
    } catch (error) {
        next(error);
    }
};

exports.getAddedfoods = async function (req, res, next) {
    try {
        const {UserId} = req.body;
        const foods = await FoodService.getaddedFoods(UserId);
        res.json(foods);
    } catch (error) {
        
    }
}

exports.getFoodId = async function (req,res,next){
    try {
        const {foodid} = req.body;
        const foods = await FoodService.getFood_id(foodid);
        res.json(foods);
    } catch (error) {
        
    }
}
*/