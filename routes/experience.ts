import express from "express";

const router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('pages/experience');
});

export default router;