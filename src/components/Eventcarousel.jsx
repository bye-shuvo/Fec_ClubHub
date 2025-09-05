import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import image1 from "../assets/photos/fecsa-banner.jpg";
import image2 from "../assets/photos/fecpc-banner.jpg";
import image3 from "../assets/photos/roverscout-banner.jpg";

const Eventcarousel = ({ clubs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  function getUtilityObject(id , isLearmMoreClicked) {
    const club = clubs.find((club) => club.clubId === id);
    const colors = getCategoryColors(club.category);
     return { club: club, colors: colors , isEventQuery : isLearmMoreClicked} 
  }

  // Function to get category-specific colors
  const getCategoryColors = (category) => {
    switch (category) {
      case "technology":
        return {
          accent: "bg-success",
          text: "text-success",
          border: "border-success/20",
          hover: "hover:bg-success/10",
          fill: "hover:fill-success",
        };
      case "innovation":
        return {
          accent: "bg-innovation",
          text: "text-innovation",
          border: "border-innovation/20",
          hover: "hover:bg-innovation/10",
          fill: "hover:fill-innovation",
        };
      case "creative":
        return {
          accent: "bg-cultural",
          text: "text-cultural",
          border: "border-cultural/20",
          hover: "hover:bg-cultural/10",
          fill: "hover:fill-cultural",
        };
      case "cultural":
        return {
          accent: "bg-cultural",
          text: "text-cultural",
          border: "border-cultural/20",
          hover: "hover:bg-cultural/10",
          fill: "hover:fill-cultural",
        };
      case "academic":
        return {
          accent: "bg-slide-accent",
          text: "text-slide-accent",
          border: "border-slide-accent/20",
          hover: "hover:bg-slide-accent/10",
          fill: "hover:fill-slide-accent",
        };
      case "professional":
        return {
          accent: "bg-primary",
          text: "text-primary",
          border: "border-primary/20",
          hover: "hover:bg-primary/10",
          fill: "hover:fill-primary",
        };
      case "religious":
        return {
          accent: "bg-technology",
          text: "text-technology",
          border: "border-technology/20",
          hover: "hover:bg-technology/10",
          fill: "hover:fill-technology",
        };
      case "community":
        return {
          accent: "bg-error-secondary",
          text: "text-error-secondary",
          border: "border-error-secondary",
          hover: "hover:bg-error-secondary/10",
          fill: "hover:fill-error-secondary",
        };
      case "sports":
        return {
          accent: "bg-warning",
          text: "text-warning",
          border: "border-warning/20",
          hover: "hover:bg-warning/10",
          fill: "hover:fill-warning",
        };
      default:
        return {
          accent: "bg-primary",
          text: "text-primary",
          border: "border-primary/20",
          hover: "hover:bg-primary/10",
          fill: "hover:fill-primary",
        };
    }
  };

  const slides = [
    {
      slideName: "FECSA",
      clubName: "Faridpur Engineering College Sports Association",
      clubId: 7,
      category: "sports",
      eventName: "Tournament-2025",
      eventDescription:
        "Join The Sports With The Only Sporting slide Of Faridpur Engineering College.",
      eventPhoto: image1,
      eventLink: "",
      type: "Upcoming",
    },
    {
      slideName: "FECPC",
      clubName: "Faridpur Engineering College Photographic Club",
      category: "creative",
      clubId: 8,
      eventName: "Take a photo - 2025",
      eventDescription:
        "Join The Photographic slide To Capture The Moments Of Life",
      eventPhoto: image2,
      eventLink: "",
      type: "Running",
    },
    {
      slideName: "FECRSG",
      clubName: "Faridpur Engineering College Rover Scout Group",
      category: "community",
      clubId: 6,
      eventName: "Help the country - 2025",
      eventDescription:
        "Join Rover Scout For self-development and community service",
      eventPhoto: image3,
      eventLink: "",
      type: "Expired",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Handle manual navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false); // Pause auto-play when user interacts
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 6000);
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
  };

  if (!slides || slides.length === 0) {
    return (
      <div className="h-[calc(100vh-4rem)] bg-background-secondary dark:bg-charcoal flex items-center justify-center">
        <p className="text-text-secondary text-xl">No slides available</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative bg-background-secondary dark:bg-charcoal overflow-hidden">
        {/* Main Carousel Container */}
        <div className="relative h-[calc(100vh-4rem)] flex items-center">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-charcoal/10 dark:bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-charcoal/20 dark:hover:bg-white/20 transition-all duration-300 group"
          >
            <svg
              className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-charcoal/10 dark:bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-charcoal/20 dark:hover:bg-white/20 transition-all duration-300 group"
          >
            <svg
              className="w-6 h-6 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Text Slides Container */}
          <div className="absolute left-0 top-0 w-[40%] h-full z-20 overflow-hidden">
            <div
              className="flex w-full h-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slide, index) => {
                const colors = getCategoryColors(slide.category);
                return (
                  <div
                    key={index}
                    className="w-full h-full flex-shrink-0 flex items-center px-16 lg:px-24"
                  >
                    <div className="flex-1 z-10 max-w-xl">
                      <div className="mb-8">
                        <span
                          className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${colors.accent} text-white mb-4 animate-fade-in`}
                        >
                          {slide.category}
                        </span>
                        <h1 className="text-6xl lg:text-7xl font-bold text-text dark:text-white mb-6 leading-tight animate-slide-in-left">
                          {slide.eventName}
                        </h1>
                        <h2 className="text-xl lg:text-2xl font-bold text-text dark:text-white mb-6 leading-tight animate-slide-in-left">
                          <p className="text-text-secondary dark:text-text-secondary-dark mb-2 text-xl">
                            organized by -
                          </p>{" "}
                          {slide.clubName}
                        </h2>
                        <p className="text-lg text-text-secondary/80 dark:text-text-secondary-dark mb-10 leading-relaxed animate-slide-in-left-delay">
                          {slide.eventDescription}
                        </p>
                      </div>

                      <div className="flex items-center space-x-6 animate-slide-in-left-delay-2">
                        <Link
                          to={`/clubs/${slide.slideName}`}
                          state={getUtilityObject(slide.clubId , false)}
                          className={`${colors.text} ${colors.hover} px-8 py-4 rounded-lg font-semibold transition-all duration-300 border-2 ${colors.border} hover:scale-105 hover:shadow-lg`}
                        >
                          Join Now
                        </Link>
                        <Link
                          to={`/clubs/${slide.slideName}`}
                          state={getUtilityObject(slide.clubId , true)}
                          className="text-text-secondary-dark hover:text-text dark:hover:text-white transition-colors duration-300 flex items-center space-x-2"
                        >
                          <span>Learn More</span>
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image Slides Container */}
          <div className="absolute right-0 top-0 w-[60%] h-full z-20 overflow-hidden">
            <div
              className="flex w-full h-full transition-transform duration-700 ease-in-out delay-200"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slide, index) => {
                const colors = getCategoryColors(slide.category);
                return (
                  <div
                    key={index}
                    className="w-full h-full flex-shrink-0 flex justify-center items-center relative"
                  >
                    <div className="relative w-64 h-96 lg:w-[55rem] lg:h-[35rem] animate-scale-in">
                      {/* Image Container with Modern Styling */}
                      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl group">
                        <img
                          src={slide.eventPhoto}
                          alt={`${slide.slideName} banner`}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-charcoal/20"></div>
                      </div>

                      {/* Floating club short name */}
                      <div className="absolute -top-4 -right-4 p-2 bg-white/10 backdrop-blur-sm flex items-center justify-center animate-float rounded-md">
                        <div
                          className={` p-2 ${colors.accent} flex items-center justify-center`}
                        >
                          <span className="text-white font-bold text-xl">
                            {slide.slideName}
                          </span>
                        </div>
                      </div>

                      {/* Event current type */}
                      <div className="absolute overflow-hidden -bottom-6 -left-6 w-32 h-32 bg-white/5 backdrop-blur-sm rounded-2xl rotate-12 animate-float-delay">
                        <div
                          className={`h-full w-full ${
                            (slide.type === "Upcoming" && "bg-success") ||
                            (slide.type === "Running" && "bg-info") ||
                            "bg-red-500"
                          } flex items-center justify-center`}
                        >
                          <span className="text-white font-bold text-xl">
                            {slide.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-4 z-50">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 hover:scale-105 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary scale-125"
                    : "bg-charcoal/30 dark:bg-white hover:bg-charcoal/50 dark:hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Auto-play Indicator */}
        <div className="absolute top-8 right-8 z-20">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="w-12 h-12 bg-charcoal/20 dark:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-charcoal/40 dark:hover:bg-white/40 transition-all duration-300"
          >
            {isAutoPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Eventcarousel;
