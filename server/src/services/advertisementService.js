const AdvertisementModel = require("../models/advertisementModel");

const getAll = async () => {
    try {
        return await AdvertisementModel.find().sort({ createdAt: -1 });
    } catch (error) {
        throw new Error(`Failed to fetch advertisements: ${error.message}`);
    }
};

const getById = async (id) => {
    try {
        const advertisement = await AdvertisementModel.findById(id);
        if (!advertisement) {
            throw new Error('Advertisement not found');
        }
        return advertisement;
    } catch (error) {
        throw new Error(`Failed to fetch advertisement by ID: ${error.message}`);
    }
};

const getTotalCount = async () => {
    try {
        return await AdvertisementModel.countDocuments();
    } catch (error) {
        throw new Error(`Failed to count advertisements: ${error.message}`);
    }
};

const post = async (payload) => {
    try {
        return await AdvertisementModel.create(payload);
    } catch (error) {
        throw new Error(`Failed to create advertisement: ${error.message}`);
    }
};

const deleteOne = async (id) => {
    try {
        const advertisement = await AdvertisementModel.findById(id);
        if (!advertisement) {
            throw new Error('Advertisement not found');
        }
        return await AdvertisementModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Failed to delete advertisement: ${error.message}`);
    }
};

const updateOne = async (id, payload) => {
    try {
        const existing = await AdvertisementModel.findById(id);
        if (!existing) {
            throw new Error('Advertisement not found');
        }
        return await AdvertisementModel.findByIdAndUpdate(id, payload, { new: true });
    } catch (error) {
        throw new Error(`Failed to update advertisement: ${error.message}`);
    }
};
module.exports = {
    getAll, getById, post, deleteOne, updateOne, getTotalCount
}