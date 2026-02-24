import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const imageRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // TEXT ANIMATION
            gsap.fromTo(
                textRef.current,
                { x: -120, opacity: 0 },
                { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
            );

            // IMAGE ENTRY (NO vertical movement now)
            gsap.fromTo(
                imageRef.current,
                { x: 120, rotate: 12, opacity: 0 },
                { x: 0, rotate: 6, opacity: 1, duration: 1.2, ease: "power3.out" }
            );

            // STATS ANIMATION
            gsap.from(".stat", {
                opacity: 0,
                y: 30,
                stagger: 0.2,
                duration: 1,
                delay: 0.5,
            });

            // SCROLL ANIMATION (SMOOTH, NO DIP)
            gsap.to(imageRef.current, {
                y: 80,
                scale: 1.1,
                rotate: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: "top 80%",
                    end: "bottom top",
                    scrub: true,
                },
            });

        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="h-screen w-full bg-black text-white flex items-center justify-between px-20 overflow-hidden">

            {/* LEFT */}
            <div ref={textRef} className="z-20 w-1/2">

                <h1 className="text-6xl font-bold tracking-[0.25rem] leading-tight">
                    W E L C O M E <br /> I T Z F I Z Z
                </h1>

                {/* STATS */}
                <div className="flex gap-12 mt-10 text-lg">

                    <div className="stat">
                        <p className="text-2xl font-semibold">200+</p>
                        <p className="opacity-60">Happy Clients</p>
                    </div>

                    <div className="stat">
                        <p className="text-2xl font-semibold">350+</p>
                        <p className="opacity-60">Projects Completed</p>
                    </div>

                    <div className="stat">
                        <p className="text-2xl font-semibold">8+</p>
                        <p className="opacity-60">Years Experience</p>
                    </div>

                    <div className="stat">
                        <p className="text-2xl font-semibold">99%</p>
                        <p className="opacity-60">Success Rate</p>
                    </div>

                </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-1/2 flex justify-center">
                <img
                    ref={imageRef}
                    src="https://picsum.photos/500/300"
                    alt="visual"
                    className="w-[420px] -translate-y-10 rotate-6 rounded-xl shadow-2xl"
                />
            </div>

        </div>
    );
}