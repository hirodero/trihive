"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };
  return (
    (
    <div className="rounded-xl  mx-auto max-w-sm px-4 py-10 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="relative flex  h-80 w-full mr-80">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial?.Username}
                  initial={{
                    opacity: 0,
                    scale: 1,
                    z: -100
                    // rotate: randomRotateY()
                    
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 20
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 0,
                    rotate: randomRotateY()
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute flex items-center justify-center inset-0 origin-bottom">

                  <div className="w-[200px] h-[200px]  items-center rounded-xl overflow-hidden shadow-md">
                    <img
                      src={testimonial?.UserPicture}
                      alt={testimonial?.Username}
                      // width={500}
                      // height={500}
                      className="w-full h-full rounded-xl object-cover "
                    />
                  </div>
  
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-10">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}>
            <h3 className="text-3xl font-bold dark:text-white text-white">
              {testimonials[active]?.Username}
            </h3>
            <p className="text-2xl text-gray-100 dark:text-neutral-500">
              Top {active+1}
            </p>
            <p className="text-3xl text-gray-100 font-bold mt-8 dark:text-neutral-300">
              {testimonials[active]?.UserScore}pts
            </p>
            {/* <motion.p className="text-lg text-gray-100 mt-8 dark:text-neutral-300">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block">
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p> */}
          </motion.div>
          <div className="flex  gap-4 pt-12 md:pt-0 z-30 relative">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button z-50"
            >
              <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button z-50"
            >
              <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>)
  );
};
