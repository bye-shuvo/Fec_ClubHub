const Committee = ({ club , colors }) => {
  const clubMembers = [
    {
      id: 1,
      name: "Ahmed Hassan",
      role: "President",
      image: "https://via.placeholder.com/60x60/4F46E5/FFFFFF?text=AH",
      department: "Computer Engineering",
      clubId: 2,
    },
    {
      id: 2,
      name: "Fatima Ali",
      role: "Vice President",
      image: "https://via.placeholder.com/60x60/7C3AED/FFFFFF?text=FA",
      department: "Electrical Engineering",
      club: "FECRIC",
      clubId: 1,
    },
    {
      id: 3,
      name: "Omar Khalil",
      role: "Secretary",
      image: "https://via.placeholder.com/60x60/DC2626/FFFFFF?text=OK",
      department: "Mechanical Engineering",
      clubId: 3,
    },
    {
      id: 4,
      name: "Aisha Rahman",
      role: "Treasurer",
      image: "https://via.placeholder.com/60x60/059669/FFFFFF?text=AR",
      department: "Computer Engineering",
      clubId: 2,
    },
    {
      id: 5,
      name: "Yusuf Ibrahim",
      role: "Member",
      image: "https://via.placeholder.com/60x60/EA580C/FFFFFF?text=YI",
      department: "Electrical Engineering",
      clubId: 1,
    },
    {
      id: 6,
      name: "Zara Khan",
      role: "Member",
      image: "https://via.placeholder.com/60x60/DB2777/FFFFFF?text=ZK",
      department: "Mechanical Engineering",
      clubId: 3,
    },
  ];
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-header text-5xl font-bold text-charcoal dark:text-white mb-4">Club Committee</h2>
        <p className="text-lg text-text-secondary dark:text-text-secondary-dark max-w-2xl mx-auto">
          Meet our dedicated team of passionate students and leaders who make
          FECRIC a success.
        </p>
        <p className={`text-lg max-w-2xl ${colors.text} mx-auto font-semibold`}>Committee of 2025-26</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubMembers.map(
          (member) =>
            member.clubId === club.clubId && (
              <div
                key={member.id}
                className="bg-white dark:bg-charcoal-card dark:hover:bg-background-secondary/5 rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-102 transition-all duration-150 ease-in-out"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-charcoal dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium">{member.role}</p>
                    <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
                      {member.department}
                    </p>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Committee;
