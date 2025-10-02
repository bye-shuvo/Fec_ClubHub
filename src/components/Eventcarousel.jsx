import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton.jsx"

const Eventcarousel = ({ clubs, getCategoryColors }) => {
  const [events, setEvents] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  function getUtilityObject(id, isLearmMoreClicked) {
    const club = clubs ? clubs.find((club) => club.clubId === id) : null;
    const colors = getCategoryColors(club?.category);
    return { club: club, colors: colors, isEventQuery: isLearmMoreClicked };
  }

  const getEventIds = async () =>{
      if (!sessionStorage.getItem("events_ids")) {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/v1/clubs/events/current`);
      const data = await response.json();
      sessionStorage.setItem("events_ids", data[0].eventIds);
      const parsedValue = JSON.parse(data[data?.length - 1].eventIds.replace( /\s+/g , ''));
      return parsedValue ;
    } else {
      const parsedValue = JSON.parse(sessionStorage.getItem("events_ids"));
      return parsedValue ;
    }
  }

  const getEvents = async (eventIds) => {
    if (!sessionStorage.getItem("events")) {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/v1/clubs/events/search`,
        {
          method: "POST",
          body: JSON.stringify({ ids: eventIds }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setEvents(data);
      setIsFetching(false);
      sessionStorage.setItem("events", JSON.stringify(data));
    } else {
      setEvents(JSON.parse(sessionStorage.getItem("events")));
      setIsFetching(false);
    }
  };

  useEffect(() => {
    (async () =>{
      const eventIds = await getEventIds();
      await getEvents(eventIds);
    }
    )();
    return () => setEvents([]);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || events.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 4000); // Change event every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, events.length]);

  // Handle manual navigation
  const goToevent = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false); // Pause auto-play when user interacts
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 6000);
  };

  const nextevent = () => {
    goToevent((currentIndex + 1) % events.length);
  };

  const prevevent = () => {
    goToevent((currentIndex - 1 + events.length) % events.length);
  };

  if( isFetching ) {
    return <Skeleton type={"event"}/>
  }
  else if (!events || events.length === 0 || !clubs || clubs.length === 0) {
    return (
      <div className="h-[calc(100vh-4rem)] bg-background-secondary dark:bg-charcoal flex items-center justify-center">
        <p className="text-text-secondary md:text-7xl text-4xl font-bold text-center">
          No events available
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="relative bg-background-secondary dark:bg-charcoal overflow-hidden">
        {/* Main Carousel Container */}
          <div className="relative h-[calc(100dvh-4rem)] flex items-center">
            {/* Navigation Arrows */}
            <button
              onClick={prevevent}
              className="absolute md:left-2 left-1 md:top-1/2 top-[32%] -translate-y-1/2 z-30 md:h-12 md:w-12 h-8 w-8 bg-charcoal/10 dark:bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-charcoal/20 dark:hover:bg-white/20 transition-all duration-300 group"
            >
              <svg
                className="md:h-6 md:w-6 h-4 w-4 transform group-hover:-translate-x-1 transition-transform"
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
              onClick={nextevent}
              className="absolute md:right-2 right-1 md:top-1/2 top-[32%] -translate-y-1/2 z-30 md:h-12 md:w-12 h-8 w-8 bg-charcoal/10 dark:bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-charcoal/20 dark:hover:bg-white/20 transition-all duration-300 group"
            >
              <svg
                className="md:h-6 md:w-6 h-4 w-4 transform group-hover:translate-x-1 transition-transform"
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

            {/* Text events Container */}
            <div className="absolute left-0 md:top-0 top-[35%] w-full lg:w-[40%] xl:w-[40%] h-[60%] lg:h-full z-20 overflow-hidden md:overflow-y-hidden overflow-y-scroll">
              <div
                className="flex w-full h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {events &&
                  events?.map((event, index) => {
                    const club =
                      clubs?.find((club) => club.clubId === event.clubId) ||
                      null;
                    const colors = getCategoryColors(club?.category);
                    return (
                      <div
                        key={index}
                        className="w-full h-full flex-shrink-0 flex md:items-center items-start pl-[5%] lg:pl-[10%] pr-[5%] lg:pr-2 xl:pl-[8%] "
                      >
                        <div className="flex-1 z-10 max-w-full min-h-[95%] flex flex-col items-start justify-center">
                          <div className="mb-5 xl:mb-10 lg:mb-8">
                            <span
                              className={`inline-block px-3 md:px-4 md:py-2 py-1 rounded-full text-sm font-semibold ${colors.accent} text-white md:mb-4 mb-1 animate-fade-in`}
                            >
                              {club.category}
                            </span>
                            <h2 className="line-clamp-3 xl:text-7xl lg:text-5xl text-3xl font-bold text-text dark:text-white md:mb-6 mb-3 leading-tight animate-slide-in-left">
                              {event.title}
                            </h2>
                            <h3 className="text-md md:text-2xl font-bold text-text dark:text-white mb-3 md:mb-6 leading-tight animate-slide-in-left">
                              <p className="text-text-secondary dark:text-text-secondary-dark md:mb-2 mb-2 md:text-md text-md">
                                organized by -
                              </p>{" "}
                              {club.name}
                            </h3>
                            <p className="line-clamp-4 text-sm md:text-lg text-text-secondary/80 dark:text-text-secondary-dark animate-slide-in-left-delay xl:leading-loose">
                              {event.description}
                            </p>
                          </div>

                          <div className="flex items-center space-x-6 animate-slide-in-left-delay-2">
                            <Link
                              to={`/clubs/${club.shortName}`}
                              state={getUtilityObject(event.clubId, false)}
                              className={`${colors.text} ${colors.hover} md:px-8 px-4 md:py-4 py-2 rounded-lg font-semibold transition-all duration-300 border-2 ${colors.border} hover:scale-105 hover:shadow-lg`}
                            >
                              Join Now
                            </Link>
                            <Link
                              to={`/clubs/${club.shortName}`}
                              state={getUtilityObject(event.clubId, true)}
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

            {/* Image events Container */}
            <div className="absolute right-0 md:top-0 top-3 w-full lg:w-[60%] xl:w-[60%] h-[30%] lg:h-full z-20 md:overflow-hidden overflow-y-visible">
              <div
                className="flex items-center w-full h-full transition-transform duration-700 ease-in-out delay-200"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {events &&
                  events?.map((event, index) => {
                    const club =
                      clubs?.find((club) => club.clubId === event.clubId) ||
                      null;
                    const colors = getCategoryColors(club.category);
                    return (
                      <div
                        key={index}
                        className="w-full h-full flex-shrink-0 flex justify-center items-center relative"
                      >
                        <div className="relative w-[90%] h-[90%] lg:max-w-[90%] lg:max-h-[65%] animate-scale-in">
                          {/* Image Container with Modern Styling */}
                          <div className="flex flex-shrink-0 relative w-full h-full md:rounded-2xl rounded-md overflow-hidden shadow-xl group">
                            <img
                              src={event.image}
                              alt={`${club.shortName} banner`}
                              className="w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-charcoal/30"></div>
                          </div>

                          {/* Floating club short name */}
                          <div className="absolute -top-4 -right-4 md:p-2 p-1 bg-white/10 backdrop-blur-sm flex items-center justify-center animate-float rounded-md">
                            <div
                              className={`p-2 rounded-md ${colors.accent} flex items-center justify-center`}
                            >
                              <span className="text-white font-bold md:text-xl text-sm">
                                {club.shortName}
                              </span>
                            </div>
                          </div>

                          {/* Event current status */}
                          <div className="absolute overflow-hidden -bottom-4 md:-bottom-6 md:-left-6 -left-2 bg-white/5 backdrop-blur-sm rounded-2xl rotate-12 animate-float-delay">
                            <div
                              className={`py-4 lg:py-8 xl:py-10 px-4 lg:px-9 xl:px-10  ${
                                (event.status === "Upcoming" && "bg-success") ||
                                (event.status === "Ongoing" && "bg-info") ||
                                "bg-red-500"
                              } flex items-center justify-center`}
                            >
                              <span className="text-white font-bold md:text-xl text-sm">
                                {event.status}
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
            <div className="absolute md:bottom-4 bottom-5 left-1/2 -translate-x-1/2 flex space-x-4 z-30">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToevent(index)}
                  className={`md:w-3 md:h-3 h-2 w-2 hover:scale-105 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary scale-125"
                      : "bg-charcoal/30 dark:bg-white hover:bg-charcoal/50 dark:hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        {/* Auto-play Indicator */}
        <div className="absolute md:top-8 top-7 md:right-8 right-[85%] z-20">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="md:w-12 w-8 md:h-12 h-8 bg-charcoal/50 dark:bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-charcoal/40 dark:hover:bg-white/40 transition-all duration-300"
          >
            {isAutoPlaying ? (
              <svg
                className="md:w-5 md:h-5 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
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
