const express = require("express");
const router = express.Router();

const db = require("../data/db");

// get the category-delete page
router.get("/category/delete/:categoryid", async (req, res) => {
    const kategoriid = req.params.categoryid;

    try {
        const [kategoriler, ] = await db.execute("select * from category where categoryid=?", [kategoriid]);
        const kategori = kategoriler[0];

        res.render("admin/category-delete", {
            title: "Delete Category",
            kategori: kategori
        });
    }
    catch (err) {
        console.log(err);
    }
});

// delete a category
router.post("/category/delete/:categoryid", async (req, res) => {
    const kategoriid = req.body.kategoriid;

    try {
        const [kategoriler, ] = await db.execute("DELETE FROM category WHERE categoryid=?", [kategoriid]);
        const kategori = kategoriler[0];

        res.redirect("/admin/categories?action=delete")
    }
    catch (err) {
        console.log(err);
    }
});

// get the category-create page
router.get("/category/create", async (req, res) => {
    try {
        res.render("admin/category-create", {
            title: "Add Category"
        })
    }
    catch (err) {
        console.log(err)
    }
});

// create a new category
router.post("/category/create", async (req, res) => {
    const kategoriadi = req.body.kategoriadi;
    try {
        await db.execute("INSERT INTO category (categoryname) VALUES (?)", [kategoriadi]);

        res.redirect("/admin/categories?action=create");
    }
    catch (err) {
        console.log(err)
    }
});

// get the category-edit page
router.get("/category/:categoryid", async (req, res) => {
    const kategoriid = req.params.categoryid;

    try {
        const [kategoriler,] = await db.execute("select * from category where categoryid=?", [kategoriid]);
        const kategori = kategoriler[0];
        
        res.render("admin/category-edit", {
            title: kategori.categoryname,
            kategori: kategori
        });
    }
    catch (err) {
        console.log(err);
    }
});

// update a category
router.post("/category/:categoryid", async (req, res) => {
    const kategoriid = req.body.kategoriid;    
    const kategoriadi = req.body.kategoriadi;

    try {
        await db.execute("UPDATE category SET categoryname=? WHERE categoryid=?", [kategoriadi, kategoriid]);
        
        res.redirect("/admin/categories?action=edit");
    }
    catch (err) {
        console.log(err);
    }
});

// get the category-list page
router.get("/categories", async (req, res) => {
    try {
        const [categories, ] = await db.execute("select * from category");

        res.render("admin/category-list", {
            title: "Kategoriler",
            categories: categories,
            action: req.query.action
        })
    }
    catch (err) {
        console.log(err)
    }
});

// get the blog-delete page
router.get("/blog/delete/:blogid", async (req, res) => {
    const blogid = req.params.blogid;
    
    try{
        const [blogs,] = await db.execute("select * from blog where blogid=?", [blogid]);
        const blog = blogs[0];

        res.render("admin/blog-delete", {
            title: "Delete Blog",
            blog: blog
        })
    } catch (err) { console.log(err); }
})

// delete a blog
router.post("/blog/delete/:blogid", async (req, res) => {
    const blogid = req.body.blogid;
    try {
        await db.execute("delete from blog where blogid=?", [blogid])
        res.redirect("/admin/blogs?action=delete")

    } catch (err) { console.log(err) }
})

// get the blog-create page
router.get("/blog/create", async (req, res) => {
    try {
        const [categories, ] = await db.execute("select * from category");

        res.render("admin/blog-create", {
            title: "Add Blog",
            categories: categories
        });

    } 
    catch (err) {
        console.log(err)
    }
});

// create a new blog
router.post("/blog/create", async (req, res) => {
    const baslik = req.body.baslik;
    const aciklama = req.body.aciklama;
    const resim = req.body.resim;
    const kategori = req.body.kategori;
    const anasayfa = req.body.anasayfa == 'on' ? 1:0;
    const onay = req.body.onay == 'on' ? 1:0;

    try{
        await db.execute("INSERT INTO blog (baslik, aciklama, resim, anasayfa, onay, categoryid) VALUES (?, ?, ?, ?, ?, ?)", [baslik, aciklama, resim, anasayfa, onay, kategori]);
        res.redirect("/admin/blogs?action=create")
    }
    catch (err) {
        console.log(err)
    }
});

// get the blog-edit page
router.get("/blogs/:blogid", async (req, res) => {
    const id = req.params.blogid;
    try {
        const [blogs, ] = await db.execute("select * from blog where blogid = ?", [id]);
        const blog = blogs[0];
        const [categories, ] = await db.execute("select * from category");

        if(blog) {
            return res.render("admin/blog-edit", {
                title: blog.baslik,
                blog: blog,
                categories: categories
            });
        }
        res.render("admin/blogs");
    }
    catch (err) {
        console.log(err)
    }
});

// update a blog
router.post("/blogs/:blogid", async (req, res) => {
    const blogid = req.body.blogid;
    const baslik = req.body.baslik;
    const aciklama = req.body.aciklama;
    const resim = req.body.resim;
    const anasayfa = req.body.anasayfa == "on" ? 1 : 0;
    const onay = req.body.onay == "on" ? 1 : 0;
    const kategori = req.body.kategori;
    try {
        await db.execute("UPDATE blog SET baslik=?, aciklama=?, resim=?, anasayfa=?, onay=?, categoryid=? WHERE blogid=?", [baslik, aciklama, resim, anasayfa, onay, kategori, blogid]);
        res.redirect("/admin/blogs?action=edit");
    } 
    catch (err) {
        console.log(err)
    }
});

// get the blog-list page
router.get("/blogs", async (req, res) => {
    try {
        const [blogs, ] = await db.execute("select blogid, baslik, resim from blog");

        res.render("admin/blog-list", {
            title: "Blog List",
            blogs: blogs,
            action: req.query.action
        })
    } catch (err) { console.log(err) }
});

module.exports = router;