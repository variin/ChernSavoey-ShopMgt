var express = require('express');

var router = express.Router();


router.get('/', async function (req, res, next) {
   res.render('addproduct');
});

router.get("/", async (req, res) => {
   const storeId = req.params.storeId;
   const categoryId = req.params.categoryId;
 
   const menuDetails = await db.collection("store")
         .doc("cafeAmazon")
         .get()
         .then((querySnapshot) => querySnapshot.data());
 
   const shopName = menuDetails.storeName;
   let menuList = menuDetails.menu;
   const categoriesList = menuDetails.categories;
   let categoriesFilter = [];
   if (categoryId) {
         categoriesFilter = menuDetails.categories.filter((item) => item.category == categoryId)
         menuList = menuList.filter((item) => item.category == categoryId);
   }
   console.log(storeId);
   console.log(shopName);
   console.log(menuList);
   console.log(categoriesList);
   console.log(categoriesFilter);
 
   res.render("addproduct", { storeId, shopName, menuList, categoriesList, categoriesFilter });
 
 }
 );

 router.get("/:categoryId", async (req, res) => {
   const storeId = req.params.storeId;
   const categoryId = req.params.categoryId;
 
   const menuDetails = await db.collection("store")
         .doc("cafeAmazon")
         .get()
         .then((querySnapshot) => querySnapshot.data());
 
   const shopName = menuDetails.storeName;
   let menuList = menuDetails.menu;
   const categoriesList = menuDetails.categories;
   let categoriesFilter = [];
   if (categoryId) {
         categoriesFilter = menuDetails.categories.filter((item) => item.category == categoryId)
         menuList = menuList.filter((item) => item.category == categoryId);
   }
   console.log(storeId);
   console.log(shopName);
   console.log(menuList);
   console.log(categoriesList);
   console.log(categoriesFilter);
 
 
   res.render("addproduct", { storeId, shopName, menuList, categoriesList, categoriesFilter, });
 }
 );


module.exports = router;