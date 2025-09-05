const Testimonials = ({ club }) => {
  const clubTestimonials = [
    {
      id: 1,
      name: "Ahmed Hassan",
      role: "Club President",
      image: "https://via.placeholder.com/80x80/4F46E5/FFFFFF?text=AH",
      text: "Being part of FECRIC has transformed my perspective on technology. The hands-on experience with robotics and the collaborative environment have been invaluable for my career development.",
      clubId: 1,
    },
    {
      id: 2,
      name: "Fatima Ali",
      role: "Vice President",
      image: "https://via.placeholder.com/80x80/7C3AED/FFFFFF?text=FA",
      text: "The club has given me opportunities to lead projects and work with amazing people. The skills I've learned here are directly applicable to my future career in engineering.",
      clubId: 2,
    },
    {
      id: 3,
      name: "Omar Khalil",
      role: "Secretary",
      image: "https://via.placeholder.com/80x80/DC2626/FFFFFF?text=OK",
      text: "FECRIC is more than just a club - it's a family. The mentorship and support from senior members have helped me grow both technically and personally.",
      clubId: 3,
    },
  ];
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-header text-5xl font-bold text-charcoal dark:text-white mb-4">
          Member Testimonials
        </h2>
        <p className="text-lg text-text-secondary dark:text-text-secondary-dark max-w-2xl mx-auto">
          Hear from our members about their experiences and how FECRIC has
          impacted their journey.
        </p>
      </div>
      {
        clubTestimonials.some((testimonial) => testimonial.clubId === club.clubId) ? (      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {clubTestimonials.map(
          (testimonial) =>
            testimonial.clubId === club.clubId && (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-charcoal-card dark:hover:bg-background-secondary/5 rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-102 transition-all duration-150 ease-in-out"
              >
                <div className="text-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mx-auto mb-3"
                  />
                  <h3 className="text-lg font-semibold text-text-secondary dark:text-text-secondary-dark">
                    {testimonial.name}
                  </h3>
                  <p className="text-blue-600 font-medium">
                    {testimonial.role}
                  </p>
                </div>
                <blockquote className="text-text-secondary dark:text-text-secondary-dark italic text-center">
                  "{testimonial.text}"
                </blockquote>
              </div>
            )
        )}
      </div>) : (
        <div className="mx-auto text-2xl text-text-secondary dark:text-text-secondary-dark text-center">
          No testimonial to show yet
        </div>
      )
      }
    </div>
  );
};

export default Testimonials;
