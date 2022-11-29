const Post = require("../models/post");
const User = require("../models/User");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  const { username, tipo, message } = req.body;
  const date = new Date();
  const fecha = date.toDateString();

  try {
    const newPost = await Post.create({
      username,
      tipo,
      message,
      date: fecha,
    });
    return res.json("todo bien");
  } catch (error) {
    console.log(error);
  }
};



exports.getPost = async (req, res) => {
  const{comments}=req.body
  try {
    const { id } = req.params;
    const post = await Post.findById(id);



    if (!post) return res.sendStatus(404);
    console.log(comments)
    post.comments.push(comments)
    await post.save()
    return res.json("comentario añadido")
    return res.json(post);
  } catch (error) {
    return res.status(500).json("error");
  }
};

/*exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: validate req.body before to update

    // if a new image is uploaded upload it to cloudinary
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      // add the new image to the req.body
      req.body.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
      }
    );
    return res.json(updatedPost);
  } catch (error) {
    return res.status(500).json("error");
  }
};*/
