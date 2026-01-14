const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

router.get('/', activityController.index);
router.get('/create', activityController.create);
router.post('/store', activityController.store);
router.get('/edit/:id', activityController.edit);
router.put('/update/:id', activityController.update);
router.delete('/delete/:id', activityController.destroy);

module.exports = router;