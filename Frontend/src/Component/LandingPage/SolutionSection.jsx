import React from "react";
import Time from "../../Images/Time.jpg";
import Rating from "../../Images/Rating.jpg";
import handShake from "../../Images/handShake.jpg";
import { FaLink, FaClock, FaStar } from "react-icons/fa";

const cards = [
  {
    img: handShake,
    tag: "Easy Connection",
    icon: <FaLink size={10} />,
    title: "Connect with Partners",
    desc: "Easy connection to trusted IT and construction companies through our user-friendly platform.",
  },
  {
    img: Time,
    tag: "Efficiency",
    icon: <FaClock size={10} />,
    title: "Time & Cost Savings",
    desc: "Save time and reduce costs by comparing ratings and hiring reliable partners quickly.",
    center: true,
  },
  {
    img: Rating,
    tag: "Reviews",
    icon: <FaStar size={10} />,
    title: "Ratings & Reviews",
    desc: "Access genuine ratings and reviews to make informed decisions when selecting partners.",
  },
];

function SolutionSection() {
  return (
    <div className="mb-5 px-6 py-10">
      {/* Header */}
      <div className="text-center mb-10 animate-[fadeUp_0.7s_ease_both]">
        <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-[#0c2b78]">
          Our <span className="font-semibold">Solutions</span>
        </h2>
        <div className="mt-2 mx-auto h-[3px] w-10 bg-orange-400 rounded-full" />
        <p className="text-gray-400 mt-3 text-sm font-light">
          Discover the services that connect IT and construction professionals.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-3 gap-4 items-end">
        {cards.map(({ img, tag, icon, title, desc, center }, i) => (
          <div
            key={i}
            className={`group relative overflow-hidden rounded-md cursor-pointer
              ${center ? "h-[400px]" : "h-[340px]"}
              animate-[fadeUp_0.8s_ease_both]`}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${img})` }}
            />

            {/* Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#060f24]/92 via-[#060f24]/40 to-transparent
              transition-all duration-350 group-hover:from-[#060f24]/96 group-hover:via-[#060f24]/55"
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6 gap-2.5">
              {/* Tag pill */}
              <div
                className="inline-flex items-center gap-1.5 w-fit
                bg-orange-400/20 border border-orange-400/50 text-orange-400
                text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 rounded-full"
              >
                {icon}
                {tag}
              </div>

              {/* Title */}
              <h3
                className={`font-['Cormorant_Garamond'] font-semibold text-white leading-tight
                ${center ? "text-3xl" : "text-2xl"}`}
              >
                {title}
              </h3>

              {/* Accent line */}
              <div className="h-[2px] bg-orange-400 w-0 group-hover:w-9 transition-all duration-400 rounded-full" />

              {/* Description — reveals on hover */}
              <p
                className="text-[13px] font-light text-white/65 leading-relaxed
                max-h-0 overflow-hidden opacity-0
                group-hover:max-h-24 group-hover:opacity-100
                transition-all duration-400"
              >
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SolutionSection;
