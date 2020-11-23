var express = require('express');
const { storage, db } = require('../model/db');

var router = express.Router();


// Display Menu
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
//Delete Menu
router.post("/:categoryId/:menuId/deleteMenu", async function (req, res, next) {
      const menuId = req.params.menuId;

      const menuDetails = await db.collection("store").doc("cafeAmazon").get()
            .then((querySnapshot) =>
                  querySnapshot.data()
            );
      let menuList = menuDetails.menu;
      if (menuId) {
            let menuList_remove = menuList.filter((item) => item.menuId != menuId);
            await db.collection("store").doc("cafeAmazon").update({ menu: menuList_remove })
      }

      res.redirect("/");
});

module.exports = router;
