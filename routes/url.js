const express = require("express");
const {handleGenerateNewShortURL,handleGetAnalytics} =require("../controllers/url");
const router = express.Router();

router.post("/",handleGenerateNewShortURL);
// Kitna time p kitne click huwa hai so we use analytics
router.get('/analytics/:shortId',handleGetAnalytics);

module.exports = router;
