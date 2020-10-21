var express = require('express');
const db = require('../model/db');
const methodOverride = require('method-override');

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

      res.render("index", { storeId, shopName, menuList, categoriesList, categoriesFilter, });
}
);

router.get("/deleteMenu/:categoryId/:menuId", async function (req, res, next) {
      const storeId = req.params.storeId;
      const categoryId = req.params.categoryId;
      const menuId = req.params.menuId;

      const getStore = await db
            .collection("store")
            .orderBy("storeName", "asc")
            .get().then((querySnapshot) => {
                  let storeArr = [];
                  querySnapshot.forEach((store) => storeArr.push({ storeId: store.id, ...store.data() }));
                  return storeArr;
            }
            );
      const menuDetails = await db.collection("store")
            .doc("cafeAmazon")
            .get()
            .then((querySnapshot) => querySnapshot.data());
      let menuList = menuDetails.menu;
      if (menuId) {
            menuList = menuList.filter((item) => item.menuId == menuId);
      }
      console.log("menuList " + menuList);

      db.collection("store").doc("cafeAmazon").update({
            "menu": await firebase.firestore.FieldValue.arrayRemove(
                  {
                        "category": categoryId,
                        "menuId": menuId,
                        "menuImg": menuImg,
                        "menuName": menuName,
                        "price": price,
                        "qty": qty
                  })
      });

      //const storeID = req.body.storeID;
      //const menuDetail = req.body.menuDetail;
      // const menuId = req.body.menuId;
      // const menuImg = req.body.menuImg;
      // const menuName = req.body.menuName;
      // const price = req.body.price;

      // ลบหมดเลยยยย
      // const storeRef = db.collection('store').doc("cafeAmazon");
      // storeRef.delete({"menuID": menuId})


      // const storeRef = db.collection('store').doc("cafeAmazon");
      // await storeRef.update({
      //       "menu": await firebase.firestore.FieldValue.arrayRemove(
      //             {
      //                   "category": categoryId,
      //                   "menuId": menuId,
      //                   "menuImg": menuImg,
      //                   "menuName": menuName,
      //                   "price": price,
      //                   "qty": qty
      //             })
      // })
});



module.exports = router;
