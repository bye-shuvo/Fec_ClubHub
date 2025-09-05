import React from "react";

const Events = ({ club }) => {
  const clubEvents = [
    {
      id: 4,
      title: "TecnoFest-2025",
      description:
        "A Tech Fest for all the student of Faridpur Engineering College loaded with exiciting events.",
      year: "2025",
      category: "Competiton",
      type: "upcoming",
      clubId: 3,
    },
    {
      id: 4,
      title: "TecnoFest-2024",
      description:
        "A Tech Fest for all the student of Faridpur Engineering College loaded with exiciting events.",
      year: "2024",
      category: "Competiton",
      type: "old",
      clubId: 3,
    },
  ];
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-header text-5xl font-bold text-charcoal mb-4">Club Events</h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Celebrating our milestones and successes that showcase the talent and
          dedication of our members.
        </p>
      </div>
      {clubEvents.some((event) => event.clubId === club.clubId) ? (
        <div className="space-y-6">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold dark:text-white">Upcoming Events</h2>
            {clubEvents.some((event) => event.type === "upcoming") ? (
              <div className="grid grid-cols-2 gap-6">
                {clubEvents.map(
                  (event) =>
                    event.clubId === club.clubId &&
                    event.type === "upcoming" && (
                      <div
                        key={event.id}
                        className="bg-white dark:bg-charcoal-card dark:hover:bg-background-secondary/5 rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-101 transition-all duration-150 ease-in-out"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
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
                        <h3 className="text-xl font-semibold text-text mb-2 dark:text-white">
                          {event.title}
                        </h3>
                        <p className="text-text-secondary dark:text-text-secondary-dark">{event.description}</p>
                      </div>
                    )
                )}
              </div>
            ) : (
              <div className="mx-auto text-2xl text-text-secondary text-center">
                No event to show
              </div>
            )}
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-charcoal dark:text-white">Old Events</h2>
            {clubEvents.some((event) => event.type === "old") ? (
              <div className="grid grid-cols-2 gap-6">
                {clubEvents.map(
                  (event) =>
                    event.clubId === club.clubId &&
                    event.type === "old" && (
                      <div
                        key={event.id}
                        className="bg-white dark:bg-charcoal-card dark:hover:bg-background-secondary/5 rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-101 transition-all duration-150 ease-in-out"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
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
                        <h3 className="text-xl font-semibold text-text dark:text-white mb-2">
                          {event.title}
                        </h3>
                        <p className="text-text-secondary dark:text-text-secondary-dark">{event.description}</p>
                      </div>
                    )
                )}
              </div>
            ) : (
              <div className="mx-auto text-2xl text-text-secondary dark:text-text-secondary-dark text-center">
                No event to show
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mx-auto text-2xl text-text-secondary dark:text-text-secondary-dark text-center">
          No event to show yet
        </div>
      )}
    </div>
  );
};

export default Events;
