import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              {product.collection}
            </span>
          </div>
          {product.featured && (
            <div className="absolute top-2 left-2">
              <span className="bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                Featured
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-blue-600">
              ₹{product.price.toFixed(2)}
            </span>
            <span className="text-blue-600 text-sm font-medium hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;