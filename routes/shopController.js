const express = require('express');
const {db} = require('../model/db');
const router = express.Router();


// Display Menu
router.get("/:storeId", async (req, res) => {
      const storeId = req.params.storeId;
      const categoryId = req.params.categoryId;

      const menuDetails = await db.collection("store")
            .doc(storeId)
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

router.get("/:storeId/:categoryId", async (req, res) => {
      const storeId = req.params.storeId;
      const categoryId = req.params.categoryId;

      const menuDetails = await db.collection("store")
            .doc(storeId)
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
router.post("/:storeId/:categoryId/:menuId/deleteMenu", async function (req, res, next) {
      const storeId = req.params.storeId;
      const menuId = req.params.menuId;

      const menuDetails = await db.collection("store").doc(storeId).get()
            .then((querySnapshot) =>
                  querySnapshot.data()
            );
      let menuList = menuDetails.menu;
      if (menuId) {
            let menuList_remove = menuList.filter((item) => item.menuId != menuId);
            await db.collection("store").doc(storeId).update({ menu: menuList_remove })
      }

      res.redirect("/shop/");
});

module.exports = router;
