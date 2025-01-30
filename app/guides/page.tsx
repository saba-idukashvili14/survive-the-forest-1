"use client";
import React, { useState } from "react";
import {
  Search,
  Trees,
  Flame,
  Axe,
  Home as HomeIcon,
  Compass,
  Droplet,
  Apple,
  Tent,
  ArrowRight,
  TimerIcon,
  BookOpen,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Head from "next/head";

const GuidesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const guides = [
    {
      id: 1,
      title: "Building a Shelter",
      category: "Shelter",
      difficulty: "Medium",
      icon: <Tent className="w-6 h-6" />,
      description:
        "Learn how to build a safe and sturdy shelter using natural materials",
      timeRequired: "2-3 hours",
      img: "https://assets.cat5.com/images/tactical-experts/how-to-find-or-build-basic-shelter/how-to-find-or-build-basic-shelter.jpg",
    },
    {
      id: 2,
      title: "Finding Clean Water",
      category: "Water",
      difficulty: "Critical",
      icon: <Droplet className="w-6 h-6" />,
      description:
        "Techniques for locating and purifying water in the wilderness",
      timeRequired: "30-60 mins",
      img: "https://cdn.mos.cms.futurecdn.net/X22jzGtZS5CtYRELM2EWdC.jpg",
    },
    {
      id: 3,
      title: "Making a Basic Axe",
      category: "Tools",
      difficulty: "Hard",
      icon: <Axe className="w-6 h-6" />,
      description: "Create a primitive axe using stone and wooden materials",
      timeRequired: "4-5 hours",
      img: "https://i.redd.it/gcvedjth2bq41.jpg",
    },
    {
      id: 4,
      title: "Starting a Fire",
      category: "Fire",
      difficulty: "Medium",
      icon: <Flame className="w-6 h-6" />,
      description:
        "Multiple methods to start and maintain a fire without matches",
      timeRequired: "1-2 hours",
      img: "https://www.wildernesscollege.com/images/how-to-make-a-fire-starting.jpg",
    },
    {
      id: 5,
      title: "Forest Navigation",
      category: "Navigation",
      difficulty: "Hard",
      icon: <Compass className="w-6 h-6" />,
      description: "Navigate using stars, sun, and natural indicators",
      timeRequired: "Practice daily",
      img: "https://natureofthenorth.co/wp-content/uploads/2023/09/What-is-Natural-Navigation_-105276568.jpg",
    },
    {
      id: 6,
      title: "Edible Plants Guide",
      category: "Food",
      difficulty: "Critical",
      icon: <Apple className="w-6 h-6" />,
      description: "Identify common edible plants and avoid poisonous ones",
      timeRequired: "Ongoing",
      img: "https://www.cnps.org/wp-content/uploads/2018/10/20170907-Flora-Vaccinium-ovatum-Zoya-Akulova-Barlow-3x2.jpg",
    },
  ];

  const filteredGuides = guides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-orange-100 text-orange-800";
      case "Critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Head>
        <title>Wilderness Survival Guides | Expert Tips & Techniques</title>
        <meta
          name="description"
          content="Comprehensive wilderness survival guides covering shelter building, water finding, fire starting, and more. Learn essential outdoor survival skills from experts."
        />
        <meta
          name="keywords"
          content="wilderness survival, survival skills, outdoor guides, survival techniques, emergency preparedness"
        />
        <meta property="og:title" content="Wilderness Survival Guides" />
        <meta
          property="og:description"
          content="Learn essential wilderness survival skills with our comprehensive guides."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/guides" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b border-gray-100 fixed w-full z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trees className="w-6 h-6 text-green-700" />
                <span className="text-xl font-bold text-green-950">
                  Survival Guides
                </span>
              </div>
              <button
                onClick={() => (window.location.href = "/products")}
                className="hidden md:flex bg-green-950 text-white px-4 py-2 rounded-md hover:bg-green-800 transition-colors items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Products
              </button>
            </div>
          </div>
        </nav>

        <main className="pt-24 pb-20 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Search Section */}
            <div className="mb-6">
              <div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for survival guides..."
                    className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Guides Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <div
                  key={guide.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden group"
                >
                  {/* Guide Image/Placeholder */}
                  <div className="aspect-video bg-green-100 relative overflow-hidden">
                    <img
                      src={guide.img}
                      alt={guide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-2 mb-1">
                        {guide.icon}
                        <span className="font-medium">{guide.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Guide Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-green-950">
                        {guide.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-md text-sm font-medium ${getDifficultyColor(
                          guide.difficulty
                        )}`}
                      >
                        {guide.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{guide.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <TimerIcon size={20}/> {guide.timeRequired}
                      </span>
                      <button
                        onClick={() => router.push(`/guides/${guide.id}`)}
                        className="flex items-center gap-2 text-green-700 hover:text-green-800 font-medium"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredGuides.length === 0 && (
              <div className="text-center py-12">
                <HomeIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No guides found
                </h3>
                <p className="text-gray-600">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default GuidesPage;
