"use client";
import React, { useState } from "react";
import {
  Trees,
  ChevronLeft,
  Search,
  Package,
  Star,
  ShoppingCart,
  ArrowUpRight,
  Book,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Head from "next/head";

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const router = useRouter();

  const products = [
    {
      id: 1,
      title: "4 Pack Water Filter Straw",
      category: "Water",
      price: 22.99,
      rating: 4.7,
      reviews: 2673,
      description:
        " Water Purifying Device - Portable Personal Water Filtration Survival - for Emergency Kits Outdoor Activities and Hiking - Water Filter Camping Travel Survival Backpacking",
      features: [
        "0.5 Liters Per Minute",
        "Removes 99.999999% of bacteria",
        "No batteries needed",
      ],
      img: "https://m.media-amazon.com/images/I/817wxAi0d7L._AC_SL1500_.jpg",
      affiliateLink: "https://amzn.to/4jkHkYx",
    },
    {
      id: 2,
      title: "Emergency Radio",
      category: "Communication",
      price: 35.9,
      rating: 4.6,
      reviews: 14915,
      description:
        "Emergency Crank Weather Radio, 4000mAh Solar Hand Crank Portable AM/FM/NOAA, with 1W 3 Mode Flashlight & Motion Sensor Reading Lamp, Cell Phone Charger, SOS for Home and Emergency",
      features: [
        "Solar & hand crank powered",
        "NOAA weather alerts",
        "Phone charging",
      ],
      img: "https://m.media-amazon.com/images/I/81J5wwlFr-L._AC_SL1500_.jpg",
      affiliateLink: "https://amzn.to/3Ec7z3e",
      bestSeller: true,
    },
    {
      id: 3,
      title: "Survival First Aid Kit",
      category: "Medical",
      price: 48.99,
      rating: 4.5,
      reviews: 115,
      description:
        "Premium 163-piece first aid kit including trauma shears, emergency blanket, and comprehensive guide. Perfect for outdoor activities and emergency situations.",
      features: [
        "163 essential items",
        "Waterproof case",
        "Emergency guide included",
      ],
      img: "https://m.media-amazon.com/images/I/813uPuhWjdL._AC_SL1500_.jpg",
      affiliateLink: "https://amzn.to/4aojhUB",
      bestSeller: false,
    },
    {
      id: 4,
      title: "KSEIBI Wood Axe",
      category: "Axe",
      price: 16.98,
      rating: 4.5,
      reviews: 2788,
      description:
        "The KSEIBI durable, heavy-duty 600g head is made of high-quality, wear-resistant steel with anticorrosive coating. This helps to deliver superior, long-lasting performance.",
      features: [
        "Forged Steel Blade ",
        "Multi-use maul tools",
        "Sharpen and maintenance",
      ],
      img: "https://m.media-amazon.com/images/I/61eNiKiiFFL._AC_SL1500_.jpg",
      affiliateLink: "https://amzn.to/40SaU0q",
      bestSeller: true,
    },
  ];

  const categories = [...new Set(products.map((product) => product.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;

    const matchesPriceRange = () => {
      switch (priceRange) {
        case "under25":
          return product.price < 25;
        case "25to50":
          return product.price >= 25 && product.price <= 50;
        case "over50":
          return product.price > 50;
        default:
          return true;
      }
    };

    return matchesSearch && matchesCategory && matchesPriceRange();
  });

  return (
    <>
      <Head>
        <title>Essential Survival Products | Top-Rated Gear</title>
        <meta
          name="description"
          content="Shop essential survival gear and equipment. Curated selection of top-rated products for outdoor adventures and emergency preparedness."
        />
        <meta property="og:title" content="Essential Survival Products" />
        <meta
          property="og:description"
          content="Discover top-rated survival gear for your outdoor adventures."
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b border-gray-100 fixed w-full z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trees className="w-6 h-6 text-green-700" />
                <span className="text-xl font-bold text-green-950">
                  Essential Gear
                </span>
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-24 pb-20 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Essential Survival Gear
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Curated selection of top-rated survival equipment and gear.
                Every product has been carefully selected for quality and
                reliability.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="p-2 border border-gray-200 text-gray-800 rounded-md"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="p-2 border border-gray-200 text-gray-800 rounded-md"
                >
                  <option value="all">All Prices</option>
                  <option value="under25">Under $25</option>
                  <option value="25to50">$25 - $50</option>
                  <option value="over50">Over $50</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group"
                >
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-50 relative overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {product.bestSeller && (
                      <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                        Best Seller
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {product.title}
                        </h3>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm font-medium">
                          {product.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-medium text-gray-700">
                          {product.rating}
                        </span>
                        <span className="text-gray-500">
                          ({product.reviews.toLocaleString()} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Key Features */}
                    <ul className="space-y-2 mb-4">
                      {product.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <Package className="w-4 h-4 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between mt-6">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <a
                        href={product.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        View on Amazon
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or filters
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductsPage;
