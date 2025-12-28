import time from "../../assets/time.svg";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Items } from "../../Constants/ProgramData";
import { useNavigate } from "react-router-dom";

export function UpcomingEvents() {

    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate()

    const scrollToIndex = (index) => {
        const carousel = carouselRef.current;
        if (carousel) {
            const child = carousel.children[index];
            if (child) {
                carousel.scrollTo({
                    left: child.offsetLeft,
                    behavior: "smooth",
                });
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % Items.length;
            setCurrentIndex(nextIndex);
            scrollToIndex(nextIndex);
        }, 4000); 

        return () => clearInterval(interval);
    }, [currentIndex, Items.length]);

    return (
        <div className="flex items-center justify-center w-full py-12">
            <div className="flex flex-col items-start justify-center w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-2 gap-6">

                {/* === Upcoming Events Section === */}
                <div className="flex flex-col w-full gap-4">
                    <div className="flex items-center w-full lg:w-[278px] lg:h-[48px] flex-row">
                        <div className="flex items-center gap-2 w-full lg:w-[250px] lg:h-[28px]">
                            <h5 className=" text-[14px] lg:text-[18px] font-semibold text-white font-momo">
                                UPCOMING PROGRAMS
                            </h5>
                            {/* <img src={time} alt="Time icon" className="w-4 h-4" /> */}
                        </div>
                    </div>

                    {/* === Scrollable Events === */}
                    <div className="w-full overflow-hidden">
                        <motion.div
                            ref={carouselRef}
                            className="flex flex-row gap-6 overflow-x-auto md:overflow-x-hidden scroll-smooth snap-x snap-mandatory"
                            drag="x"
                            dragConstraints={{ left: -300 * (Items.length - 1), right: 0 }}
                        >
                            {Items.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex-shrink-0 flex flex-col overflow-hidden w-full sm:w-[80%] md:w-[45%] lg:w-[30%] snap-start rounded-xl relative"
                                    whileTap={{ cursor: "grabbing" }}
                                >
                                    {/* Background Image */}
                                    <div onClick={() => {navigate(`/programdetails/${item.id}`)} }
                                        className="w-full h-[240px] sm:h-[220px] md:h-[240px] rounded-xl bg-center bg-cover bg-no-repeat cursor-pointer"
                                        style={{
                                            backgroundImage: `url(${item.image})`,
                                        }}
                                    ></div>

                                    {/* Text Section */}
                                    <div className="py-3 px-4 text-left">
                                        <h3 className="font-sans font-semibold text-white text-lg">
                                            {item.Name || "Upcoming Event"}
                                        </h3>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
