import React from "react";
import HeroSectionImg from "../../Images/scott-blake-x-ghf9LjrVg-unsplash.jpg";
import { useNavigate } from "react-router-dom";
import { FaBuilding } from "react-icons/fa";

function HeroSection() {
  const Navigate = useNavigate();

  return (
    <div className="relative w-full h-[420px] sm:h-[600px] flex items-center overflow-hidden">
      <img
        src={HeroSectionImg}
        className="absolute w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#060f24]/90 via-[#0c2b78]/75 to-transparent" />

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 100px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 100px)
          `,
        }}
      />

      <div className="relative z-10 max-w-2xl px-8 sm:px-16 space-y-6">
        <div
          className="inline-flex items-center gap-2 bg-orange-400/15 border border-orange-400/40
            text-orange-400 text-[11px] font-medium tracking-widest uppercase px-3 py-1.5
            rounded-full animate-[heroBadge_0.7s_ease_both]"
        >
          <FaBuilding size={11} />
          Trusted Network
        </div>

        <h1
          className="font-['Cormorant_Garamond'] text-5xl sm:text-6xl font-light text-white
            leading-tight animate-[heroFadeUp_0.8s_0.15s_ease_both]"
        >
          Connect with
          <br />
          <span className="font-semibold">Trusted Companies</span>
        </h1>

        <p
          className="text-[15px] font-light text-white/60 leading-relaxed
            animate-[heroFadeUp_0.8s_0.3s_ease_both]"
        >
          Find reliable partners, compare ratings,
          <br />
          and get your project done faster.
        </p>

        <div className="flex gap-3 animate-[heroFadeUp_0.8s_0.45s_ease_both]">
          <button
            onClick={() => Navigate("SignUp")}
            className="bg-white text-[#0c2b78] px-7 py-3 rounded-sm text-sm font-semibold
              transition-all duration-250 hover:bg-[#0c2b78] hover:text-white
              hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            Get Started
          </button>
          <button
            className="border border-white/35 text-white/85 px-7 py-3 rounded-sm text-sm font-medium
              transition-all duration-250 hover:bg-white/10 hover:border-white/60
              hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
