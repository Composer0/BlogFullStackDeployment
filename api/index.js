const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const adminRoute = require("./routes/admin");
const postsRoute = require("./routes/posts");
const categoriesRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path")


dotenv.config();
app.use(express.json()); //allows json objects to be sent.
app.use("/images", express.static(path.join(__dirname, "/images")))
// app.use(express.static(path.resolve(__dirname, "../client/build"))); //Node will serve files from the React app.
// app.get("/api", (req,res) => {
//     res.json({message: "I think we're in business"}); 
// }) //Handle GET requests to /api route.
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// }) // All other Get requests not handled before will return our React app.

mongoose.connect(process.env.MONGO_URL).then(console.log("Connected to Railway.app")).catch((err) => console.log(err));
// Mongoose always treats creating a new index as true so it is no longer required in the code. If false then you will need to indicate it in the code. Otherwise you are absolutely fine.

//Multer code being used for picture upload and storage on the server.
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null,"images")
    }, filename:(req, file,cb) =>{
        cb(null, req.body.name)
    },
}); //cb stands for callback function

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req, res)=>{
    res.status(200).json("file has been uploaded.")
});
//End of Multer code.


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/admin", adminRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", categoriesRoute);

app.get('/', (req, res) => {
    res.console.log("Hello Creators' Blog")
})

// app.get('/', (req, res) => {
//     res.json({msg: 'Hello world!!!'});
// });

app.use("/Orion", (req, res) => {
    console.log("This Url is being seen")
})


app.listen("4274", () => {
    console.log("Backend is running");
})