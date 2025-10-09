import { useEffect, useRef, useState } from "react";

const Manageevent = ({ data }) => {
  const [event, setEvent] = useState(null);
  const [initialevents, setinitialevents] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
  const [isUpdateBtnClicked, setIsUpdateBtnClicked] = useState(false);
  const [isDeletable, setIsDeletable] = useState(false);
  const [isDltModalOpen, setIsDltModalOpen] = useState(false);
  const [eventId, setEventId] = useState(null);
  const clubId = data?.club_id;

  // Fetch event

  const fetchEvents = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_SERVER_URL
      }/v1/clubs/events/search?clubId=${clubId}`
    );
    const events = await response.json();
    setinitialevents(events);
    sessionStorage.setItem(
      `president-club-${clubId}-events`,
      JSON.stringify(events)
    );
  };

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(`president-club-${clubId}-events`)) {
        fetchEvents();
      } else {
        setinitialevents(
          JSON.parse(sessionStorage.getItem(`president-club-${clubId}-events`))
        );
      }
    } catch (e) {
      console.error(e.message + " From Overview.jsx");
    }
  }, []);

  // Handle field update
  const handleChange = (e) => {
    setEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setIsChanged(true);
  };

  // Create new event
  const handleAddEvent = () => {
    setIsAddBtnClicked(true);
    setIsUpdateBtnClicked(false);
    const newEvent = {
      clubId,
      title: "",
      description: "",
      image: "",
      status: "Upcoming",
      year: "",
      category: "Acadamic",
    };
    setEvent(newEvent);
    setIsModalOpen(true);
  };

  //Update event
  const handleEditEvent = (id) => {
    setIsAddBtnClicked(false);
    setIsUpdateBtnClicked(true);
    const clickedEvent = initialevents.find((event) => event.id === id);
    setEvent(clickedEvent);
    setIsModalOpen(true);
  };

  // Delete event
  const handleDeleteEvent = async (id) => {
    setIsDltModalOpen(false);
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_SERVER_URL
      }/v1/clubs/events/delete?id=${id}`,
      {
        method: "DELETE",
      }
    );
    const message = await response.json();
    console.log(message);
    await fetchEvents();
  };

  useEffect(() => {
    if (isDeletable) {
      handleDeleteEvent();
    }
    return () => setIsDeletable(false);
  }, [setIsDeletable]);

  // Submit changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isAddBtnClicked) {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER_URL}/v1/clubs/events/create`,
          {
            method: "POST",
            body: JSON.stringify({ event: event }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const message = await response.json();
        console.log(message);
        await fetchEvents();
        setIsChanged(false);
        setIsModalOpen(false);
      }

      if (isUpdateBtnClicked) {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER_URL}/v1/clubs/events/update`,
          {
            method: "PUT",
            body: JSON.stringify({ event: event }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const message = await response.json();
        console.log(message);
        await fetchEvents();
        setIsChanged(false);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Error updating event:", err.message);
    }
  };

  return (
    <div className="relative custom-scrollbar pt-4 p-2 md:p-8 md:w-[75%] mx-auto space-y-6 md:space-y-8 max-h-screen overflow-y-scroll">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-3xl font-bold text-charcoal dark:text-white">
          Manage event
        </h2>
      </div>

      {/* Add New Event */}
      <div className="flex justify-center">
        {/* Add Event Button */}
        <button
          type="button"
          onClick={handleAddEvent}
          className="cursor-pointer mx-auto md:w-[50%] px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition"
        >
          + Add New Event
        </button>
      </div>

      {/* Events */}
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2 md:mb-4">
          Club events
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
          {initialevents && initialevents?.length > 0 ? (
            initialevents?.map((event) => (
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
                  <div className="buttons mt-6 flex justify-between">
                    <button
                      type="button"
                      name="edit"
                      onClick={() => {
                        handleEditEvent(event.id);
                      }}
                      className="w-[45%] bg-primary hover:bg-primary-dark cursor-pointer text-white text-sm px-1 md:px-2 py-2 rounded-lg transition"
                    >
                      Edit Event
                    </button>
                    <button
                      type="button"
                      name="delete"
                      onClick={() => {
                        setIsDltModalOpen(true);
                        setEventId(event.id);
                      }}
                      className="w-[45%] bg-error hover:bg-error-secondary cursor-pointer text-white text-sm px-1 md:px-2 py-2 rounded-lg transition"
                    >
                      Delete Event
                    </button>
                  </div>
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

      {/* Form Modal */}
      {isModalOpen && (
        <div className="custom-scrollbar absolute top-[50%] left-[50%] -translate-1/2 w-[95%] md:w-[80%] max-h-[97%] md:max-h-[90%] overflow-y-scroll rounded-xl p-4 md:p-8 bg-gray-50 dark:bg-charcoal-card space-y-4 shadow-2xl ">
          {/* Form Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-3xl font-bold text-charcoal dark:text-white">
              Create Event
            </h2>
            <button
              type="button"
              onClick={() => {
                setIsChanged(false);
                setIsModalOpen(false);
              }}
              className="p-2 px-4 rounded-md cursor-pointer border dark:border-gray-600 hover:bg-error-secondary"
            >
              ✗
            </button>
          </div>

          {/* Form Preview */}
          <div id="form-preview">
            <h3 className="mb-2 text-lg md:text-2xl font-bold text-charcoal dark:text-white">
              Form Preview
            </h3>
            <div
              key={event.id}
              className="border border-dashed relative bg-white dark:bg-charcoal-card shadow-md rounded-xl md:max-w-[80%] mx-auto overflow-hidden"
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
                {event.category || "Temporary"}
              </p>
              {event.image ? (
                <img
                  src={event.image}
                  alt="Event Banner"
                  className="w-full min-h-40 object-cover"
                />
              ) : (
                <svg
                  className="h-40 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <path
                    className="fill-white dark:fill-charcoal"
                    d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96zM224 176C250.5 176 272 197.5 272 224C272 250.5 250.5 272 224 272C197.5 272 176 250.5 176 224C176 197.5 197.5 176 224 176zM368 288C376.4 288 384.1 292.4 388.5 299.5L476.5 443.5C481 450.9 481.2 460.2 477 467.8C472.8 475.4 464.7 480 456 480L184 480C175.1 480 166.8 475 162.7 467.1C158.6 459.2 159.2 449.6 164.3 442.3L220.3 362.3C224.8 355.9 232.1 352.1 240 352.1C247.9 352.1 255.2 355.9 259.7 362.3L286.1 400.1L347.5 299.6C351.9 292.5 359.6 288.1 368 288.1z"
                  />
                </svg>
              )}
              <div className="p-2 md:p-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {event.title || "Event Title"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Organized on {event.year || new Date().getFullYear()}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
                  {event.description || "Add a new event for your club"}
                </p>
              </div>
            </div>
          </div>

          {/* From */}
          <form
            id="event-form"
            onSubmit={handleSubmit}
            className="space-y-4 md:space-y-8"
          >
            <div key={event.id} className="space-y-4">
              <h3 className="mb-2 text-lg md:text-2xl font-bold text-charcoal dark:text-white">
                Edit Event
              </h3>
              {/* Title & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Event Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={event.title}
                    onChange={(e) => handleChange(e, event.id)}
                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={event.status}
                    onChange={(e) => handleChange(e, event.id)}
                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option>Upcoming</option>
                    <option>Running</option>
                    <option>Expired</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  value={event.description}
                  onChange={(e) => handleChange(e, event.id)}
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* year & category */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Event Year
                  </label>
                  <input
                    type="text"
                    name="year"
                    value={event.year}
                    onChange={(e) => handleChange(e, event.id)}
                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={event.category || "Acadamic"}
                    onChange={(e) => handleChange(e, event.id)}
                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option>Acadamic</option>
                    <option>Innovation</option>
                    <option>Sports</option>
                    <option>Competetion</option>
                    <option>Adventure</option>
                  </select>
                </div>
              </div>

              {/* Image & Link */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-2 md:gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Event Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={event.image}
                    onChange={(e) => handleChange(e, event.id)}
                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </form>

          {/* Create Button */}
          {isAddBtnClicked && (
            <button
              type="submit"
              form="event-form"
              name="create"
              disabled={!isChanged}
              className={`${
                !isChanged
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-dark cursor-pointer"
              } text-white text-sm md:text-md w-full px-4 py-2 rounded-lg transition`}
            >
              Create
            </button>
          )}
          {/* Update Button */}
          {isUpdateBtnClicked && (
            <button
              type="submit"
              form="event-form"
              name="update"
              disabled={!isChanged}
              className={`${
                !isChanged
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-dark cursor-pointer"
              } text-white text-sm md:text-md w-full px-4 py-2 rounded-lg transition`}
            >
              Update
            </button>
          )}
          {/* Delete Button */}
          {isUpdateBtnClicked && (
            <button
              type="button"
              onClick={() => {
                setIsDltModalOpen(true);
              }}
              className="bg-error hover:bg-error-secondary w-full cursor-pointer text-white text-sm md:text-md px-4 py-2 rounded-lg transition"
            >
              Delete Event
            </button>
          )}
        </div>
      )}

      {/* Delete Event Modal */}
      {isDltModalOpen && (
        <div className="absolute top-1/2 left-1/2 -translate-1/2 w-[40%] h-[30%] rounded-xl p-2 md:p-6 bg-gray-50 dark:bg-charcoal-card space-y-6 shadow-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-lg md:text-2xl font-bold text-charcoal dark:text-white">
              Delete Confirmation?
            </h2>
            <button
              type="button"
              onClick={() => {
                setIsDltModalOpen(false);
              }}
              className="p-2 px-4 rounded-md cursor-pointer border dark:border-gray-600 hover:bg-error-secondary"
            >
              ✗
            </button>
          </div>
          <p>Do you really want to delete this event?</p>
          <div className="flex items-center justify-between">
            <button
              type="button"
              name="cancel"
              onClick={() => {
                setIsDltModalOpen(false);
              }}
              className="w-[45%] bg-text-secondary-dark cursor-pointer text-white text-sm px-1 md:px-2 py-2 rounded-lg transition"
            >
              cancel
            </button>
            <button
              type="button"
              name="confirm"
              onClick={() => {
                handleDeleteEvent(eventId);
              }}
              className="w-[45%] bg-error hover:bg-error-secondary cursor-pointer text-white text-sm px-1 md:px-2 py-2 rounded-lg transition"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manageevent;
