var express = require('express');
const db = require('../model/db');

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

router.delete('/deleteMenu/:categoryId', async function (req, res, next) {
      const categoryId = req.params.categoryId;
      const storeID = req.body.storeID;
      const menuDetail = req.body.menuDetail;
      const menuID = req.body.menuID;
      const menuImg = req.body.menuImg;
      const menuName = req.body.menuName;
  
      const storeRef = db.collection('store').doc(storeID);
      await storeRef.update({
          "menu": await firebase.firestore.FieldValue.arrayRemove({ "category": categoryId, "menuDetail": menuDetail, "menuID": menuID, "menuImg": menuImg, "menuName": menuName })
      })
  });

module.exports = router;
