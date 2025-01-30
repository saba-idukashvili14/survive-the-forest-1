"use client";
import React, { useState } from "react";
import {
  Compass,
  Home,
  Droplet,
  Map,
  BookOpen,
  Coffee,
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  Trees,
  Tent,
  Navigation,
  ShieldAlert,
  Leaf,
  Mountain,
} from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Trees className="w-6 h-6 text-green-700" />
            <span className="text-xl font-bold text-green-950">
              Forest Survival
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => router.push("/products")}
              className="text-green-950 hover:text-green-700 transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Products
            </button>
            <button
              onClick={() => router.push("/guides")}
              className="text-green-950 hover:text-green-700 transition-colors flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Guides
            </button>
            <button
              onClick={() => router.push("/guides")}
              className="bg-green-950 text-white px-4 py-2 rounded-md hover:bg-green-800 transition-colors flex items-center gap-2"
            >
              Get Started
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => router.push("/guides")}
            className="md:hidden bg-green-950 text-white px-4 py-2 rounded-md hover:bg-green-800 transition-colors flex items-center gap-2"
          >
            Products
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <main>
        <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-20 right-10 text-green-100">
            <Mountain className="w-64 h-64" />
          </div>
          <div className="absolute bottom-10 left-10 text-green-100">
            <Trees className="w-48 h-48" />
          </div>
          <div className="absolute top-40 left-1/4 text-green-100">
            <Leaf className="w-24 h-24" />
          </div>

          <div className="container mx-auto max-w-6xl relative">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-md mb-6">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Essential Survival Skills
                </span>
              </div>

              <h1 className="text-6xl font-bold text-green-950 mb-6 leading-tight">
                Master the Art of
                <span className="text-green-700"> Forest Survival</span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Comprehensive guides and expert knowledge to help you thrive in
                the wilderness. Learn essential skills from experienced
                survivalists.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => router.push("/guides")}
                  className="bg-green-950 text-white px-6 py-3 rounded-md hover:bg-green-800 transition-all hover:shadow-lg flex items-center gap-2"
                >
                  Start Exploring
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => router.push("/products")}
                  className="border-2 border-green-950 text-green-950 px-6 py-3 rounded-md hover:bg-green-50 transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  View Products
                </button>
              </div>

              {/* Added Quick Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16">
                <div className="border-l-4 border-green-700 pl-4">
                  <div className="text-3xl font-bold text-green-950">50+</div>
                  <div className="text-gray-600">Survival Guides</div>
                </div>
                <div className="border-l-4 border-green-700 pl-4">
                  <div className="text-3xl font-bold text-green-950">100+</div>
                  <div className="text-gray-600">Expert Tips</div>
                </div>
                <div className="border-l-4 border-green-700 pl-4">
                  <div className="text-3xl font-bold text-green-950">24/7</div>
                  <div className="text-gray-600">Resource Access</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center text-green-950 mb-16 flex items-center justify-center gap-3">
              <ShieldAlert className="w-8 h-8 text-green-700" />
              Essential Survival Skills
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Navigation className="w-6 h-6 text-green-700" />,
                  title: "Navigation",
                  description:
                    "Learn to navigate using natural indicators and basic tools",
                },
                {
                  icon: <Tent className="w-6 h-6 text-green-700" />,
                  title: "Shelter Building",
                  description:
                    "Master techniques for creating safe and warm shelters",
                },
                {
                  icon: <Droplet className="w-6 h-6 text-green-700" />,
                  title: "Food & Water",
                  description:
                    "Identify safe food sources and water purification methods",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group hover:scale-105 transition-all duration-300"
                >
                  <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow h-full border border-gray-100">
                    <div className="mb-6">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-3 text-green-950">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-green-950 text-white">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Map className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Survival Resources</h2>
            </div>
            <p className="text-green-100 mb-12 max-w-2xl mx-auto">
              Access our curated collection of survival guides, books, and
              expert recommendations.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.push("/products")}
                className="bg-white text-green-950 px-6 py-3 rounded-md hover:bg-green-100 transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Browse Products
              </button>
              <button
                onClick={() => router.push("/guides")}
                className="border border-white px-6 py-3 rounded-md hover:bg-green-900 transition-colors flex items-center gap-2"
              >
                <Map className="w-4 h-4" />
                View Guides
              </button>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-center gap-2 mb-12">
              <Coffee className="w-8 h-8 text-green-700" />
              <h2 className="text-3xl font-bold text-green-950">
                Essential Tips
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: <Compass className="w-5 h-5 text-green-700" />,
                  tip: "Always carry a basic survival kit",
                },
                {
                  icon: <AlertTriangle className="w-5 h-5 text-green-700" />,
                  tip: "Learn to identify local poisonous plants",
                },
                {
                  icon: <Map className="w-5 h-5 text-green-700" />,
                  tip: "Share your travel plans with someone",
                },
                {
                  icon: <ShieldAlert className="w-5 h-5 text-green-700" />,
                  tip: "Master basic first aid skills",
                },
              ].map((tip, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-6 bg-green-50 rounded-lg hover:shadow-md transition-shadow"
                >
                  {tip.icon}
                  <p className="text-gray-700">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 py-12 px-4">
        <div className="container mx-auto max-w-6xl text-center text-gray-600">
          <p className="flex items-center justify-center gap-2">
            <Trees className="w-4 h-4" />© 2025 Survive The Forest. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Page;
