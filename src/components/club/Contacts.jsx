import React, { useEffect, useState } from "react";

const Contacts = ({ club }) => {
const [contacts , setContacts] = useState([]);

const getContacts = async () =>{
  if(!sessionStorage.getItem(`contacts_${club.clubId}`)){
    const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/v1/clubs/contacts/find?clubId=${club.clubId}`);
    const data = await response.json();
    setContacts(data);
    sessionStorage.setItem(`contacts_${club.clubId}` , JSON.stringify(data));
  }
  else{
    setContacts(JSON.parse(sessionStorage.getItem(`contacts_${club.clubId}`)));
  }

}
  function getMethodLink(method){
    return contacts?.find((contact)=> (contact.method === method))?.link ;
  } 

  const contactMethods = [
        {
          category: "Facebook",
          subtext: "Follow our facebook page for updated news",
          lebel: "Follow our page",
          logo: (
            <svg
              className="fill-contact-facebook md:h-20 h-16 md:w-20 w-16 -z-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z" />
            </svg>
          ),
          theme: "border-contact-facebook hover:bg-contact-facebook/10",
        },
        {
          category: "Email",
          subtext: "Email us for any query",
          lebel: "Email us",
          link: "",
          logo: (
            <svg
              className="fill-contact-email md:h-20 h-16 md:w-20 w-16 -z-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M125.4 128C91.5 128 64 155.5 64 189.4C64 190.3 64 191.1 64.1 192L64 192L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 192L575.9 192C575.9 191.1 576 190.3 576 189.4C576 155.5 548.5 128 514.6 128L125.4 128zM528 256.3L528 448C528 456.8 520.8 464 512 464L128 464C119.2 464 112 456.8 112 448L112 256.3L266.8 373.7C298.2 397.6 341.7 397.6 373.2 373.7L528 256.3zM112 189.4C112 182 118 176 125.4 176L514.6 176C522 176 528 182 528 189.4C528 193.6 526 197.6 522.7 200.1L344.2 335.5C329.9 346.3 310.1 346.3 295.8 335.5L117.3 200.1C114 197.6 112 193.6 112 189.4z" />
            </svg>
          ),
          theme: "border-contact-email hover:bg-contact-email/10",
        },
        {
          category: "Form",
          subtext: "Fill the form to join our club",
          lebel: "Fill up the form",
          link: "Form link to join",
          logo: (
            <svg
              className="fill-contact-form md:h-20 h-16 md:w-20 w-16 -z-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M128 512C128 547.3 156.7 576 192 576L341.5 576C358.5 576 374.8 569.3 386.8 557.3L493.3 450.7C505.3 438.7 512 422.4 512 405.4L512 128C512 92.7 483.3 64 448 64L192 64C156.7 64 128 92.7 128 128L128 512zM336 517.5L336 424C336 410.7 346.7 400 360 400L453.5 400L336 517.5zM281 169L233 217C223.6 226.4 208.4 226.4 199.1 217C189.8 207.6 189.7 192.4 199.1 183.1L247.1 135.1C256.5 125.7 271.7 125.7 281 135.1C290.3 144.5 290.4 159.7 281 169zM377 201L265 313C255.6 322.4 240.4 322.4 231.1 313C221.8 303.6 221.7 288.4 231.1 279.1L343 167C352.4 157.6 367.6 157.6 376.9 167C386.2 176.4 386.3 191.6 376.9 200.9z" />
            </svg>
          ),
          theme: "border-contact-form hover:bg-contact-form/10",
        },
  ];

  useEffect(()=>{
    getContacts();
  } , []);

  return (
    <div className="space-x-4 md:space-y-6">
      <div className="text-center md:mb-8 mb-4">
        <h2 className="font-header text-charcoal dark:text-white text-4xl md:text-5xl font-bold md:mb-4 mb-3">Contact Us</h2>
        <p className="text-text-secondary dark:text-text-secondary-dark md:text-lg text-sm max-w-[95%] md:max-w-2xl mx-auto">
          Join our club through various ways
        </p>
      </div>
      {contacts && contacts.length > 0 ? (
        <div className="grid grid-1 md:grid-cols-3 gap-3 md:gap-8">
          {contactMethods?.map((method, idx) => (
            <div
              key={`${method.category}-${idx}`}
              className="bg-white dark:bg-charcoal-card dark:hover:bg-background-secondary/5 md:rounded-lg rounded-md shadow-md md:p-6 p-4 hover:shadow-lg hover:scale-102 transition-all duration-150 ease-in-out"
            >
              <div className="flex flex-col items-start justify-between mb-4 relative">
                <div className="space-x-2">
                  {method.logo}
                  <h3 className="text-xl font-semibold text-text dark:text-white mb-2">
                    {method.category}
                  </h3>
                </div>
                <p className="absolute right-0 top-0 text-text-secondary dark:text-text-secondary-dark text-sm">{club.shortName}</p>
                {method.subtext ? (
                  <p className="text-sm md:text-md text-text-secondary dark:text-text-secondary-dark mb-3">
                    {method.subtext}
                  </p>
                ) : null}

                <a
                  href={getMethodLink(method.category)}
                  target="_blank"
                  className={`${method.theme} text-center dark:text-white cursor-pointer px-4 py-2 w-full rounded-lg font-medium transition-all duration-300 border hover:scale-105`}
                >
                  {method.lebel}
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-text-secondary dark:text-text-secondary-dark text-2xl text-center font-bold">
          No contact details yet
        </div>
      )}
    </div>
  );
};

export default Contacts;
