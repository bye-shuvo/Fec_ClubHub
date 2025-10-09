import { useEffect, useRef, useState } from "react";

const Details = ({ data }) => {
  const [club, setClub] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const clubId = data?.club_id;
  const initialClubValue = useRef(null);
  const initialContactValue = useRef(null);

  const fetchClubDetails = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_SERVER_URL
      }/v1/clubs/find?clubId=${clubId}`
    );
    const clubData = await response.json();
    setClub(clubData[0]);
    initialClubValue.current = clubData;
    sessionStorage.setItem(
      `president-club-${clubId}-details`,
      JSON.stringify(clubData[0])
    );
  };

  const fetchContacts = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_SERVER_URL
      }/v1/clubs/contacts/search?clubId=${clubId}`
    );
    const contacts = await response.json();
    setContacts(contacts);
    initialContactValue.current = contacts;
    sessionStorage.setItem(
      `president-club-${clubId}-contacts`,
      JSON.stringify(contacts)
    );
  };

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(`president-club-${clubId}-contacts`)) {
        fetchContacts();
      } else {
        setContacts(
          JSON.parse(
            sessionStorage.getItem(`president-club-${clubId}-contacts`)
          )
        );
        initialContactValue.current = JSON.parse(
          sessionStorage.getItem(`president-club-${clubId}-contacts`)
        );
      }
    } catch (e) {
      console.error(e.message + " From ClubDetails.jsx");
    }
  }, [clubId]);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(`president-club-${clubId}-details`)) {
        fetchClubDetails();
      } else {
        setClub(
          JSON.parse(sessionStorage.getItem(`president-club-${clubId}-details`))
        );
        initialClubValue.current = JSON.parse(
          sessionStorage.getItem(`president-club-${clubId}-details`)
        );
      }
    } catch (e) {
      console.error(e.message + " From ClubDetails.jsx");
    }
  }, [clubId]);

  const handleChange = (e) => {
    if (Object.values(initialClubValue.current).includes(e.target.value)) {
      setIsChanged(false);
    } else {
      setIsChanged(true);
    }
    setClub((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleContactChange = (e) => {
    setContacts((prev) =>
      prev.map((contact) => {
        if (contact.method === e.target.name) {
          if (
            Object.values(
              initialContactValue.current.find(
                (contact) => contact.method === e.target.name
              )
            ).includes(e.target.value)
          ) {
            setIsChanged(false);
          } else {
            setIsChanged(true);
          }
          return { ...contact, link: e.target.value };
        } else {
          return contact;
        }
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Updation IIFE
      (async () => {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER_URL}/v1/clubs/update`,
          {
            method: "PUT",
            body: JSON.stringify({ club: club }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const message = await response.json();
        console.log(message);
      })();

      (async () => {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER_URL}/v1/clubs/contacts/update`,
          {
            method: "PUT",
            body: JSON.stringify({ contacts: contacts }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const message = await response.json();
        console.log(message);
      })();
      await fetchContacts();
      await fetchClubDetails();
      setIsChanged(false);
    } catch (e) {
      console.error(e.message + " From ClubDetails.jsx");
    }
  };

  return (
    <div className="custom-scrollbar pt-4 p-2 md:p-8 w-full md:w-[75%] mx-auto space-y-6 md:space-y-8 max-h-screen overflow-y-scroll">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-nowrap md:text-3xl font-bold text-charcoal dark:text-white">
          Manage Details
        </h2>
        <button
          type="submit"
          form="club-form"
          disabled={!isChanged}
          className={`${
            !isChanged
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-primary-dark cursor-pointer"
          } text-white text-sm md:text-md px-2 md:px-4 py-2 rounded-lg transition`}
        >
          Save Changes
        </button>
      </div>

      {/* Form */}
      <form
        id="club-form"
        onSubmit={handleSubmit}
        className="space-y-6 md:space-y-8"
      >
        {/* Logo + Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center border border-dashed border-gray-300 dark:border-gray-600 p-4 md:p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
            <p className="text-sm text-gray-500 mb-3">Club Logo</p>
            {club?.logo ? (
              <img
                src={club.logo}
                alt="Club Logo"
                className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover mb-3 shadow"
              />
            ) : (
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 text-xl mb-3">
                +
              </div>
            )}
            <input type="file" className="hidden" id="logo-upload" />
            <label
              htmlFor="logo-upload"
              className="cursor-pointer text-primary font-semibold hover:underline text-sm md:text-md"
            >
              Upload Logo
            </label>
          </div>

          {/* Banner */}
          <div className="flex flex-col items-center border border-dashed border-gray-300 dark:border-gray-600 p-4 md:p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
            <p className="text-sm text-gray-500 mb-3">Club Banner</p>
            {club?.banner ? (
              <img
                src={club.banner}
                alt="Club Banner"
                className="w-full h-24 md:h-32 object-cover rounded-lg mb-3 shadow"
              />
            ) : (
              <div className="w-full h-24 md:h-32 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 text-xl mb-3">
                +
              </div>
            )}
            <input type="file" className="hidden" id="banner-upload" />
            <label
              htmlFor="banner-upload"
              className="cursor-pointer text-primary font-semibold hover:underline text-sm md:text-md"
            >
              Upload Banner
            </label>
          </div>
        </div>

        {/* Club Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Club Name
            </label>
            <input
              type="text"
              name="name"
              value={club?.name || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Short Name / Acronym
            </label>
            <input
              type="text"
              name="shortName"
              value={club?.shortName || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Motto
            </label>
            <input
              type="text"
              name="motto"
              value={club?.motto || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              name="category"
              value={club?.category || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option>Technology</option>
              <option>Cultural</option>
              <option>Professional</option>
              <option>Community</option>
              <option>Academic</option>
              <option>Innovation</option>
              <option>Religious</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Description / About
          </label>
          <textarea
            name="description"
            value={club?.description || ""}
            onChange={handleChange}
            rows="5"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
          {contacts &&
            contacts.map((contact) => {
              return (
                <div key={contact.method}>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {contact.method} Link
                  </label>
                  <input
                    type={contact.method === "Email" ? "email" : "text"}
                    name={contact.method}
                    value={contact.link}
                    onChange={handleContactChange}
                    placeholder={`${contact.method} Link`}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              );
            })}
        </div>
      </form>
    </div>
  );
};

export default Details;
