import React from "react";
import learn from "../../Images/learn.jpg";

const steps = [
  {
    num: "01",
    title: "Create an Account",
    desc: "Sign up in seconds and set up your company or personal profile.",
  },
  {
    num: "02",
    title: "Post Your Project",
    desc: "Describe your project, set a budget, and publish it to the network.",
  },
  {
    num: "03",
    title: "Review Bids & Hire",
    desc: "Compare proposals, check ratings, and hire the best partner.",
  },
];

function HowItsWorkSection() {
  return (
    <div
      className="relative overflow-hidden rounded-xl m-5 px-10 py-12
      bg-gradient-to-br from-[#060f24] via-[#0c2b78] to-[#1a3a6e]
      flex flex-col items-center gap-10"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 60px),
            repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 60px)
          `,
        }}
      />

      {/* Header */}
      <div className="relative z-10 text-center animate-[fadeUp_0.7s_ease_both]">
        <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-white">
          How It <span className="font-semibold">Works</span>
        </h2>
        <div className="mt-2 mx-auto h-[3px] w-10 bg-orange-400 rounded-full" />
        <p className="text-white/45 text-sm font-light mt-2">
          Three simple steps to get your project started.
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-12 w-full">
        <div className="flex flex-col gap-3 flex-1 animate-[slideLeft_0.8s_0.2s_ease_both]">
          {steps.map(({ num, title, desc }) => (
            <div
              key={num}
              className="group flex items-center gap-4
                bg-white/[0.04] border border-white/10 border-l-[3px] border-l-transparent
                px-5 py-4 rounded-md cursor-pointer
                transition-all duration-300
                hover:bg-white/[0.09] hover:border-l-orange-400 hover:translate-x-1.5"
            >
              <div
                className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center
                bg-orange-400/15 border border-orange-400/45 text-orange-400
                text-[13px] font-semibold
                transition-all duration-300 group-hover:bg-orange-400/30"
              >
                {num}
              </div>

              {/* Text */}
              <div>
                <h4 className="text-white text-sm font-medium mb-0.5">
                  {title}
                </h4>
                <p className="text-white/45 text-xs font-light leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Image */}
        <div
          className="sm:flex-shrink-0 w-100 rounded-lg overflow-hidden
          border-b-4 border-r-4 border-orange-400
          animate-[slideRight_0.8s_0.35s_ease_both]
          group hidden"
        >
          <img
            src={learn}
            alt="How it works"
            className="w-full sm:block transition-transform duration-500 group-hover:scale-105 hidden"
          />
        </div>
      </div>
    </div>
  );
}

export default HowItsWorkSection;
