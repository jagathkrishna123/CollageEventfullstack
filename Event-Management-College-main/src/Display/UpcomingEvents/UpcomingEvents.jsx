import time from "../../assets/time.svg";
import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { Items } from "../../Constants/ProgramData";
import { useNavigate } from "react-router-dom";

export function UpcomingEvents() {

    const carouselRef = useRef(null);
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const navigate = useNavigate();

    // Create duplicated items for seamless looping
    const duplicatedItems = [...Items, ...Items];

    // Pause auto-scroll when user interacts
    const handleUserInteraction = useCallback(() => {
        setIsUserInteracting(true);
        // Resume auto-scroll after 3 seconds of inactivity
        setTimeout(() => {
            setIsUserInteracting(false);
        }, 3000);
    }, []);

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const scrollSpeed = 1.5; // Increased speed for faster auto-scrolling

        const animate = () => {
            if (carousel && !isUserInteracting) {
                carousel.scrollLeft += scrollSpeed;

                // Reset to beginning when reaching halfway through duplicated items
                if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
                    carousel.scrollLeft = 0;
                }
            }
        };

        const intervalId = setInterval(animate, 40); // Slightly faster animation interval

        return () => clearInterval(intervalId);
    }, [isUserInteracting]);

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
                        <div
                            ref={carouselRef}
                            className="flex flex-row gap-6 overflow-x-auto scroll-smooth cursor-grab active:cursor-grabbing"
                            style={{ scrollBehavior: 'smooth' }}
                            onScroll={handleUserInteraction}
                            onMouseDown={handleUserInteraction}
                            onTouchStart={handleUserInteraction}
                            onWheel={handleUserInteraction}
                        >
                            {duplicatedItems.map((item, index) => (
                                <div
                                    key={`${item.id}-${index}`}
                                    className="flex-shrink-0 flex flex-col overflow-hidden w-full sm:w-[80%] md:w-[45%] lg:w-[30%] rounded-xl relative"
                                >
                                    {/* Background Image */}
                                    <div
                                        onClick={() => {navigate(`/programdetails/${item.id}`)} }
                                        className="w-full h-[240px] sm:h-[220px] md:h-[240px] rounded-xl bg-center bg-cover bg-no-repeat cursor-pointer hover:scale-105 transition-transform duration-300"
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
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
