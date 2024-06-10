const Blog = require("../models/blog");
const Category = require("../models/category");

const { Op } =  require("sequelize");

exports.blogs_by_category = async (req, res) => {
    const id = req.params.categoryid;

    try {        
        const blogs = await Blog.findAll({
            where:{
                categoryId: id,
                onay: true
            },
            raw: true
        });
        const categories = await Category.findAll({ raw: true });
        const title = await Category.findByPk(id);

        res.render("users/blogs" , {
            title: title.dataValues.isim,
            blogs: blogs,
            categories: categories,
            selectedCategoryId: id
        })  

    } catch (err) { console.log(err) }

}

exports.blog_details = async (req, res) => {
    const id = req.params.blogid;

    try {
        const blog = await Blog.findByPk(id);

        if(blog){
            return res.render("users/blog-details", {
                title: blog.dataValues.baslik,
                blog: blog.dataValues
            });
        }
        res.redirect("/");
    
    } catch (err) { console.log(err) }
    
}

exports.blog_list = async (req, res) => {

    try {
        const blogs = await Blog.findAll({
            where:{
                onay:{
                    [Op.eq]: true
                },
            },
            raw: true
        })
        const categories = await Category.findAll({ raw: true });

        res.render("users/blogs", {
            title: "Tüm Kurslar",
            blogs: blogs,
            categories: categories,
            selectedCategoryId: null
        })

    } catch (err) { console.log(err) }

}

exports.index = async (req, res) => {

    try {
        const blogs = await Blog.findAll({
            where: {
                [Op.and]: [
                    {onay: true},
                    {anasayfa: true}
                ]
            },
            raw: true
        });
        const categories = await Category.findAll({ raw: true });

        res.render("users/index", {
            title: "Popüler Kurslar",
            blogs: blogs,
            categories: categories,
            selectedCategoryId: null
        })

    } catch (err) { console.log(err) }

}