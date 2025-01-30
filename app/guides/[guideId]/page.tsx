"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Head from "next/head";
import {
  ArrowLeft,
  Clock,
  AlertTriangle,
  ListChecks,
  Lightbulb,
  XCircle,
  ChevronRight,
  Camera,
  Info,
  Pen,
  Menu,
  Youtube,
} from "lucide-react";

type Guide = {
  id: string;
  title: string;
  difficulty: string;
  time_required: string;
  category: string;
  main_image: string;
  introduction: string;
  safety_warnings: string[];
  required_materials: string[];
  steps: { title: string; description: string; image: string }[];
  tips: string[];
  commonMistakes: string[];
  yt_url: string;
};

export default function GuideDetailPage() {
  const { guideId } = useParams();
  const router = useRouter();
  const [guideData, setGuideData] = useState<Guide | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchGuideData = async () => {
      try {
        if (!guideId) return;
        setIsLoading(true);

        const { data, error } = await supabase
          .from("guides")
          .select("*")
          .eq("id", guideId)
          .single();

        if (error) throw error;
        setGuideData(data);
      } catch (err) {
        setError("Failed to load guide data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuideData();
  }, [guideId]);

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11
      ? `https://www.youtube.com/embed/${match[7]}`
      : null;
  };

  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-orange-100 text-orange-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-lime-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !guideData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl p-8 max-w-md shadow-lg">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-center text-gray-800 font-medium">
            {error || "Guide not found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${guideData.title} Guide - Step by Step Tutorial`}</title>
        <meta name="description" content={guideData.introduction} />
        <meta
          name="keywords"
          content={`${guideData.category}, ${guideData.difficulty} guide, how to, tutorial, ${guideData.title}`}
        />
        <meta
          property="og:title"
          content={`${guideData.title} - Step by Step Guide`}
        />
        <meta property="og:description" content={guideData.introduction} />
        <meta property="og:image" content={guideData.main_image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={guideData.title} />
        <meta name="twitter:description" content={guideData.introduction} />
        <meta name="twitter:image" content={guideData.main_image} />
        <link rel="canonical" href={`/guides/${guideId}`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Mobile Navigation */}
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
          <div className="container mx-auto px-4">
            <div className="h-16 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push("/guides")}
                  className="md:hidden text-gray-700 hover:text-lime-600"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => router.push("/guides")}
                  className="hidden md:flex items-center gap-2 text-gray-700 hover:text-lime-600 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Back to Guides</span>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 text-xs md:text-sm rounded-full font-medium ${getDifficultyStyles(
                    guideData.difficulty
                  )}`}
                >
                  {guideData.difficulty}
                </span>
                <div className="hidden sm:flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{guideData.time_required}</span>
                </div>
                <button
                  className="md:hidden text-gray-700"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 p-4">
              <div className="flex flex-col gap-2">
                {[
                  { id: "overview", icon: Info, label: "Overview" },
                  { id: "materials", icon: Pen, label: "Materials" },
                  { id: "steps", icon: ListChecks, label: "Steps" },
                  { id: "tips", icon: Lightbulb, label: "Tips" },
                  { id: "tutorial", icon: Youtube, label: "Video Tutorial" },
                ].map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveTab(id);
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      activeTab === id
                        ? "bg-lime-50 text-lime-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Navigation Tabs */}
        <div className="sticky top-16 bg-white border-b border-gray-200 z-40 hidden md:block">
          <div className="container mx-auto px-4">
            <div className="flex space-x-8 overflow-x-auto">
              {[
                { id: "overview", icon: Info, label: "Overview" },
                { id: "materials", icon: Pen, label: "Materials" },
                { id: "steps", icon: ListChecks, label: "Steps" },
                { id: "tips", icon: Lightbulb, label: "Tips" },
                { id: "tutorial", icon: Youtube, label: "Video Tutorial" },
              ].map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === id
                      ? "border-lime-500 text-lime-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-16">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={guideData.main_image}
                        alt={guideData.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        {guideData.title}
                      </h1>
                      <p className="text-gray-700 leading-relaxed">
                        {guideData.introduction}
                      </p>
                    </div>
                  </div>

                  {guideData.safety_warnings &&
                    guideData.safety_warnings.length > 0 && (
                      <div className="bg-red-50 rounded-xl p-6 shadow-lg border-l-4 border-red-500">
                        <div className="flex items-center gap-3 mb-4">
                          <AlertTriangle className="w-6 h-6 text-red-500" />
                          <h3 className="text-lg font-bold text-red-900">
                            Safety Warnings
                          </h3>
                        </div>
                        <ul className="space-y-3">
                          {guideData.safety_warnings.map((warning, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3 text-red-700"
                            >
                              <ChevronRight className="w-5 h-5 mt-0.5 flex-shrink-0" />
                              <span>{warning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              )}

              {activeTab === "materials" && guideData.required_materials && (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Pen className="w-6 h-6 text-lime-600" />
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      Required Materials
                    </h2>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {guideData.required_materials.map((material, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 bg-gray-50 rounded-lg p-4 border border-gray-100"
                      >
                        <ChevronRight className="w-5 h-5 text-lime-500" />
                        <span className="text-gray-700">{material}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "steps" && guideData.steps && (
                <div className="space-y-6">
                  {guideData.steps.map((step, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg">
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-lime-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="space-y-3 flex-grow">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900">
                              {step.title}
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                              {step.description}
                            </p>
                            {step.image && (
                              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                                <img
                                  src={step.image}
                                  alt={step.title}
                                  className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                                  onClick={() => setSelectedImage(step.image)}
                                />
                                <button
                                  className="absolute bottom-2 right-2 bg-black/50 p-2 rounded-lg text-white hover:bg-black/70 transition-colors"
                                  onClick={() => setSelectedImage(step.image)}
                                >
                                  <Camera className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "tips" && (
                <div className="space-y-6">
                  {guideData.tips && guideData.tips.length > 0 && (
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="flex items-center gap-3 mb-6">
                        <Lightbulb className="w-6 h-6 text-lime-600" />
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                          Tips
                        </h2>
                      </div>
                      <ul className="space-y-4">
                        {guideData.tips.map((tip, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-gray-700"
                          >
                            <ChevronRight className="w-5 h-5 mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "tutorial" && guideData.yt_url && (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Youtube className="w-6 h-6 text-lime-600" />
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      Video Tutorial
                    </h2>
                  </div>
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={getYouTubeEmbedUrl(guideData.yt_url) || undefined}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Image Viewer Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-4 max-w-lg mx-auto">
              <img
                src={selectedImage}
                alt="Selected step image"
                className="w-full h-full rounded-md object-cover"
              />
              <button
                className="absolute top-2 right-2 text-white text-2xl"
                onClick={() => setSelectedImage(null)}
              >
                <XCircle />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
