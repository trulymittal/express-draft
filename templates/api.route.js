const router = require('express').Router();

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

module.exports = router;
