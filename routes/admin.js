const express = require("express");
const router = express.Router();

const imageUpload = require('../helpers/image-upload');

const adminController = require("../controllers/admin");

/*
 CATEGORY 
*/
// get the category-delete page
router.get("/category/delete/:categoryid", adminController.category_delete_get);

// delete a category
router.post("/category/delete/:categoryid", adminController.category_delete_post);

// get the category-create page
router.get("/category/create", adminController.category_create_get);

// create a new category
router.post("/category/create", adminController.category_create_post);

// get the category-edit page
router.get("/category/:categoryid", adminController.category_edit_get);

// update a category
router.post("/category/:categoryid", adminController.category_edit_post);

// get the category-list page
router.get("/categories", adminController.category_list);

/*
 BLOG 
*/
// get the blog-delete page
router.get("/blog/delete/:blogid", adminController.blog_delete_get)

// delete a blog
router.post("/blog/delete/:blogid", adminController.blog_delete_post)

// get the blog-create page
router.get("/blog/create", adminController.blog_create_get);

// create a new blog
router.post("/blog/create", imageUpload.upload.single("resim"), adminController.blog_create_post);

// get the blog-edit page
router.get("/blogs/:blogid", adminController.blog_edit_get);

// update a blog
router.post("/blogs/:blogid", imageUpload.upload.single("resim"), adminController.blog_edit_post);

// get the blog-list page
router.get("/blogs", adminController.blog_list);

module.exports = router;