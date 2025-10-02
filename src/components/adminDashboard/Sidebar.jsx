import { Link } from "react-router-dom";
import ThemeToggler from "../ThemeToggler";
import { useEffect, useState } from "react";

const Sidebar = ({ sidebarTab, setSidebarTab }) => {
  const [isShrink, setIsShrink] = useState(false);
  const sidebarFiels = [
    {
      title: "Club Overview",
      tab: "overview",
      icon: "📊",
    },
    {
      title: "Manage Club Details",
      tab: "club-details",
      icon: "🏫",
    },
    {
      title: "Events Management",
      tab: "events",
      icon: "📅",
    },
    {
      title: "Members / Committee",
      tab: "members",
      icon: "👥",
    },
    {
      title: "Media & Gallery",
      tab: "media",
      icon: "🖼️",
    },
    {
      title: "Club Testimonials",
      tab: "announcements",
      icon: "📰",
    },
    {
      title: "Settings & Permissions",
      tab: "settings",
      icon: "⚙️",
    },
  ];

  useEffect(()=>{
    const shrinkOnResize = () => {
      if(window.innerWidth <= 1260){
       setIsShrink(true);
      }
      else{
        setIsShrink(false);
      }
    }
    shrinkOnResize();
    window.addEventListener("resize" , shrinkOnResize)

    return () => {window.removeEventListener("resize" , shrinkOnResize)};
  },[]);

  return (
    <div
      className={`${isShrink ? 'w-fit md:w-[6%]' : 'min-w-full md:min-w-[18%]'} relative h-screen p-3 bg-white border border-border dark:border-charcoal-card/90 dark:bg-charcoal-card dark:text-white transition-all duration-300 ease-in-out`}
    >
      <h2 className="mb-2 font-title text-2xl flex justify-between items-center">
        {!isShrink && "FEC CLUBHUB"}
        <svg
          onClick={() => {
            setIsShrink(!isShrink);
          }}
          className={`${isShrink ? "rotate-180" : "rotate-0"} h-10 w-10 cursor-pointer transition-all ease-in-out duration-300`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path
            className="dark:fill-white fill-charcoal"
            d="M144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 160C496 151.2 488.8 144 480 144L160 144C151.2 144 144 151.2 144 160L144 480zM160 544C124.7 544 96 515.3 96 480L96 160C96 124.7 124.7 96 160 96L480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544zM224 320C224 313.3 226.8 307 231.7 302.4L343.7 198.4C350.7 191.9 360.9 190.2 369.6 194C378.3 197.8 384 206.5 384 216L384 424C384 433.5 378.3 442.2 369.6 446C360.9 449.8 350.7 448.1 343.7 441.6L231.7 337.6C226.8 333.1 224 326.7 224 320z"
          />
        </svg>
      </h2>
      {sidebarFiels &&
        sidebarFiels.map((field) => {
          return (
            <div
              key={field.tab}
              onClick={() => {
                setSidebarTab(field?.tab);
              }}
              className={`${
                field.tab === sidebarTab
                  ? `bg-charcoal/10 dark:bg-background-secondary/5 ${isShrink ? 'w-[125%]' : 'w-[105%]'}  rounded-l-xl rounded-r-none`
                  : "rounded-sm"
              } p-2 mb-1 text-sm md:text-[1rem] text-nowrap hover:bg-charcoal/10 dark:hover:bg-background-secondary/5 cursor-pointer overflow-hidden transition-all duration-200 ease-in-out hover:shadow-sm`}
            >
              <span
                className={`${isShrink ? "text-[1.1rem] text-center" : "text-[1rem] mr-2"}`}
              >
                {field.icon}
              </span>

              {!isShrink && field.title}
            </div>
          );
        })}
      <div
        className={`absolute w-full bottom-0 left-0 p-3 ${
          isShrink ? "flex-col justify-center" : "items-center justify-between"
        } flex z-50`}
      >
        <Link
          className={`p-2 flex  ${
            isShrink
              ? "flex-col justify-center items-center"
              : "items-center justify-between"
          } gap-2 hover:bg-charcoal/10 dark:hover:bg-background-secondary/5 rounded-sm`}
          to={"/"}
        >
          <svg
            className={`${isShrink ? 'h-7 w-7 md:h-8 md:w-8' : 'h-7 w-7 md:h-9 md:w-9'}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <path
              className="dark:fill-white fill-charcoal"
              d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z"
            />
          </svg>
          Home
        </Link>
        <ThemeToggler />
      </div>
    </div>
  );
};

export default Sidebar;
