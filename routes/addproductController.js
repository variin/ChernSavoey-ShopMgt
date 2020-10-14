var express = require('express');
const db = require('../model/db');
var router = express.Router();


//Display Categories (Select option)
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
   console.log('name' + shopName);
   console.log(menuList);
   console.log('cat ' + categoriesList);
   console.log('list' + categoriesFilter);

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



//Add Product
router.post('/addProducts', async function (req, res, next) {

   let getMenu = db.collection('store').doc('cafeAmazon');
   await getMenu.get().then(async doc => {
      let menuName_Form = req.body.menuName;
      let category_selector = req.body.category;
      let menuDetail_Form = req.body.menuDetails;
      let price_Form = req.body.price;
      let menuImg_file = req.body.menuImg;

      console.log("menuName_Form " +menuName_Form);
      let new_Products =
      {
         menuName: menuName_Form,
         category: category_selector,
         menuDetails: menuDetail_Form,
         price: price_Form,
         menuImg: menuImg_file
      }

      old_Products = doc.data();
      all_Products = old_Products.menu;

      await all_Products.push(new_Products);

      let addProductsToStore = db.collection('store').doc('cafeAmazon');
      await addProductsToStore.update({
         menu: all_Products
      });
   });
   res.redirect("/")
});

module.exports = router;