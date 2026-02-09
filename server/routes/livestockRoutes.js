const express = require('express');
const router = express.Router();
const {
    getLivestock,
    getLivestockById,
    createLivestock,
    updateLivestock,
    deleteLivestock
} = require('../controllers/livestockController');

const { upload } = require('../config/cloudinary');

router.route('/').get(getLivestock).post(upload.array('media', 10), createLivestock);
router.route('/:id').get(getLivestockById).put(updateLivestock).delete(deleteLivestock);

module.exports = router;
