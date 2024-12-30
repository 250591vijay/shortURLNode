const express = require("express");
const router = express.Router();
// This will render to home which is define under views (home.ejs)
// router.get("/",(req,res)=>{
//     return res.render("home")
// })

// This will render to home which is define under views (home.ejs)
// In table form
router.get("/", async (req, res) => {
  const allurls = await URL.find({});
  return res.render("home", { 
    urls: allurls,
  });
});

module.exports = router;
