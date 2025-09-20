const Skeleton = ({ type }) => {
  if (type === "event") {
    return (
      <div className="relative h-[calc(100dvh-4rem)] flex items-center">
        <div className="absolute left-0 md:top-0 top-[35%] w-full lg:w-[40%] xl:w-[40%] h-[60%] lg:h-full z-20 overflow-hidden md:overflow-y-hidden overflow-y-scroll">
          <div className="flex w-full h-full">
            <div className="w-full h-full flex-shrink-0 flex md:items-center items-start pl-[5%] lg:pl-[10%] pr-[5%] lg:pr-2 xl:pl-[8%] ">
              <div className="flex-1 z-10 max-w-full min-h-[95%] flex flex-col items-start justify-center">
                <div className="mb-5 xl:mb-10 lg:mb-8">
                  <span className="inline-block animate-slide-in-left">
                    <p
                      className={`bg-text-secondary/40 dark:bg-text-secondary-dark/40 px-3 md:px-12 md:py-3 py-1 rounded-full md:mb-4 mb-1 animate-pulse`}
                    ></p>
                  </span>
                  <h2 className="animate-slide-in-left">
                    <p className="bg-text-secondary/40 dark:bg-text-secondary-dark/40 px-72 py-10 md:mb-6 mb-3 leading-tight animate-pulse"></p>
                  </h2>
                  <h3 className="text-md mb-3 md:mb-0 animate-slide-in-left-delay">
                    <p className="bg-text-secondary/40 dark:bg-text-secondary-dark/40 px-12 py-3 md:mb-5 mb-2 animate-pulse"></p>
                    <p className="bg-text-secondary/40 dark:bg-text-secondary-dark/40 px-12 py-3 md:mb-10 mb-4 animate-pulse"></p>
                    <p className="bg-text-secondary/40 dark:bg-text-secondary-dark/40 px-12 py-3 animate-pulse"></p>
                  </h3>
                </div>

                <div className="flex items-center space-x-6 animate-slide-in-left-delay-2">
                  <a className="bg-text-secondary/40 dark:bg-text-secondary-dark/40 md:px-15 px-4 md:py-6 py-2 rounded-lg animate-pulse"></a>
                  <a className="bg-text-secondary/40 dark:bg-text-secondary-dark/40 md:px-14 px-4 md:py-3 py-2 rounded-lg animate-pulse"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-0 md:top-0 top-3 w-full lg:w-[60%] xl:w-[60%] h-[30%] lg:h-full z-20 md:overflow-hidden overflow-y-visible">
          <div className="flex items-center w-full h-full transition-transform duration-700 ease-in-out delay-200">
            <div className="w-full h-full flex-shrink-0 flex justify-center items-center relative">
              <div className="relative w-[90%] h-[90%] lg:max-w-[90%] lg:max-h-[65%] animate-scale-in">
                <div className="bg-text-secondary/40 dark:bg-text-secondary-dark/30 flex flex-shrink-0 relative w-full h-full md:rounded-2xl rounded-md overflow-hidden shadow-2xl group animate-pulse">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-text-secondary-dark/20 animate-pulse"></div>
                </div>
                {/* Floating club short name */}
                <div className="absolute -top-4 -right-4 md:px-12 md:py-6 p-1 bg-slate/20 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center animate-float rounded-md"></div>
                {/* Event current status */}
                <div className="absolute overflow-hidden -bottom-4 md:-bottom-6 md:-left-6 -left-2 bg-slate/20 dark:bg-white/10 py-4 lg:py-10 xl:py-10 px-4 lg:px-9 xl:px-10 backdrop-blur-sm rounded-2xl rotate-12 animate-float-delay"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (type === "club") {
    return (
      <div
        id="club-cards"
        className="flex flex-col items-center w-full h-auto overflow-hidden bg-background-secondary dark:bg-charcoal md:py-12 py-0"
      >
        {/* Club Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 gap-5 max-w-[90%] mx-auto px-4">
          {Array.from({length : 8}).map(() => {
            return (
              <div className="bg-text-secondary/40 dark:bg-text-secondary-dark/30 md:rounded-xl rounded-lg shadow-lg overflow-hidden animate-pulse">
                {/* Image Container */}
                <div className="bg-text-secondary/40 dark:bg-text-secondary-dark/30 relative h-[8rem] w-[70vw] md:h-[15rem] md:w-[30rem] overflow-hidden">
                  {/* Category Badge */}
                  <div
                    className={`bg-text-secondary/40 dark:bg-text-secondary-dark/40 absolute top-3 right-[20%] px-10 py-3 rounded-full animate-pulse`}
                  ></div>
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0"></div>
                </div>

                {/* Card Content */}
                <div className="md:p-6 p-4">
                  <h3
                    className={`mb-3 px-10 py-3 bg-text-secondary/40 dark:bg-text-secondary-dark/40 `}
                  ></h3>
                  <p className="bg-text-secondary/40 dark:bg-text-secondary-dark/30 mb-4 px-10 py-2"></p>

                  {/* Action Button */}
                  <div className="flex justify-between items-center w-full">
                    <a
                      className={`py-5 w-full rounded-lg bg-text-secondary/40 dark:bg-text-secondary-dark/30`}
                    ></a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Skeleton;
