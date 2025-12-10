const CategoryModel = require("../models/categoryModel");

class CategoryService {
  // Create a new category
  async createCategory(categoryData) {
    try {
      const category = new CategoryModel(categoryData);
      await category.save();
      return category;
    } catch (error) {
      throw error;
    }
  }

  // Get all categories
  async getAllCategories() {
    try {
      const categories = await CategoryModel.find().sort({ timeSpent: -1 });
      return categories.map((cat) => ({
        id: cat._id,
        name: cat.name,
        timeSpent: cat.timeSpent,
        color: cat.color,
      }));
    } catch (error) {
      throw error;
    }
  }

  // Get category by ID
  async getCategoryById(id) {
    try {
      const category = await CategoryModel.findById(id);
      return category;
    } catch (error) {
      throw error;
    }
  }

  // Update category
  async updateCategory(id, updateData) {
    try {
      const category = await CategoryModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      return category;
    } catch (error) {
      throw error;
    }
  }

  // Delete category
  async deleteCategory(id) {
    try {
      const category = await CategoryModel.findByIdAndDelete(id);
      return category;
    } catch (error) {
      throw error;
    }
  }

  // Add time to category
  async addTimeToCategory(id, hours) {
    try {
      const category = await CategoryModel.findById(id);
      if (!category) throw new Error("Category not found");

      category.timeSpent += hours;
      await category.save();
      return category;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CategoryService();


