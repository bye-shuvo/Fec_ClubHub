import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import SignIn from "./SignIn.jsx";
import ThemeToggler from "./ThemeToggler.jsx";

const Navbar = ({ getCategoryColors }) => {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchedClubs, setSearchedClubs] = useState([]);
  const timer = useRef(null);
  const delay = 2000;

  const findClub = async (value) => {
    if (value.trim() === "") return;
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_SERVER_URL}/v1/clubs/search?club=${value}`
    );
    const data = await response.json();
    console.log(data);
    setSearchedClubs(data);
    setIsSearching(false);
  };

  //Debouncing for search query
  const debounce = (value) => {
    clearTimeout(timer.current);
    setSearch(value);
    setSearchedClubs([]);
    setIsSearching(true);
    timer.current = setTimeout(() => {
      //code for api call
      findClub(value);
    }, delay);
  };

  return (
    <>
      <nav className="flex items-center justify-between flex-shrink-0 sticky top-0 left-0 z-40 px-4 py-3 w-full h-[4rem] bg-white/60 dark:bg-gray-900/70 backdrop-blur-xl border-b-2 border-gray-200 dark:border-gray-700 shadow-sm">
        <h1 className="text-nowrap font-title font-semibold md:text-[2.2rem] text-[1.7rem] text-center text-primary dark:text-white hover:text-primary-dark dark:hover:text-primary transition-colors duration-200 ease-in-out mr-4">
          FEC CLUBHUB
        </h1>
        <div className="flex md:gap-4 gap-2 items-center">
          
          {/* search box */}
          <label className="relative flex items-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-200 md:px-3 px-1 py-2 md:py-[10px] max-w-[10rem] md:max-w-[15rem] md:min-w-[16rem]">
            <svg
              className="w-7 md:h-5 md:w-6 text-gray-400 dark:text-gray-300 md:mr-2 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              id="club_search"
              type="search"
              placeholder="Search for a club"
              value={search}
              onChange={(e) => {
                debounce(e.target.value);
              }}
              className="bg-transparent outline-none text-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 w-full text-sm md:text-md"
            />
          </label>
          {/* component to handle theme change */}
          <ThemeToggler />
          {/* Component to handle user signin */}
          <SignIn />
        </div>
        {search.trim() && (
          <div
            id="search_modal"
            className="custom-scrollbar w-full md:w-[27%] md:max-h-[70vh] max-h-[85vh] overflow-y-scroll shadow-2xl bg-white border border-border dark:border-charcoal-card/90 dark:bg-charcoal-card absolute top-[4rem] md:right-2 right-0 z-50 p-4 rounded-b-lg space-y-5"
          >
            {isSearching && (
              <div className="dark:text-white md:text-md text-sm text-center">
                Finding...
              </div>
            )}
            {searchedClubs.length > 0 && !isSearching
              ? searchedClubs.map((club) => {
                  const colors = getCategoryColors(club.category);
                  return (
                    <Link
                      key={club.name}
                      to={`/clubs/${club.name}`}
                      state={{ club: club, colors: colors }}
                      className="h-8 md:h-12 flex items-center gap-2 md:gap-3 hover:bg-charcoal/10 dark:hover:bg-background-secondary/5 rounded-sm cursor-pointer overflow-hidden transition-all duration-200 ease-in-out"
                    >
                      <img
                        className="h-full w-14 object-center object-cover"
                        src={club.logo}
                        alt={club.NAME.slice(0, 1)}
                      />
                      <p className="md:text-lg text-sm dark:text-white text-charcoal">
                        {club.NAME}
                      </p>
                    </Link>
                  );
                })
              : !isSearching && (
                  <div className="dark:text-white md:text-md text-sm text-center">
                    No Club Found
                  </div>
                )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
