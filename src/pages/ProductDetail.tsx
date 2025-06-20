import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductGrid from '../components/Product/ProductGrid';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, getProductsByCollection } = useProducts();
  const product = id ? getProductById(id) : undefined;

  // Ensure page scrolls to top when product changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link
            to="/products"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getProductsByCollection(product.collection)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in ${product.name} (₹${product.price}). Can you please provide more details?`;
    const whatsappUrl = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-green-600">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-green-600">Products</Link>
            <span className="text-gray-400">/</span>
            <Link to={`/products?collection=${encodeURIComponent(product.collection)}`} className="text-gray-500 hover:text-green-600">
              {product.collection}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
                {product.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className="bg-green-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                    {product.collection}
                  </span>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl font-bold text-green-600">₹{product.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600 text-sm">(4.8/5)</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium mb-3">
                    Ready to order? Contact us directly:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="tel:+91-XXXXX-XXXXX"
                      className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Phone className="h-5 w-5" />
                      <span>Call: +91-XXXXX-XXXXX</span>
                    </a>
                    <button
                      onClick={handleWhatsApp}
                      className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>WhatsApp Us</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Truck className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Fast Delivery</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Quality Assured</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <RotateCcw className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;