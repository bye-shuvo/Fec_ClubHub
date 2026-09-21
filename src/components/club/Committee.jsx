import { useState, useEffect } from "react";

const Committee = ({ club, colors }) => {
  const [members, setMembers] = useState([]);

  const getClubCommittee = async () => {
    if (!sessionStorage.getItem(`committee_${club.shortName}`)) {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/v1/clubs/committee/find?clubId=${club.clubId}`
      );
      const data = await response.json();
      setMembers(data);
      console.log(data);
      sessionStorage.setItem(
        `committee_${club.shortName}`,
        JSON.stringify(data)
      );
    } else {
      setMembers(
        JSON.parse(sessionStorage.getItem(`committee_${club.shortName}`))
      );
    }
  };

  useEffect(() => {
    getClubCommittee();
  }, []);

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
      {members && members.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-3">
          {members?.map((member) => 
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
          )}
        </div>
      ) : (
        <div className="md:text-2xl text-xl font-bold text-text-secondary text-center">
          No committee members to show yet
        </div>
      )}
    </div>
  );
};

export default Committee;
