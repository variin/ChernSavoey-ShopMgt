const { response } = require('express');
var express = require('express');
const { storage } = require('firebase-admin');
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

   res.render("addproduct", { storeId, shopName, menuList, categoriesList, categoriesFilter });

}
);

// router.get("/:categoryId", async (req, res) => {
//    const storeId = req.params.storeId;
//    const categoryId = req.params.categoryId;

//    const menuDetails = await db.collection("store")
//       .doc("cafeAmazon")
//       .get()
//       .then((querySnapshot) => querySnapshot.data());

//    const shopName = menuDetails.storeName;
//    let menuList = menuDetails.menu;
//    const categoriesList = menuDetails.categories;
//    let categoriesFilter = [];
//    if (categoryId) {
//       categoriesFilter = menuDetails.categories.filter((item) => item.category == categoryId)
//       menuList = menuList.filter((item) => item.category == categoryId);
//    }

//    res.render("addproduct", { storeId, shopName, menuList, categoriesList, categoriesFilter, });
// }
// );


//Add Product
router.post('/addProducts', async function (req, res, next) {

   let getMenu = db.collection('store').doc('cafeAmazon');
   await getMenu.get().then(async doc => {
      let select_category = req.body.category;
      let menuDetail_Form = req.body.menuDetail;
      let menuId = [];

      let menuImg_file = req.body.menuImg;
      let menuName_Form = req.body.menuName;
      let price_Form = req.body.price;

      await menuId.push(doc.data());
      let count_menuId = menuId.map(c => c.menu.length + 1);
      count_menuId = parseInt(count_menuId)
      console.log(count_menuId)
      let new_Products =
      {

         category: select_category,
         menuDetail: menuDetail_Form,
         menuId: count_menuId,
         menuImg: menuImg_file,
         menuName: menuName_Form,
         price: price_Form
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

function uploadHandler(){
   if (this.file) {
      const fileName = this.file.name;
      const targetRef = subBucketRef.child(fileName);
      targetRef.put(this.file).then(response => {
         console.log(response);
         response.ref.getDownloadURL().then(photoURL => {
            this.link = photoURL;
         });
      });
   } else {
      console.log("no file upload!!");
   }
},
onfileChange(e){
   const file = e.target.files[0];
   this.file = file;
   this.link = "";
}
}


module.exports = router;