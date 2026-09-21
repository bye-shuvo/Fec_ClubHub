import { useEffect, useState } from "react";

const Testimonials = ({ club }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [members, setMembers] = useState([]);

  //Getting member ids from each testimonials

  const getMembers = async (data) => {
    let memberIds = [];
    data.map((testimonial) => {
      memberIds.push(testimonial.memberId);
    });
    const member_response = await fetch(
      `${import.meta.env.VITE_BACKEND_SERVER_URL}/v1/clubs/committee/search`,
      {
        method: "POST",
        body: JSON.stringify({ ids: memberIds }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const member_data = await member_response.json();
    setMembers(member_data);
          sessionStorage.setItem(
        `testimonial_members_${club.shortName}`,
        JSON.stringify(member_data)
      );
      console.log(member_data);
  };

  //Route for finding testimonials

  const getTestimonials = async () => {
    if (!sessionStorage.getItem(`testimonial_${club.shortName}`)) {
      const testimonial_response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/v1/clubs/testimonials/find?clubId=${club.clubId}`
      );
      const testimonial_data = await testimonial_response.json();
      setTestimonials(testimonial_data);

      getMembers(testimonial_data);

      sessionStorage.setItem(
        `testimonial_${club.shortName}`,
        JSON.stringify(testimonial_data)
      );
    } else {
      setTestimonials(
        JSON.parse(sessionStorage.getItem(`testimonial_${club.shortName}`))
      );
      setMembers(
        JSON.parse(sessionStorage.getItem(`testimonial_members_${club.shortName}`))
      );
    }
  };

  const findMember = (memberId) =>{
    return members.find((member) => member.id === memberId);
  }

  useEffect(() => {
    getTestimonials();
  }, []);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="text-center md:mb-8">
        <h2 className="font-header md:text-5xl text-3xl font-bold text-charcoal dark:text-white mb-4">
          Member Testimonials
        </h2>
        <p className="md:text-lg text-sm text-text-secondary dark:text-text-secondary-dark max-w-[95%] md:max-w-2xl mx-auto">
          Hear from our members about their experiences and how FECRIC has
          impacted their journey.
        </p>
      </div>
      {testimonials && testimonials.length > 0 && members && members.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => {
            const member = findMember(testimonial.memberId);
            return <div
              key={testimonial.id}
              className="bg-white dark:bg-charcoal-card dark:hover:bg-background-secondary/5 md:rounded-lg rounded-md shadow-md p-4 hover:shadow-lg hover:scale-102 transition-all duration-150 ease-in-out"
            >
              <div className="text-center mb-3">
                <img
                  src={member?.avatarUrl}
                  alt={member?.name}
                  className="md:w-20 md:h-20 h-18 w-18 rounded-full mx-auto mb-2"
                />
                <h3 className="text-lg font-semibold text-charcoal dark:text-white">
                  {member?.name}
                </h3>
                <p className="text-blue-600 font-medium md:text-md text-sm">
                  {testimonial.member_type}
                </p>
              </div>
              <blockquote className="text-text-secondary dark:text-text-secondary-dark italic text-center text-[0.9rem] leading-6">
                "{testimonial.message}"
              </blockquote>
            </div>
})}
        </div>
      ) : (
        <div className="mx-auto font-bold text-xl md:text-2xl text-text-secondary dark:text-text-secondary-dark text-center">
          No testimonial to show yet
        </div>
      )}
    </div>
  );
};

export default Testimonials;
