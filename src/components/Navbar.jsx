import { useRef } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ getCategoryColors }) => {
  const [isDark, setIsDark] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedClubs, setSearchedClubs] = useState([]);

  //UseEffect for enabling dark mode
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;
    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark", !isDark);
    localStorage.setItem("theme", !isDark ? "dark" : "light");
  };

  const findClub = async () => {
    if (search === "") return;
    const response = await fetch(`http://localhost:3001/v1/clubs/search?club=${search}`);
    const data = await response.json();
    console.log(data);
    setSearchedClubs(data);
  };

  useEffect(() => {
    findClub();
  }, [search]);

  return (
    <>
      <nav className="flex items-center justify-between flex-shrink-0 sticky top-0 left-0 z-40 px-4 py-3 w-full h-[4rem] bg-white/60 dark:bg-gray-900/70 backdrop-blur-xl border-b-2 border-gray-200 dark:border-gray-700 shadow-sm">
        <h1 className="text-nowrap font-header font-extrabold md:text-[2.5rem] text-[1.7rem] text-center text-primary dark:text-white hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200 ease-in-out mr-4">
          FEC ClubHub
        </h1>
        <div className="flex md:gap-4 gap-2 items-center">
          {/* search box */}
          <label className="relative flex items-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-200 md:px-3 px-1 py-2 md:py-3 max-w-[10rem] md:max-w-[15rem]">
            <svg
              className="w-7 md:h-6 md:w-6 text-gray-400 dark:text-gray-300 md:mr-2 mr-1"
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
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="bg-transparent outline-none text-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 w-full text-sm md:text-md"
            />
          </label>
          {/* Theme toggler */}
          <label className="relative md:p-6 p-5 flex justify-center items-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 cursor-pointer select-none">
            <svg
              className={`absolute md:h-8 md:w-8 h-6 w-6  fill-amber-400 transition-all duration-300 ${
                isDark ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M210.2 53.9C217.6 50.8 226 51.7 232.7 56.1L320.5 114.3L408.3 56.1C415 51.7 423.4 50.9 430.8 53.9C438.2 56.9 443.4 63.5 445 71.3L465.9 174.5L569.1 195.4C576.9 197 583.5 202.4 586.5 209.7C589.5 217 588.7 225.5 584.3 232.2L526.1 320L584.3 407.8C588.7 414.5 589.5 422.9 586.5 430.3C583.5 437.7 576.9 443.1 569.1 444.6L465.8 465.4L445 568.7C443.4 576.5 438 583.1 430.7 586.1C423.4 589.1 414.9 588.3 408.2 583.9L320.4 525.7L232.6 583.9C225.9 588.3 217.5 589.1 210.1 586.1C202.7 583.1 197.3 576.5 195.8 568.7L175 465.4L71.7 444.5C63.9 442.9 57.3 437.5 54.3 430.2C51.3 422.9 52.1 414.4 56.5 407.7L114.7 320L56.5 232.2C52.1 225.5 51.3 217.1 54.3 209.7C57.3 202.3 63.9 196.9 71.7 195.4L175 174.6L195.9 71.3C197.5 63.5 202.9 56.9 210.2 53.9zM239.6 320C239.6 275.6 275.6 239.6 320 239.6C364.4 239.6 400.4 275.6 400.4 320C400.4 364.4 364.4 400.4 320 400.4C275.6 400.4 239.6 364.4 239.6 320zM448.4 320C448.4 249.1 390.9 191.6 320 191.6C249.1 191.6 191.6 249.1 191.6 320C191.6 390.9 249.1 448.4 320 448.4C390.9 448.4 448.4 390.9 448.4 320z" />
            </svg>
            <svg
              className={`absolute md:h-8 md:w-8 h-6 w-6 fill-info transition-all duration-300 ${
                isDark ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576C388.8 576 451.3 548.8 497.3 504.6C504.6 497.6 506.7 486.7 502.6 477.5C498.5 468.3 488.9 462.6 478.8 463.4C473.9 463.8 469 464 464 464C362.4 464 280 381.6 280 280C280 207.9 321.5 145.4 382.1 115.2C391.2 110.7 396.4 100.9 395.2 90.8C394 80.7 386.6 72.5 376.7 70.3C358.4 66.2 339.4 64 320 64z" />
            </svg>
            <input
              id="theme_toggler"
              type="checkbox"
              aria-label="Toggle dark mode"
              checked={isDark}
              onChange={toggleTheme}
              className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
            />
          </label>
        </div>
        {search !== "" && (
          <div
            id="search_modal"
            className="min-w-sm md:max-w-[27%] md:max-h-[70vh] max-h-[80vh] overflow-y-scroll shadow-2xl bg-white border border-border dark:border-charcoal-card/90 dark:bg-charcoal-card absolute top-[4rem] md:right-2 right-0 z-50 p-4 rounded-b-lg space-y-5"
          >
            {searchedClubs.length > 0 ? (
              searchedClubs.map((club) => {
                const colors = getCategoryColors(club.category);
                return (
                  <Link
                    key={club.name}
                    to={`/clubs/${club.name}`}
                    state={{ club: club , colors : colors}}
                    className="h-8 md:h-12 flex items-center gap-2 md:gap-3 hover:bg-charcoal/10 dark:hover:bg-background-secondary/5 rounded-sm cursor-pointer overflow-hidden transition-all duration-200 ease-in-out"
                  >
                    <img className="h-full w-14 object-center object-cover" src={club.logo} alt={club.name.slice(0 , 1)} />
                    <p className="md:text-lg text-sm dark:text-white text-charcoal">{club.name}</p>
                  </Link>
                );
              })
            ) : (
              <div className="dark:text-white md:text-lg text-sm text-center"> No Club found </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
