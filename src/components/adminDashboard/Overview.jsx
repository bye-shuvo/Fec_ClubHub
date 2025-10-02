import { useEffect, useState } from "react";

const Overview = ({ data }) => {
  const [club, setClub] = useState(null);
  const [events, setEvents] = useState(null);
  const [count, setCount] = useState({});
  const clubId = data?.club_id;
  useEffect(() => {
    try {
      if (!sessionStorage.getItem(`president-club-${clubId}-details`)) {
        (async () => {
          const response = await fetch(
            `${
              import.meta.env.VITE_BACKEND_SERVER_URL
            }/v1/clubs/find?clubId=${clubId}`
          );
          const club = await response.json();
          setClub(club[0]);
          sessionStorage.setItem(
            `president-club-${clubId}-details`,
            JSON.stringify(club[0])
          );
        })();
      } else {
        setClub(
          JSON.parse(sessionStorage.getItem(`president-club-${clubId}-details`))
        );
      }
    } catch (e) {
      console.error(e.message + " From Overview.jsx");
    }
  }, []);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(`president-club-${clubId}-events`)) {
        (async () => {
          const response = await fetch(
            `${
              import.meta.env.VITE_BACKEND_SERVER_URL
            }/v1/clubs/events/search?clubId=${clubId}`
          );
          const events = await response.json();
          setEvents(events);
          sessionStorage.setItem(
            `president-club-${clubId}-events`,
            JSON.stringify(events)
          );
        })();
      } else {
        setEvents(
          JSON.parse(sessionStorage.getItem(`president-club-${clubId}-events`))
        );
      }
    } catch (e) {
      console.error(e.message + " From Overview.jsx");
    }
  }, []);

  useEffect(() => {
    try {
      if (
        !sessionStorage.getItem(`president-club-${clubId}-ended-events-count`)
      ) {
        (async () => {
          const response = await fetch(
            `${
              import.meta.env.VITE_BACKEND_SERVER_URL
            }/v1/clubs/events/count?clubId=${clubId}&status=Ended`
          );
          const count = await response.json();
          setCount((prev) => {return {...prev , total_ended_events: count[0]?.total_events }});
          sessionStorage.setItem(
            `president-club-${clubId}-ended-events-count`,
            JSON.stringify(count)
          );
        })();
      } else {
        setCount((prev) => {return {
          ...prev ,
          total_ended_events: JSON.parse(
            sessionStorage.getItem(
              `president-club-${clubId}-ended-events-count`
            )
          )[0]?.total_events,
        }});
      }
    } catch (e) {
      console.error(e.message + " From Overview.jsx");
    }
  }, [clubId]);
  useEffect(() => {
    try {
      if (
        !sessionStorage.getItem(
          `president-club-${clubId}-upcoming-events-count`
        )
      ) {
        (async () => {
          const response = await fetch(
            `${
              import.meta.env.VITE_BACKEND_SERVER_URL
            }/v1/clubs/events/count?clubId=${clubId}&status=Upcoming`
          );
          const count = await response.json();
          setCount((prev) => {return {...prev , total_upcoming_events: count[0]?.total_events }});
          sessionStorage.setItem(
            `president-club-${clubId}-upcoming-events-count`,
            JSON.stringify(count)
          );
        })();
      } else {
        setCount((prev) => {return {
          ...prev ,
          total_upcoming_events: JSON.parse(
            sessionStorage.getItem(
              `president-club-${clubId}-upcoming-events-count`
            )
          )[0]?.total_events,
        }});
      }
    } catch (e) {
      console.error(e.message + " From Overview.jsx");
    }
  }, [clubId]);

  return (
    <div className="custom-scrollbar p-2 md:p-8 md:max-w-[75%] mx-auto space-y-2 md:space-y-8 max-h-screen overflow-y-scroll">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-nowrap md:text-3xl font-bold text-charcoal dark:text-white">
          Club Overview
        </h2>
        <button className="cursor-pointer bg-primary text-white text-sm md:text-md px-2 md:px-4 py-2 rounded-lg hover:bg-primary-dark transition">
          Edit Club
        </button>
      </div>

      {/* Club Info Card */}
      <div className="bg-white dark:bg-charcoal-card shadow-lg rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-2 md:gap-6 items-center">
        {/* Logo */}
        <img
          src={club?.logo}
          alt={club?.shortName}
          className="w-14 h-14 md:w-28 md:h-28 rounded-full object-cover shadow-md"
        />

        {/* Info */}
        <div className="flex-wrap">
          <h3 className="md:text-2xl text-lg font-bold text-gray-800 dark:text-white mb-2">
            {club?.name} ({club?.shortName})
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span className="font-semibold">Category:</span> {club?.category}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 md:leading-relaxed">
            {club?.description}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
        <div className="bg-white dark:bg-charcoal-card p-2 md:p-6 text-center shadow-md rounded-xl">
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Total Members
          </h4>
          <p className="text-xl md:text-3xl font-bold text-primary mt-2">120</p>
        </div>
        <div className="bg-white dark:bg-charcoal-card p-2 md:p-6 text-center shadow-md rounded-xl">
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Events Hosted
          </h4>
          <p className="text-xl md:text-3xl font-bold text-primary mt-2">
            {count && count?.total_ended_events && count.total_ended_events}
          </p>
        </div>
        <div className="bg-white dark:bg-charcoal-card p-2 md:p-6 text-center shadow-md rounded-xl">
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Upcoming Events
          </h4>
          <p className="text-xl md:text-3xl font-bold text-primary mt-2">
            {count &&
              count?.total_upcoming_events &&
              count.total_upcoming_events}
          </p>
        </div>
        <div className="bg-white dark:bg-charcoal-card p-2 md:p-6 text-center shadow-md rounded-xl">
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Committee Members
          </h4>
          <p className="text-xl md:text-3xl font-bold text-primary mt-2">15</p>
        </div>
      </div>

      {/* Recent Events */}
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2 md:mb-4">
          Recent Events
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
          {events && events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="relative bg-white dark:bg-charcoal-card shadow-md rounded-xl overflow-hidden"
              >
                <p
                  className={`absolute top-3 right-3 px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${
                    event.category === "Sports"
                      ? "bg-blue-100 text-blue-800"
                      : event.category === "Competition"
                      ? "bg-green-100 text-green-800"
                      : event.category === "Innovation"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-orange-100 text-orange-800"
                  } shadow-lg`}
                >
                  {event.category}
                </p>
                <img
                  src={event.image}
                  alt="Event Banner"
                  className="w-full h-40 object-cover"
                />
                <div className="p-2 md:p-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {event.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Organized on {event.year}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
                    {event.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-text-secondary dark:text-text-secondary-dark text-lg md:text-2xl text-center font-bold">
              No Event To Show Yet
            </div>
          )}
        </div>
      </div>

      {/* Social Links */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 md:mb-4">
          Connect With Us
        </h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <a
            href="#"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            📘 Facebook
          </a>
          <a
            href="#"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            📸 Email
          </a>
          <a
            href="#"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            💼 Form
          </a>
        </div>
      </div>
    </div>
  );
};

export default Overview;
