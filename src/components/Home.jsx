import Clubcards from "./Clubcards";
import Eventcarousel from "./Eventcarousel";
import Navbar from "./Navbar";

const Home = () => {
  const clubs = [
    {
      clubId : 1 ,
      name: "IEEE FEC Student Branch",
      shortName: "IEEE",
      motto: "Advancing Technology for Humanity",
      description:
        "The IEEE FEC Student Branch empowers students to explore electrical engineering, electronics, and computer science through hands-on projects, workshops, and networking opportunities. We bridge the gap between academic learning and real-world applications.",
      logo: "https://i.ibb.co.com/zVjGkQ1S/ieee.png",
      banner : "" ,
      category: "academic",
    },
    {
      clubId : 2 ,
      name: "Software Development Club",
      shortName: "FECSDC",
      motto: "Code, Create, Innovate",
      description:
        "FECSDC is a dynamic community of passionate developers who learn, build, and grow together. We focus on modern software development practices, emerging technologies, and collaborative projects that solve real-world problems.",
      logo: "https://i.ibb.co.com/C3dbgvRx/473675024-122133122600561287-3853052668712556307-n.jpg",
      banner : "" ,
      category: "technology",
    },
    {
      clubId : 3 ,
      name: "Research And Innovation Center",
      shortName: "FECRIC",
      motto: "Innovation Through Research",
      description:
        "FECRIC fosters a culture of research and innovation, encouraging students to explore cutting-edge technologies, conduct meaningful research, and develop innovative solutions that address global challenges.",
      logo: "https://i.ibb.co.com/ffVZZyG/fecric.jpg",
      banner : "" ,
      category: "innovation",
    },
    {
      clubId : 4 ,
      name: "Islamic Research & Dawah Centre",
      shortName: "FECRRDC",
      motto: "Knowledge, Faith, and Service",
      description:
        "FECRRDC promotes Islamic values, research, and community service. We organize educational programs, research initiatives, and community outreach activities to foster understanding and positive social change.",
      logo: "https://i.ibb.co.com/fVMZ71ct/fecirdc.jpg",
      banner : "" ,
      category: "religious",
    },
    {
      clubId : 5 ,
      name: "Programming Club",
      shortName: "FECPC",
      motto: "Think, Code, Solve",
      description:
        "FECPC is dedicated to developing programming skills through competitive coding, algorithm challenges, and collaborative projects. We prepare students for technical interviews and real-world programming challenges.",
      logo: "https://i.ibb.co.com/fGzjmQDV/fecprogrammingclub.jpg",
      banner : "" ,
      category: "technology",
    },
    {
      clubId : 6 ,
      name: "Rover Scout",
      shortName: "FECRSG",
      motto: "Be Prepared, Serve Others",
      description:
        "FECRSG instills leadership, outdoor skills, and community service values. Through scouting activities, we develop responsible citizens who contribute positively to society and protect our environment.",
      logo: "https://i.ibb.co.com/8Dcf8kLz/fecroverscout.jpg",
      banner : "" ,
      category: "community",
    },
    {
      clubId : 7 ,
      name: "FECSA",
      shortName: "FECSA",
      motto: "Excellence in Sports and Athletics",
      description:
        "FECSA promotes physical fitness, sportsmanship, and athletic excellence. We organize sports events, tournaments, and fitness programs to encourage healthy lifestyles and team spirit among students.",
      logo: "https://i.ibb.co.com/PkCs1pT/fecsa.jpg",
      banner : "" ,
      category: "sports",
    },
    {
      clubId : 8 ,
      name: "Photographic Club",
      shortName: "FECPC",
      motto: "Capture Moments, Share Stories",
      description:
        "FECPC celebrates the art of photography and visual storytelling. We explore various photography techniques, organize photo walks, and showcase student creativity through exhibitions and competitions.",
      logo: "https://i.ibb.co.com/Gvz6BVSM/fecpc.jpg",
      banner : "" ,
      category: "creative",
    },
    {
      clubId : 9 ,
      name: "Debate Forum",
      shortName: "FECDF",
      motto: "Voice Your Ideas, Respect Others",
      description:
        "FECDF cultivates critical thinking, public speaking, and respectful discourse. Through debates, discussions, and public speaking events, we develop confident communicators and informed citizens.",
      logo: "https://i.ibb.co.com/ZzsHyHFr/debateclub.jpg",
      banner : "" ,
      category: "academic",
    },
    {
      clubId : 10 ,
      name: "Club of Art And Culture",
      shortName: "FECCAC",
      motto: "Celebrating Diversity Through Art",
      description:
        "FECCAC promotes cultural awareness and artistic expression. We organize cultural events, art exhibitions, and performances that showcase the rich diversity of our community and foster cultural understanding.",
      logo: "https://i.ibb.co.com/ymXJ56fj/culturalclub.jpg",
      banner : "" ,
      category: "cultural",
    },
    {
      clubId : 11 ,
      name: "Sopno Sharothi",
      shortName: "FECSS",
      motto: "Dreams and Aspirations Together",
      description:
        "FECSS is a community service organization that works towards social welfare and community development. We organize charity events, blood donation drives, and support programs for those in need.",
      logo: "https://i.ibb.co.com/1G2f5R8Y/shopnosarothi.jpg",
      banner : "" ,
      category: "community",
    },
    {
      clubId : 12 ,
      name: "FEC Club of Professionals",
      shortName: "FECCP",
      motto: "Building Tomorrow's Leaders",
      description:
        "FECCP focuses on professional development and career readiness. We provide networking opportunities, skill-building workshops, and mentorship programs to prepare students for successful careers.",
      logo: "https://i.ibb.co.com/9kJpd8g6/fecprofessionalclub.jpg",
      banner : "" ,
      category: "professional",
    },
    {
      clubId : 13 ,
      name: "Cyber Protector Club",
      shortName: "FECCPC",
      motto: "Securing the Digital Future",
      description:
        "FECCPC educates students about cybersecurity, ethical hacking, and digital safety. We organize workshops, competitions, and awareness programs to build a more secure digital environment.",
      logo: "https://i.ibb.co.com/TdsL2JW/fecspcjpg.jpg",
      banner : "" ,
      category: "technology",
    },
    {
      clubId : 14 ,
      name: "Red Crescent Youth",
      shortName: "FECRCY",
      motto: "Humanity in Action",
      description:
        "FECRCY promotes humanitarian values and emergency response preparedness. We organize first aid training, disaster relief awareness, and community health programs to serve humanity in times of need.",
      logo: "https://i.ibb.co.com/DfcG7tf9/redcrescent.jpg",
      banner : "" ,
      category: "community",
    },
  ];
  return (
    <div className="font-all min-h-screen -z-30">
      <Navbar />
      <Eventcarousel clubs={clubs} />
      <Clubcards clubs={clubs} />
    </div>
  );
};

export default Home;
