const Livestock = require('../models/Livestock');

// @desc    Get all livestock
// @route   GET /api/livestock
// @access  Public
const getLivestock = async (req, res) => {
    try {
        const livestock = await Livestock.find();
        res.status(200).json(livestock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single livestock
// @route   GET /api/livestock/:id
// @access  Public
const getLivestockById = async (req, res) => {
    try {
        const livestock = await Livestock.findById(req.params.id);
        if (!livestock) {
            return res.status(404).json({ message: 'Livestock not found' });
        }
        res.status(200).json(livestock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new livestock
// @route   POST /api/livestock
// @access  Private (TODO: Add Auth)
const createLivestock = async (req, res) => {
    try {
        const { name, breed, age, weight, price, location, description, purpose, healthStatus, seller, offspring, isLot, lotSize, births, milkYield, gestationTime, vaccinations } = req.body;

        // Process uploaded files
        let images = [];
        let videos = [];

        if (req.files) {
            req.files.forEach(file => {
                if (file.mimetype.startsWith('image')) {
                    images.push(file.path);
                } else if (file.mimetype.startsWith('video')) {
                    videos.push(file.path);
                }
            });
        }

        // Parse nested objects if they come as strings (Multipart data)
        const parsedSeller = typeof seller === 'string' ? JSON.parse(seller) : seller;
        const parsedOffspring = typeof offspring === 'string' ? JSON.parse(offspring) : offspring;
        const parsedVaccinations = typeof vaccinations === 'string' ? JSON.parse(vaccinations) : vaccinations;

        const newLivestock = await Livestock.create({
            name,
            breed,
            age,
            weight,
            price,
            location,
            description,
            purpose,
            healthStatus,
            seller: parsedSeller,
            images,
            videos,
            offspring: parsedOffspring,
            isLot,
            lotSize,
            births,
            milkYield,
            gestationTime,
            vaccinations: parsedVaccinations
        });

        res.status(201).json(newLivestock);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update livestock
// @route   PUT /api/livestock/:id
// @access  Private
const updateLivestock = async (req, res) => {
    try {
        const livestock = await Livestock.findById(req.params.id);
        if (!livestock) {
            return res.status(404).json({ message: 'Livestock not found' });
        }

        const updateData = { ...req.body };

        // Process uploaded files if any
        if (req.files && req.files.length > 0) {
            const newImages = [];
            const newVideos = [];

            req.files.forEach(file => {
                if (file.mimetype.startsWith('image')) {
                    newImages.push(file.path);
                } else if (file.mimetype.startsWith('video')) {
                    newVideos.push(file.path);
                }
            });

            // If we have files, we append them to the existing lists
            if (newImages.length > 0) {
                updateData.images = [...(livestock.images || []), ...newImages];
            }
            if (newVideos.length > 0) {
                updateData.videos = [...(livestock.videos || []), ...newVideos];
            }
        }

        // Parse nested objects if they come as strings (Multipart data/FormData)
        if (typeof updateData.seller === 'string') updateData.seller = JSON.parse(updateData.seller);
        if (typeof updateData.offspring === 'string') updateData.offspring = JSON.parse(updateData.offspring);
        if (typeof updateData.vaccinations === 'string') updateData.vaccinations = JSON.parse(updateData.vaccinations);

        const updatedLivestock = await Livestock.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
        res.status(200).json(updatedLivestock);
    } catch (error) {
        console.error('Error updating livestock:', error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete livestock
// @route   DELETE /api/livestock/:id
// @access  Private
const deleteLivestock = async (req, res) => {
    try {
        const livestock = await Livestock.findById(req.params.id);
        if (!livestock) {
            return res.status(404).json({ message: 'Livestock not found' });
        }

        await livestock.remove(); // or findByIdAndDelete
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getLivestock,
    getLivestockById,
    createLivestock,
    updateLivestock,
    deleteLivestock
};
