const Achievements = ({ club }) => {
  const clubAchievements = [
    {
      id: 1,
      title: "1st Place - National Robotics Competition 2024",
      description:
        "Won the prestigious national robotics competition with our autonomous robot design",
      year: "2024",
      category: "Competition",
      clubId: 3,
    },
    {
      id: 2,
      title: "Best Innovation Award - Tech Expo 2023",
      description:
        "Recognized for developing an innovative IoT-based environmental monitoring system",
      year: "2023",
      category: "Innovation",
      clubId: 3,
    },
    {
      id: 3,
      title: "International Robotics Challenge Finalist",
      description:
        "Qualified for the international robotics challenge representing our country",
      year: "2023",
      category: "International",
      clubId: 3,
    },
    {
      id: 4,
      title: "Community Service Excellence",
      description:
        "Awarded for organizing robotics workshops for underprivileged students",
      year: "2023",
      category: "Community",
      clubId: 3,
    },
  ];
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
      {clubAchievements.some(
        (achievement) => achievement.clubId === club.clubId
      ) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-3">
          {clubAchievements.map(
            (achievement) =>
              achievement.clubId === club.clubId && (
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
              )
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
