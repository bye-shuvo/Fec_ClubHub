import { useState, useEffect } from "react";

const Achievements = ({ club }) => {
  const [acheivements, setAcheivements] = useState([]);

  const getAcheivements = async () => {
    if (!sessionStorage.getItem(`event_${club.shortName}`)) {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/v1/clubs/achievements/search?clubId=${club.clubId}`
      );
      const data = await response.json();
      setAcheivements(data);
      console.log(data);
      sessionStorage.setItem(
        `acheivement_${club.shortName}`,
        JSON.stringify(data)
      );
    } else {
      setAcheivements(
        JSON.parse(sessionStorage.getItem(`acheivement_${club.shortName}`))
      );
    }
  };

  useEffect(() => {
    getAcheivements();
  }, []);

  return (
    <div className="md:space-y-6 space-y-4">
      <div className="text-center md:mb-8">
        <h2 className="font-header md:text-5xl text-3xl font-bold text-charcoal dark:text-white mb-4">
          Club Achievements
        </h2>
        <p className="md:text-lg text-sm text-text-secondary dark:text-text-secondary-dark max-w-[95%] md:max-w-2xl mx-auto">
          Celebrating our milestones and successes that showcase the talent and
          dedication of our members.
        </p>
      </div>
      {acheivements && acheivements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-3">
          {acheivements?.map(
            (achievement) =>
                <div
                  key={achievement.id}
                  className="bg-white dark:bg-charcoal-card dark:hover:bg-background-secondary/5 md:rounded-lg rounded-md shadow-md md:p-6 p-4 hover:shadow-lg hover:scale-102 transition-all duration-150 ease-in-out"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className={`inline-flex items-center md:px-3 px-2 py-1 rounded-full md:text-xs text-[0.7rem] font-medium ${
                        achievement.category === "Competition"
                          ? "bg-blue-100 text-blue-800"
                          : achievement.category === "Innovation"
                          ? "bg-green-100 text-green-800"
                          : achievement.category === "International"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {achievement.category}
                    </span>
                    <span className="text-sm text-text-secondary dark:hover:text-text-secondary-dark">
                      {achievement.year}
                    </span>
                  </div>
                  <h3 className="md:text-xl text-lg font-semibold text-text dark:text-white mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-text-secondary dark:hover:text-text-secondary-dark text-sm md:text-md">
                    {achievement.description}
                  </p>
                </div>
          )}
        </div>
      ) : (
        <div className="md:text-2xl text-xl font-bold text-text-secondary text-center">
          No achievement to show yet
        </div>
      )}
    </div>
  );
};

export default Achievements;
