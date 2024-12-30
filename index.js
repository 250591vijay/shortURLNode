const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const staticRoute =require("./routes/staticRouter")
const URL = require("./models/url");
const { connectToMongoDB } = require("./connect");
const app = express();
const PORT = 8011;
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("Mongo Db Connected");
});
// To use EJS service engine
app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

// D:\ReactJS\NodeTuotrial\shortURL\controllers\url.js:6
//     if(!body.url)
//              ^ if we not use app.use(express.json()) then error come
// Middle ware jo incoming body ko parse kar sake
// It support JSON data
app.use(express.json());

// Form data ko pass karne k liye ek aur middleware ko use karenge
app.use(express.urlencoded({ extended: true }));

app.get("/test",async (req,res)=>{
    const allUrls= await URL.find({})
    return res.render("home",{
        urls:allUrls,
    });
  })
app.use("/url", urlRoute);
// https://localhost/ then we use app.use("/",staticRoute)

app.use("/",staticRoute);

// To get Short Id
// Fetch the shortId from database, push it and response
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        //visitHistory: Date.now(),
        visitHistory:{
            timestamp:Date.now(),
        }
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  //String literal
  console.log(`server is running on port ${PORT}`);
});
