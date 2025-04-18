'use client';

import { useState, useEffect } from 'react';
import { FaSave, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';

export default function ProductForm({ product, onSubmit, onCancel, categories }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    category: '',
    images: [],
    thumbnail: '',
    specs: {
      wattage: '',
      lumens: '',
      colorTemperature: '',
      dimensions: '',
      connectivity: '',
      voltage: '',
      lifespan: '',
    },
    toggleOptions: [],
    price: 0,
    featured: false,
    new: false,
    inStock: true,
  });
  
  const [newSpec, setNewSpec] = useState({ key: '', value: '' });
  const [newToggleOption, setNewToggleOption] = useState({ 
    name: '', 
    description: '', 
    defaultValue: false 
  });
  
  // Initialize form with product data if editing
  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        // Ensure all required fields exist
        specs: { 
          wattage: '', 
          lumens: '', 
          colorTemperature: '', 
          dimensions: '', 
          connectivity: '', 
          voltage: '', 
          lifespan: '',
          ...product.specs 
        },
        toggleOptions: product.toggleOptions || [],
      });
    }
  }, [product]);
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Handle spec change
  const handleSpecChange = (e, key) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      specs: {
        ...prev.specs,
        [key]: value
      }
    }));
  };
  
  // Handle new spec input change
  const handleNewSpecChange = (e, field) => {
    const { value } = e.target;
    setNewSpec(prev => ({ ...prev, [field]: value }));
  };
  
  // Add new spec
  const handleAddSpec = () => {
    if (newSpec.key.trim() && newSpec.value.trim()) {
      setFormData(prev => ({
        ...prev,
        specs: {
          ...prev.specs,
          [newSpec.key.trim()]: newSpec.value.trim()
        }
      }));
      setNewSpec({ key: '', value: '' });
    }
  };
  
  // Remove spec
  const handleRemoveSpec = (key) => {
    setFormData(prev => {
      const updatedSpecs = { ...prev.specs };
      delete updatedSpecs[key];
      return { ...prev, specs: updatedSpecs };
    });
  };
  
  // Handle toggle option change
  const handleToggleOptionChange = (index, field, value) => {
    setFormData(prev => {
      const updatedOptions = [...prev.toggleOptions];
      updatedOptions[index] = {
        ...updatedOptions[index],
        [field]: field === 'defaultValue' ? value === 'true' : value
      };
      return { ...prev, toggleOptions: updatedOptions };
    });
  };
  
  // Handle new toggle option input change
  const handleNewToggleOptionChange = (field, value) => {
    setNewToggleOption(prev => ({
      ...prev,
      [field]: field === 'defaultValue' ? value === 'true' : value
    }));
  };
  
  // Add new toggle option
  const handleAddToggleOption = () => {
    if (newToggleOption.name.trim() && newToggleOption.description.trim()) {
      setFormData(prev => ({
        ...prev,
        toggleOptions: [
          ...prev.toggleOptions,
          { ...newToggleOption, name: newToggleOption.name.trim(), description: newToggleOption.description.trim() }
        ]
      }));
      setNewToggleOption({ name: '', description: '', defaultValue: false });
    }
  };
  
  // Remove toggle option
  const handleRemoveToggleOption = (index) => {
    setFormData(prev => {
      const updatedOptions = [...prev.toggleOptions];
      updatedOptions.splice(index, 1);
      return { ...prev, toggleOptions: updatedOptions };
    });
  };
  
  // Handle image URL change
  const handleImageChange = (index, value) => {
    setFormData(prev => {
      const updatedImages = [...prev.images];
      updatedImages[index] = value;
      return { ...prev, images: updatedImages };
    });
  };
  
  // Add new image URL
  const handleAddImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };
  
  // Remove image URL
  const handleRemoveImage = (index) => {
    setFormData(prev => {
      const updatedImages = [...prev.images];
      updatedImages.splice(index, 1);
      return { ...prev, images: updatedImages };
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <div className="bg-[#1e1e1e] rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#54BB74]">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
          >
            <FaTimes /> Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-[#54BB74] text-white px-4 py-2 rounded-md hover:bg-[#48a064] transition-colors"
          >
            <FaSave /> Save Product
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="p-4 bg-[#292929] rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#1e1e1e] text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-[#54BB74]"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full bg-[#1e1e1e] text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-[#54BB74]"
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Price ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full bg-[#1e1e1e] text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-[#54BB74]"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Thumbnail URL *</label>
              <input
                type="text"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                required
                className="w-full bg-[#1e1e1e] text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-[#54BB74]"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm text-gray-400 mb-1">Short Description *</label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              required
              maxLength={150}
              className="w-full bg-[#1e1e1e] text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-[#54BB74]"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.shortDescription.length}/150 characters
            </p>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm text-gray-400 mb-1">Full Description *</label>
            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              required
              rows={4}
              className="w-full bg-[#1e1e1e] text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-[#54BB74]"
            />
          </div>
          
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 text-[#54BB74] bg-[#1e1e1e] border-gray-700 rounded focus:ring-[#54BB74]"
              />
              <label htmlFor="featured" className="ml-2 text-white">
                Featured Product
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="new"
                name="new"
                checked={formData.new}
                onChange={handleChange}
                className="w-4 h-4 text-[#54BB74] bg-[#1e1e1e] border-gray-700 rounded focus:ring-[#54BB74]"
              />
              <label htmlFor="new" className="ml-2 text-white">
                New Product
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="inStock"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
                className="w-4 h-4 text-[#54BB74] bg-[#1e1e1e] border-gray-700 rounded focus:ring-[#54BB74]"
              />
              <label htmlFor="inStock" className="ml-2 text-white">
                In Stock
              </label>
            </div>
          </div>
        </div>
        
        {/* Product Images */}
        <div className="p-4 bg-[#292929] rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Product Images</h3>
          
          <div className="space-y-4">
            {formData.images.map((image, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="Image URL"
                  className="flex-1 bg-[#1e1e1e] text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-[#54BB74]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="bg-red-900/30 text-red-400 p-2 rounded-md hover:bg-red-900/50 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={handleAddImage}
              className="flex items-center gap-2 bg-[#1e1e1e] text-[#54BB74] px-4 py-2 rounded-md hover:bg-[#292929] transition-colors"
            >
              <FaPlus /> Add Image URL
            </button>
          </div>
        </div>
        
        {/* Technical Specifications */}
        <div className="p-4 bg-[#292929] rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Technical Specifications</h3>
          
          <div className="space-y-4">
            {Object.entries(formData.specs).map(([key, value]) => (
              <div key={key} className="flex gap-2">
                <input
                  type="text"
                  value={key}
                  disabled
                  className="w-1/3 bg-[#1e1e1e] text-gray-400 border border-gray-700 rounded-md py-2 px-3"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleSpecChange(e, key)}
                  placeholder="Value"
                  className="flex-1 bg-[#1e1e1e] text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-[#54BB74]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSpec(key)}
                  className="bg-red-900/30 text-red-400 p-2 rounded-md hover:bg-red-900/50 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newSpec.key}
                onChange={(e) => handleNewSpecChange(e, 'key')}
                placeholder="Specification Name"
                className="w-1/3 bg-[#1e1e1e] text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-[#54BB74]"
              />
              <input
                type="text"
                value={newSpec.value}
                onChange={(e) => handleNewSpecChange(e, 'value')}
                placeholder="Specification Value"
                className="flex-1 bg-[#1e1e1e] text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-[#54BB74]"
              />
              <button
                type="button"
                onClick={handleAddSpec}
                className="bg-[#54BB74] text-white p-2 rounded-md hover:bg-[#48a064] transition-colors"
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
        
        {/* Toggle Options */}
        <div className="p-4 bg-[#292929] rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Toggle Options</h3>
          
          <div className="space-y-4">
            {formData.toggleOptions.map((option, index) => (
              <div key={index} className="p-4 bg-[#1e1e1e] rounded-lg">
                <div className="flex justify-between">
                  <h4 className="font-medium text-white mb-2">Option {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveToggleOption(index)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Option Name</label>
                    <input
                      type="text"
                      value={option.name}
                      onChange={(e) => handleToggleOptionChange(index, 'name', e.target.value)}
                      className="w-full bg-[#292929] text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-[#54BB74]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Default Value</label>
                    <select
                      value={option.defaultValue.toString()}
                      onChange={(e) => handleToggleOptionChange(index, 'defaultValue', e.target.value)}
                      className="w-full bg-[#292929] text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-[#54BB74]"
                    >
                      <option value="false">Off</option>
                      <option value="true">On</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm text-gray-400 mb-1">Description</label>
                  <input
                    type="text"
                    value={option.description}
                    onChange={(e) => handleToggleOptionChange(index, 'description', e.target.value)}
                    className="w-full bg-[#292929] text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-[#54BB74]"
                  />
                </div>
              </div>
            ))}
            
            <div className="p-4 bg-[#1e1e1e] rounded-lg">
              <h4 className="font-medium text-white mb-2">Add New Option</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Option Name</label>
                  <input
                    type="text"
                    value={newToggleOption.name}
                    onChange={(e) => handleNewToggleOptionChange('name', e.target.value)}
                    placeholder="e.g., Include Pendants"
                    className="w-full bg-[#292929] text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-[#54BB74]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Default Value</label>
                  <select
                    value={newToggleOption.defaultValue.toString()}
                    onChange={(e) => handleNewToggleOptionChange('defaultValue', e.target.value)}
                    className="w-full bg-[#292929] text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-[#54BB74]"
                  >
                    <option value="false">Off</option>
                    <option value="true">On</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <input
                  type="text"
                  value={newToggleOption.description}
                  onChange={(e) => handleNewToggleOptionChange('description', e.target.value)}
                  placeholder="e.g., Add matching pendant fixtures to your system"
                  className="w-full bg-[#292929] text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-[#54BB74]"
                />
              </div>
              
              <button
                type="button"
                onClick={handleAddToggleOption}
                className="mt-4 flex items-center gap-2 bg-[#54BB74] text-white px-4 py-2 rounded-md hover:bg-[#48a064] transition-colors"
              >
                <FaPlus /> Add Option
              </button>
            </div>
          </div>
        </div>
        
        {/* Form submission buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#54BB74] text-white px-6 py-3 rounded-md hover:bg-[#48a064] transition-colors"
          >
            {product ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
