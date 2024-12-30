const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });
  //return res.json({"msg": "URL required"})
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  // To render to home.ejs
  return res.render("home",{
    id: shortID,
  });
//   return res.json({
//     id: shortID,
//   });
}
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });

  // Output
//   {
//     "totalClicks": 2,
//     "analytics": [
//         {
//             "timestamp": 1735290928123,
//             "_id": "676e7030157376dd2997c31a"
//         },
//         {
//             "timestamp": 1735291070342,
//             "_id": "676e70be950cb80965324ddf"
//         }
//     ]
// }
}
module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
