
const router = require('express').Router();
const createSessionController = require('../controllers/checkout.controller');

router.post('/session', createSessionController.createSession);




module.exports = router