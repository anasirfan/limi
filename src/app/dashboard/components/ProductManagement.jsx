'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaExternalLinkAlt } from 'react-icons/fa';
import { categories } from '../../data/products';
import { addProduct, updateProduct, deleteProduct, selectAllProducts } from '../../redux/slices/productsSlice';
import ProductForm from './ProductForm';

export default function ProductManagement() {
  const dispatch = useDispatch();
  const productList = useSelector(selectAllProducts);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filtered products
  const filteredProducts = productList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Handle adding a new product
  const handleAddProduct = () => {
    setCurrentProduct(null);
    setShowForm(true);
  };
  
  // Handle editing a product
  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setShowForm(true);
  };
  
  // Handle deleting a product
  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Dispatch delete action to Redux
      dispatch(deleteProduct(productId));
    }
  };
  
  // Handle form submission
  const handleFormSubmit = (formData) => {
    if (currentProduct) {
      // Update existing product in Redux
      dispatch(updateProduct({
        id: currentProduct.id,
        ...formData
      }));
    } else {
      // Add new product to Redux
      dispatch(addProduct(formData));
    }
    
    setShowForm(false);
    setCurrentProduct(null);
  };
  
  // Handle form cancel
  const handleFormCancel = () => {
    setShowForm(false);
    setCurrentProduct(null);
  };
  
  if (loading) {
    return (
      <div className="p-4 bg-[#1e1e1e] rounded-lg">
        <div className="animate-pulse text-center py-8">
          <p className="text-[#54BB74]">Loading product management...</p>
        </div>
      </div>
    );
  }
  
  if (showForm) {
    return (
      <ProductForm 
        product={currentProduct} 
        onSubmit={handleFormSubmit} 
        onCancel={handleFormCancel}
        categories={categories.filter(c => c.id !== 'all')}
      />
    );
  }
  
  return (
    <div className="p-4 bg-[#1e1e1e] rounded-lg">
      <div className="px-2 py-2 bg-[#1e1e1e] mb-6 rounded-t-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold text-white">Product Management</h2>
            {/* <p className="text-[#a0a0a0] text-base">Manage your product catalog and inventory</p> */}
          </div>
          <div className="flex items-center gap-4">
         
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 bg-[#54BB74] text-white px-4 py-2.5 rounded-md hover:bg-[#48a064] transition-colors whitespace-nowrap"
            >
              <FaPlus /> Add New Product
            </button>
          </div>
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#292929] text-white border border-gray-700 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-[#54BB74]"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-[#292929] border border-gray-700 text-white px-4 py-2 rounded-md hover:border-[#54BB74] transition-colors"
          >
            <FaFilter /> Filters
          </button>
        </div>
        
        {showFilters && (
          <div className="p-4 bg-[#292929] rounded-md mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full bg-[#1e1e1e] text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-[#54BB74]"
                >
                  <option value="all">All Categories</option>
                  {categories
                    .filter(category => category.id !== 'all')
                    .map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Products table */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-8 bg-[#292929] rounded-lg">
          <p className="text-gray-400">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#292929] text-[#54BB74]">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-[#292929]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md bg-gray-800 overflow-hidden relative">
                        {product.thumbnail && (
                          <img 
                            src={product.thumbnail} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="text-sm text-gray-400 truncate max-w-xs">{product.shortDescription}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{product.category}</td>
                  <td className="px-4 py-3 text-gray-300">${typeof product.price === 'number' ? product.price.toFixed(2) : Number(product.price).toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3">
                    {product.inStock ? (
                      <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs">
                        In Stock
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-900/30 text-red-400 rounded-full text-xs">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={`/product-catalog/${product.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-[#50C878] hover:text-[#87CEAB] transition-colors"
                        title="View on Frontend"
                      >
                        <FaExternalLinkAlt />
                      </a>
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="p-2 text-[#87CEAB] hover:text-[#a3dbc0] transition-colors"
                        title="Edit product"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                        title="Delete product"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
