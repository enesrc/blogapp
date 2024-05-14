const express = require("express");
const router = express.Router();

const db = require("../data/db");

router.use("/blogs/category/:categoryid", async (req, res) => {
    const id = req.params.categoryid;

    try {        
        const [blogs, ] = await db.execute("select * from blog where categoryid = ?", [id]);
        const [categories, ] = await db.execute("select * from category");

        res.render("users/blogs" , {
            title: categories[id-1].categoryname,
            blogs: blogs,
            categories: categories,
            selectedCategoryId: id
        })  

    } catch (err) { console.log(err) }

});

router.use("/blogs/:blogid", async (req, res) => {
    const id = req.params.blogid;

    try {
        const [blogs, ] = await db.execute("select * from blog where blogid = ?", [id])

        if(blogs[0]){
            return res.render("users/blog-details", {
                title: blogs[0].baslik,
                blog: blogs[0]
            });
        }
        res.redirect("/");
    
    } catch (err) { console.log(err) }
    
});

router.use("/blogs", async (req, res) => {

    try {
        const [blogs, ] = await db.execute("select * from blog where blog.onay = 1");
        const [categories, ] = await db.execute("select * from category");

        res.render("users/blogs", {
            title: "Tüm Kurslar",
            blogs: blogs,
            categories: categories,
            selectedCategoryId: null
        })

    } catch (err) { console.log(err) }

});

router.use("/", async (req, res) => {

    try {
        const [blogs, ] = await db.execute("select * from blog where blog.onay = 1 and blog.anasayfa = 1");
        const [categories, ] = await db.execute("select * from category");

        res.render("users/index", {
            title: "Popüler Kurslar",
            blogs: blogs,
            categories: categories,
            selectedCategoryId: null
        })

    } catch (err) { console.log(err) }

});

module.exports = router;