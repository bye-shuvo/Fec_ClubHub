import React , { useEffect, useState } from "react";
import Clubcards from "./Clubcards";
import Eventcarousel from "./Eventcarousel";
import Navbar from "./Navbar";

const Home = () => {
  const [clubs , setClubs] = useState([]);
  const fetchClubs = async () => {
    if(sessionStorage.getItem("clubs")){
      setClubs(JSON.parse(sessionStorage.getItem("clubs")));
    }
    else{
      const response = await fetch("http://localhost:3001/v1/clubs");
      const data = await response.json();
      console.log(data);
      setClubs(data);
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
          accent: "bg-club-accent",
          text: "text-club-accent",
          group_hover_text : "group-hover:text-club-accent",
          border: "border-club-accent/20",
          hover: "hover:bg-club-accent/10",
          fill: "hover:fill-club-accent",
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
      default:
        return {
          accent: "bg-primary",
          text: "text-primary",
          border: "border-primary/20",
          hover: "hover:bg-primary/10",
          fill: "hover:fill-primary",
        };
    }
  };

  useEffect(()=>{
    fetchClubs();
    return () => setClubs([]);
    } , []);

  return (
    <div className="font-all min-h-[100vh] dark:bg-charcoal -z-30">
      <Navbar getCategoryColors={getCategoryColors}/>
      <Eventcarousel clubs={clubs} getCategoryColors={getCategoryColors} />
      <Clubcards clubs={clubs} getCategoryColors={getCategoryColors}/>
    </div>
  );
};

export default Home;
