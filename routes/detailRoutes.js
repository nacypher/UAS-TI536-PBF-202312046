const express = require('express');
const router = express.Router();
const detailController = require('../controllers/detailController');

router.get('/:activityId', detailController.index); // Halaman Detail Utama
router.post('/:activityId', detailController.store); // Simpan Detail
router.get('/edit/:id', detailController.edit);      // Edit Detail
router.put('/update/:id', detailController.update);  // Update Detail
router.delete('/delete/:id', detailController.destroy); // Hapus Detail

module.exports = router;