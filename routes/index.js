var express = require('express');
const db = require('../model/db');
// const methodOverride = require('method-override');

var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


// menuFucntion
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

      res.render("index", { storeId, shopName, menuList, categoriesList, categoriesFilter });

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


      res.render("index", { storeId, shopName, menuList, categoriesList, categoriesFilter, });
}
);

router.get("/deleteMenu/:categoryId/:menuId", async function (req, res, next) {
      // const storeId = req.params.storeId;
      const categoryId = req.params.categoryId;
      const menuId = req.params.menuId;

      // console.log(storeId);
      console.log(categoryId);
      console.log(menuId);
      const storeRef = await db.collection("store");
      await storeRef.doc("cafeAmazon").get().then((querySnapshot) => querySnapshot.data());
      const shopName = storeRef.storeName;
      let cartList = storeRef.menu;
      if (menuId) {
            cartList = cartList.filter((item) => item.menuId == menuId);
      }

      console.log(shopName);
      console.log(cartList);

      await storeRef.update({
            "menu": await firebase.firestore.FieldValue.arrayRemove
                  ({ "category": categoryId, 
                  "menuId": menuId, 
                  "menuImg": menuImg, 
                  "menuName": menuName, 
                  "price": price })
      })
            .then(function (db) {
                  console.log("Document written with ID: ", db.id);
            })
            .catch(function (error) {
                  console.error("Error adding document: ", error);
            });
      res.redirect("/")


      // const storeRef = db.collection('store').doc("cafeAmazon");
      // await storeRef.update({
      //      "menu": await firebase.firestore.FieldValue.arrayRemove
      //      ({ "category": categoryId, "menuId": menuId, "menuImg": menuImg, "menuName": menuName, "price": price })
      // })
});

module.exports = router;
