var express = require('express');
const db = require('../model/db');
var router = express.Router();



router.get('/', async function (req, res, next) {
    res.render('addcategory');
});

router.post('/addCategories', async function (req, res, next) {
    // let storeID = req.body.storeID;
    let old_Categories_to_count = [];

    let checkStore = db.collection('store').doc('KkTmqhsEwfwoCB4qw8Pq');
    await checkStore.get().then(async data => {
        if (data.empty) {
            console.log('You do not have store in system');
        } else {
            let getCategories = db.collection('store').doc('KkTmqhsEwfwoCB4qw8Pq');
            console.log('getCategories' + getCategories)
            await getCategories.get().then(async doc => {
                await old_Categories_to_count.push(doc.data());
                let count_Categories = old_Categories_to_count.map(c => c.categories.length + 1);
                count_Categories = parseInt(count_Categories)
                console.log(count_Categories);

                let categoryName_Form = req.body.categoryName;
                
                let new_Categories =
                {
                    categoryId: count_Categories,
                    categoryName: categoryName_Form
                }

                old_Categories = doc.data();
                all_Categories = old_Categories.categories;

                await all_Categories.push(new_Categories);

                let addCategoriesToStore = db.collection('store').doc('KkTmqhsEwfwoCB4qw8Pq');
                await addCategoriesToStore.set({
                    categories: all_Categories
                });
            });
        }
    })
});

module.exports = router;

