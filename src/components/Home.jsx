import React , { useEffect, useState , useMemo, lazy , Suspense } from "react";
const Clubcards = lazy(() => import("./Clubcards.jsx"))
const Eventcarousel = lazy(() => import("./Eventcarousel.jsx"))
const Navbar = lazy(() => import("./Navbar.jsx"))

const Home = () => {
  const [clubs , setClubs] = useState([]);
  const [isFetching , setIsFetching] = useState(true);
  const fetchClubs = async () => {
    if(sessionStorage.getItem("clubs")){
      setClubs(JSON.parse(sessionStorage.getItem("clubs")));
      setIsFetching(false);
    }
    else{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/v1/clubs`);
      const data = await response.json();
      setClubs(data);
      setIsFetching(false);
      sessionStorage.setItem("clubs" , JSON.stringify(data));
    }
  }

    // Function to get category-specific colors
  const getCategoryColors = (category) => {
    switch (category) {
      case "technology":
        return {
          accent: "bg-success",
          text: "text-success",
          group_hover_text : "group-hover:text-success" ,
          border: "border-success/20",
          hover: "hover:bg-success/10",
          fill: "hover:fill-success",
        };
      case "innovation":
        return {
          accent: "bg-innovation",
          text: "text-innovation",
          group_hover_text : "group-hover:text-innovation",
          border: "border-innovation/20",
          hover: "hover:bg-innovation/10",
          fill: "hover:fill-innovation",
        };
      case "creative":
        return {
          accent: "bg-cultural",
          text: "text-cultural",
          group_hover_text : "group-hover:text-cultural",
          border: "border-cultural/20",
          hover: "hover:bg-cultural/10",
          fill: "hover:fill-cultural",
        };
      case "cultural":
        return {
          accent: "bg-cultural",
          text: "text-cultural",
          group_hover_text : "group-hover:text-cultural",
          border: "border-cultural/20",
          hover: "hover:bg-cultural/10",
          fill: "hover:fill-cultural",
        };
      case "academic":
        return {
          accent: "bg-academic",
          text: "text-academic",
          group_hover_text : "group-hover:text-academic",
          border: "border-academic/20",
          hover: "hover:bg-academic/10",
          fill: "hover:fill-academic",
        };
      case "professional":
        return {
          accent: "bg-primary",
          text: "text-primary",
          group_hover_text : "group-hover:text-club-primary",
          border: "border-primary/20",
          hover: "hover:bg-primary/10",
          fill: "hover:fill-primary",
        };
      case "religious":
        return {
          accent: "bg-technology",
          text: "text-technology",
          group_hover_text : "group-hover:text-technology",
          border: "border-technology/20",
          hover: "hover:bg-technology/10",
          fill: "hover:fill-technology",
        };
      case "community":
        return {
          accent: "bg-error-secondary",
          text: "text-error-secondary",
          group_hover_text : "group-hover:text-error-secondary",
          border: "border-error-secondary",
          hover: "hover:bg-error-secondary/10",
          fill: "hover:fill-error-secondary",
        };
        case "sports" : 
        return {
          accent: "bg-sports",
          text: "text-sports",
          group_hover_text : "group-hover:text-sports/5",
          border: "border-sports",
          hover: "hover:bg-sports/10",
          fill: "hover:fill-sports",
        };
      default:
        return {
          accent: "bg-sports",
          text: "text-primary",
          border: "border-primary/20",
          hover: "hover:bg-primary/10",
          group_hover_text : "group-hover:text-primary",
          fill: "hover:fill-primary",
        };
    }
  };

  useMemo(()=>{
    fetchClubs();
    return () => setClubs([]);
    } , []);

  return (
    <div className="font-all min-h-[100vh] dark:bg-charcoal -z-30 pb-2">
    <Suspense>
      <Navbar getCategoryColors={getCategoryColors}/>
      <Eventcarousel clubs={clubs} getCategoryColors={getCategoryColors}/>
      <Clubcards clubs={clubs} getCategoryColors={getCategoryColors} isFetching={isFetching}/>
    </Suspense>
    </div>
  );
};

export default Home;
