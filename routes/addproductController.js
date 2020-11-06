const { response } = require('express');
const express = require('express');
const {storage,db} = require('../model/db');
const router = express.Router();

let multer = require('multer');
let upload = multer();


router.get("/image/:folder/:id", async (req, res) => {
   const name = `${req.params.folder}/${req.params.id}`

   storage.bucket().file(name).download().then((data) => {
      res.status(200).send(data[0])
   })
 })


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
   console.log(categoriesList)
   let categoriesFilter = [];

   if (categoryId) {
      categoriesFilter = menuDetails.categories.filter((item) => item.category == categoryId)
      menuList = menuList.filter((item) => item.category == categoryId);
   }

   res.render("addproduct", { storeId, shopName, menuList, categoriesList, categoriesFilter });

});


//Add Product
router.post('/addProducts', upload.single('menuImg'), async function (req, res, next) {

   const d = new Date();
   const t = d.getTime();
   const id = t - 300;

   const ext = req.file.originalname.split('.')[1]

   let bucket = storage.bucket();
   let folder = "imgfood";
   let fileName = Date.now();
   let fileNameForUpload = `${folder}/${fileName}.${ext}`;
   let fileUpload = await bucket.file(fileNameForUpload);
   let publicUrl = null

   let getMenu = db.collection('store').doc('cafeAmazon');

   await getMenu.get().then(async doc => {
      let select_category = req.body.select_category;
      let menuDetail_Form = req.body.menuDetails;
      let menuName_Form = req.body.menuName;
      let price_Form = req.body.price;

      try {
         let blobStream = fileUpload.createWriteStream({
            metadata: {
               contentType: req.file.mimetype,
            },
         })

         blobStream.on("error", (err) => {
            // Handdle Error
            res.status(405).json({ error: err.toString() });
         });

         blobStream.on("finish", async () => {
            publicUrl = await bucket.file(fileNameForUpload).makePublic();
         });

         blobStream.end(req.file.buffer);
      } catch (error) {
         // Handdle Error
         res.status(400).json({ error: error.toString() });
      }

      let new_Products =
      {
         category: select_category,
         menuDetail: menuDetail_Form,
         menuId: id,
         menuImg: fileNameForUpload,
         menuName: menuName_Form,
         price: price_Form
         
      }

      old_Products = doc.data();
      all_Products = old_Products.menu;

      all_Products.push(new_Products);

      console.log(all_Products)

      let addProductsToStore = db.collection('store').doc('cafeAmazon');
      await addProductsToStore.update({
         menu: all_Products
      });
   });

   res.redirect("/")
});




module.exports = router;