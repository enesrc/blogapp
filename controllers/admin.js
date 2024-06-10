const Blog = require("../models/blog");
const Category = require("../models/category");

const fs = require('fs');

// category start
exports.category_delete_get = async (req, res) => {
    const id = req.params.categoryid;

    try {
        const kategori = await Category.findByPk(id);

        res.render("admin/category-delete", {
            title: "Delete Category",
            kategori: kategori
        });
    }
    catch (err) {
        console.log(err);
    }
}

exports.category_delete_post = async (req, res) => {
    const id = req.body.kategoriid;

    try {
        await Category.destroy({
            where:{
                id: id
            }
        }); 

        res.redirect("/admin/categories?action=delete")
    }
    catch (err) {
        console.log(err);
    }
}

exports.category_create_get = async (req, res) => {
    try {
        res.render("admin/category-create", {
            title: "Add Category"
        })
    }
    catch (err) {
        console.log(err)
    }
}

exports.category_create_post = async (req, res) => {
    const name = req.body.kategoriadi;
    try {
        await Category.create({
            name: name
        })

        res.redirect("/admin/categories?action=create");
    }
    catch (err) {
        console.log(err)
    }
}

exports.category_edit_get = async (req, res) => {
    const id = req.params.categoryid;

    try {  
        const category = await Category.findByPk(id);
        const blogs = await category.getBlogs();
        const blogCount = await category.countBlogs();


        res.render("admin/category-edit", {
            title: category.dataValues.name,
            kategori: category.dataValues,
            blogs: blogs,
            blogCount: blogCount
        });
    }
    catch (err) {
        console.log(err);
    }
}

exports.category_edit_post = async (req, res) => {
    const id = req.body.kategoriid;    
    const name = req.body.kategoriadi;

    try {
        const category = await Category.findByPk(id);
        if(category){
            category.name = name;

            await category.save();
            return res.redirect("/admin/categories?action=edit&id=" + id);
        }
        
        res.redirect("/admin/categories");
    }
    catch (err) {
        console.log(err);
    }
}

exports.category_list = async (req, res) => {
    try {
        const categories = await Category.findAll();

        res.render("admin/category-list", {
            title: "Kategoriler",
            categories: categories,
            action: req.query.action,
            categoryid: req.query.id
        });
    }
    catch (err) {
        console.log(err);
    }
}
// category finito

// blog start
exports.blog_delete_get = async (req, res) => {
    const id = req.params.blogid;
    
    try{
        const blog = await Blog.findByPk(id);

        if(blog){
            res.render("admin/blog-delete", {
                title: "Delete Blog",
                blog: blog
            })
        }
        res.redirect("admin/blogs")

    } catch (err) { console.log(err); }
}

exports.blog_delete_post = async (req, res) => {
    const id = req.body.blogid;
    try {
        const blog = await Blog.findByPk(id);

        if(blog){
            await blog.destroy();

            return res.redirect("/admin/blogs?action=delete")
        }
        res.redirect("/admin/blogs")

    } catch (err) { console.log(err) }
}

exports.blog_create_get =  async (req, res) => {
    try {
        const categories = await Category.findAll();

        res.render("admin/blog-create", {
            title: "Add Blog",
            categories: categories
        });

    } 
    catch (err) {
        console.log(err)
    }
}

exports.blog_create_post = async (req, res) => {
    const baslik = req.body.baslik;
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    const resim = req.file.filename;
    const anasayfa = req.body.anasayfa == 'on' ? 1:0;
    const onay = req.body.onay == 'on' ? 1:0;
    const categoryid = req.body.kategori;

    try{
        await Blog.create({
            baslik: baslik,
            altbaslik: altbaslik,
            aciklama: aciklama,
            resim: resim,
            anasayfa: anasayfa,
            onay: onay,
            categoryId: categoryid
        });
        res.redirect("/admin/blogs?action=create")
    }
    catch (err) {
        console.log(err)
    }
}

exports.blog_edit_get = async (req, res) => {
    const id = req.params.blogid;
    try {
        const blog = await Blog.findByPk(id);
        const categories = await Category.findAll();

        if(blog) {
            return res.render("admin/blog-edit", {
                title: blog.dataValues.baslik,
                blog: blog.dataValues,
                categories: categories
            });
        }
        res.render("admin/blogs");
    }
    catch (err) {
        console.log(err)
    }
}

exports.blog_edit_post = async (req, res) => {
    const id = req.body.blogid;
    const baslik = req.body.baslik;
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    let resim = req.body.resim;
    if(req.file){
        resim = req.file.filename;

        fs.unlink("./public/images/" + req.body.resim, err => {
            console.log(err);
        })
    }
    const anasayfa = req.body.anasayfa == "on" ? 1 : 0;
    const onay = req.body.onay == "on" ? 1 : 0;
    const categoryId = req.body.category;

    try {
        const blog = await Blog.findByPk(id);
        if (blog) {
            blog.baslik = baslik;
            blog.altbaslik = altbaslik;
            blog.aciklama = aciklama;
            blog.resim = resim;
            blog.anasayfa = anasayfa;
            blog.onay = onay;
            blog.categoryId = categoryId;

            await blog.save()
            return res.redirect("/admin/blogs?action=edit&id=" + id);
        }
        res.redirect("admin/blogs");

    } 
    catch (err) {
        console.log(err)
    }
}

exports.blog_list = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            attributes: ["id", "baslik", "altbaslik", "resim"],
            include: Category
        })

        res.render("admin/blog-list", {
            title: "Blog List",
            blogs: blogs,
            action: req.query.action,
            blogid: req.query.id
        })
    } catch (err) { console.log(err) }
}
// blog finito