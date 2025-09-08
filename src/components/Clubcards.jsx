import { Link } from "react-router-dom";
const Clubcards = ({clubs , getCategoryColors}) => {

  return (
    <div
      id="club-cards"
      className="flex flex-col items-center w-full h-auto overflow-hidden bg-background-secondary dark:bg-charcoal py-12"
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="font-header text-6xl font-bold text-text dark:text-white mb-4">Our Clubs</h2>
        <p className="text-xl text-text-secondary dark:text-text-secondary-dark max-w-2xl mx-auto">
          Discover amazing opportunities to learn, grow, and connect with
          like-minded students
        </p>
      </div>

      {/* Club Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[90%] mx-auto px-4">
        {clubs.map((club, index) => {
          const colors = getCategoryColors(club.category);
          return (
            <div
              key={index}
              className="group bg-white dark:bg-charcoal-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-border dark:border-charcoal-card/90 dark:hover:bg-background-secondary/5  overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  className="h-48 w-full object-center object-cover transition-transform duration-500 group-hover:scale-105"
                  src={club.logo}
                  alt={`${club.name} logo`}
                />
                {/* Category Badge */}
                <div
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${colors.accent} shadow-lg`}
                >
                  {club.category}
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold text-text dark:text-white mb-3 group-hover:${colors.text} transition-colors duration-300`}>
                  {club.name}
                </h3>
                <p className="text-text-secondary dark:text-text-secondary-dark text-sm leading-relaxed mb-4 line-clamp-3">
                  {club.motto}
                </p>

                {/* Action Button */}
                <div className="flex justify-between items-center">
                  <Link
                    to={`/clubs/${club.shortName}`}
                    state={{club : club , colors : colors}}
                    className={`${colors.text} ${colors.hover} text-center cursor-pointer px-4 py-2 w-full rounded-lg font-medium transition-all duration-300 border ${colors.border} hover:scale-105 hover:shadow-md`}
                  >
                    Visit Club
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Clubcards;
