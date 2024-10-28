const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const createPackage=(uploadMiddleware.single("image"),async(req,res)=>{
    const { originalname, path } = req.file;
    const parse = originalname.split(".");
    const ext = parse[parse.length - 1];
    const newPath = path + "." + ext;
    const files = fs.renameSync(path, newPath);
    const { token } = req.cookies;
    jwt.verify(token, SECRET, {}, async (error, info) => {
      if (error) throw error;
      const{title,description,author,duration}=req.body;
      const PostDoc = await Post.create({
        title,
        description,
        duration,
        image: newPath,
        author: info.id,
      });
      res.json(PostDoc);
    });
  
})