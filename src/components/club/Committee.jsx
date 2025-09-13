const Committee = ({ club, colors }) => {
  const clubMembers = [
    {
      id: 1, // unique ID for the member
      clubId: 2, // foreign key linking to clubs table
      name: "Ahmed Hassan", // clearer than just 'name'
      position: "President", // position within the committee
      avatarUrl: "https://via.placeholder.com/60x60/4F46E5/FFFFFF?text=AH", // renamed for clarity
      department: "Computer Engineering", // academic department
      academicSession: "2021-22", // when the member studied
      committeeTerm: "2025-26", // period they serve in committee
      email: "ahmed@example.com", // 🔹 optional but useful for contact
      phone: "+8801XXXXXXXXX", // 🔹 optional, contact number
      joinedDate: "2025-01-10", // 🔹 optional, track when added to committee
    },
    {
      id: 2,
      name: "Fatima Ali",
      position: "Vice President",
      avatarUrl: "https://via.placeholder.com/60x60/7C3AED/FFFFFF?text=FA",
      department: "Electrical Engineering",
      club: "FECRIC",
      clubId: 1,
    },
    {
      id: 3,
      name: "Omar Khalil",
      position: "Secretary",
      avatarUrl: "https://i.ibb.co.com/fGzjmQDV/fecprogrammingclub.jpg",
      department: "Mechanical Engineering",
      clubId: 3,
    },
    {
      id: 4,
      name: "Aisha Rahman",
      position: "Treasurer",
      avatarUrl: "https://via.placeholder.com/60x60/059669/FFFFFF?text=AR",
      department: "Computer Engineering",
      clubId: 2,
    },
    {
      id: 5,
      name: "Yusuf Ibrahim",
      position: "Member",
      avatarUrl: "https://via.placeholder.com/60x60/EA580C/FFFFFF?text=YI",
      department: "Electrical Engineering",
      clubId: 1,
    },
    {
      id: 6,
      name: "Zara Khan",
      position: "Member",
      avatarUrl: "https://via.placeholder.com/60x60/DB2777/FFFFFF?text=ZK",
      department: "Mechanical Engineering",
      clubId: 3,
    },
  ];
  return (
    <div className="md:space-y-6 space-y-4">
      <div className="text-center md:mb-8">
        <h2 className="font-header md:text-5xl text-3xl font-bold text-charcoal dark:text-white mb-4">
          Club Committee
        </h2>
        <p className="md:text-lg text-sm text-text-secondary dark:text-text-secondary-dark max-w-[95%] md:max-w-2xl mx-auto">
          Meet our dedicated team of passionate students and leaders who make
          FECRIC a success.
        </p>
        <p
          className={`md:text-lg text-sm md:max-w-2xl max-w-[95%] ${colors.text} mx-auto font-semibold`}
        >
          Committee of 2025-26
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-3">
        {clubMembers?.map(
          (member) =>
            member.clubId === club.clubId && (
              <div
                key={member.id}
                className="bg-white dark:bg-charcoal-card dark:hover:bg-background-secondary/5 md:rounded-lg rounded-md shadow-md md:p-6 p-4 hover:shadow-lg hover:scale-102 transition-all duration-150 ease-in-out"
              >
                <div className="flex items-center md:space-x-4 space-x-3">
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="md:w-16 md:h-16 h-12 w-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-charcoal dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium md:text-md text-sm">
                      {member.position}
                    </p>
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
