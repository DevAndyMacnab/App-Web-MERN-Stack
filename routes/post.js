const express=require("express")
const router= express.Router()
const {getPost,createPost,updatePost,getPosts,comentarPost}=require("../controllers/posts.controllers")

router.route("/posts").get(getPosts);

router.route("/posts/:id").put(getPost);

router.route("/posts").post(createPost)



//router.route("/posts/:id").put(updatePost);



module.exports= router;