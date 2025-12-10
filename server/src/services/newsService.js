const NewsModel = require("../models/newsModel");

const getAll = async () => {
    try {
        return await NewsModel.find().sort({ createdAt: -1 });
    } catch (error) {
        throw new Error(`Failed to fetch news: ${error.message}`);
    }
};

const getById = async (id) => {
    try {
        const news = await NewsModel.findById(id);
        if (!news) {
            throw new Error('News not found');
        }
        return news;
    } catch (error) {
        throw new Error(`Failed to fetch news by ID: ${error.message}`);
    }
};

const getTotalCount = async () => {
    try {
        return await NewsModel.countDocuments();
    } catch (error) {
        throw new Error(`Failed to count news: ${error.message}`);
    }
};

const post = async (payload) => {
    try {
        return await NewsModel.create(payload);
    } catch (error) {
        throw new Error(`Failed to create news: ${error.message}`);
    }
};

const deleteOne = async (id) => {
    try {
        const news = await NewsModel.findById(id);
        if (!news) {
            throw new Error('News not found');
        }
        return await NewsModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Failed to delete news: ${error.message}`);
    }
};

const updateOne = async (id, payload) => {
    try {
        const existing = await NewsModel.findById(id);
        if (!existing) {
            throw new Error('News not found');
        }
        return await NewsModel.findByIdAndUpdate(id, payload, { new: true });
    } catch (error) {
        throw new Error(`Failed to update news: ${error.message}`);
    }
};
module.exports = {
    getAll, getById, post, deleteOne, updateOne, getTotalCount
}