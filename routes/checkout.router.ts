
const router = require('express').Router();
const checkoutController = require('../controllers/checkout.controller');


router.post('/session', checkoutController.createSession);
router.get('/success', checkoutController.success);
router.get('/cancel', checkoutController.cancel);




module.exports = router