import React, { useEffect, useState } from "react";

const Events = ({ club }) => {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    if (!sessionStorage.getItem(`event_${club.shortName}`)) {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/v1/clubs/events/search?clubId=${club.clubId}`
      );
      const data = await response.json();
      setEvents(data);
      console.log(data);
      sessionStorage.setItem(`event_${club.shortName}`, JSON.stringify(data));
    } else {
      setEvents(JSON.parse(sessionStorage.getItem(`event_${club.shortName}`)));
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center md:mb-8">
        <h2 className="font-header text-4xl md:text-5xl font-bold text-charcoal dark:text-white mb-4">
          Club Events
        </h2>
        <p className="md:text-lg text-sm text-text-secondary md:max-w-2xl max-w-[95%] mx-auto">
          Celebrating our milestones and successes that showcase the talent and
          dedication of our members.
        </p>
      </div>
      {events && events.length > 0 ? (
        <div className="space-y-6 md:space-x-4">
          <div className="space-y-6 md:space-x-4">
            <h2 className="text-2xl md:text-3xl font-bold dark:text-white">
              Upcoming Events
            </h2>
            {events.find((event) => event.status === "Upcoming") ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-3">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white dark:bg-charcoal-card dark:hover:bg-background-secondary/5 md:rounded-lg rounded-md shadow-md md:p-6 p-4 hover:shadow-lg hover:scale-102 transition-all duration-150 ease-in-out"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className={`inline-flex items-center md:px-3 px-2 py-1 rounded-full text-[0.7rem] md:text-xs font-medium ${
                          event.category === "Competition"
                            ? "bg-blue-100 text-blue-800"
                            : event.category === "Innovation"
                            ? "bg-green-100 text-green-800"
                            : event.category === "International"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {event.category}
                      </span>
                      <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
                        {event.year}
                      </span>
                    </div>
                    <h3 className="md:text-xl text-lg font-semibold text-text mb-2 dark:text-white">
                      {event.title}
                    </h3>
                    <p className="text-text-secondary dark:text-text-secondary-dark text-sm md:text-md">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mx-auto font-bold text-xl md:text-2xl text-text-secondary text-center">
                No upcoming events to show
              </div>
            )}
          </div>
          <div className="space-y-6 md:space-x-4">
            <h2 className="text-2xl md:text-3xl font-bold dark:text-white">
              Previous Events
            </h2>
            {events.find((event) => event.status === "Ended") ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-3">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white dark:bg-charcoal-card dark:hover:bg-background-secondary/5 md:rounded-lg rounded-md shadow-md md:p-6 p-4 hover:shadow-lg hover:scale-102 transition-all duration-150 ease-in-out"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className={`inline-flex items-center md:px-3 px-2 py-1 rounded-full text-[0.7rem] md:text-xs font-medium ${
                          event.category === "Competition"
                            ? "bg-blue-100 text-blue-800"
                            : event.category === "Innovation"
                            ? "bg-green-100 text-green-800"
                            : event.category === "International"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {event.category}
                      </span>
                      <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
                        {event.year}
                      </span>
                    </div>
                    <h3 className="md:text-xl text-lg font-semibold text-text mb-2 dark:text-white">
                      {event.title}
                    </h3>
                    <p className="text-text-secondary dark:text-text-secondary-dark text-sm md:text-md">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mx-auto font-bold text-xl md:text-2xl text-text-secondary text-center">
                No previous events to show
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mx-auto font-bold text-xl md:text-2xl text-text-secondary dark:text-text-secondary-dark text-center">
          No event to show yet
        </div>
      )}
    </div>
  );
};

export default Events;
