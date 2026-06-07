import React from "react";
import {
  FaTwitter,
  FaYoutube,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";

const links = {
  Company: ["About Us", "How It Works", "Our Solutions", "Careers"],
  Platform: [
    "Post a Project",
    "Browse Companies",
    "Ratings & Reviews",
    "Pricing",
  ],
  Support: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"],
};

const socials = [
  { icon: <FaTwitter size={13} />, label: "Twitter" },
  { icon: <FaYoutube size={13} />, label: "YouTube" },
  { icon: <FaFacebookF size={13} />, label: "Facebook" },
  { icon: <FaLinkedinIn size={13} />, label: "LinkedIn" },
];

function Footer() {
  return (
    <footer
      className="relative overflow-hidden  m-5
      bg-gradient-to-br from-[#060f24] via-[#0c2b78] to-[#1a3a6e]"
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 60px),
            repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 60px)
          `,
        }}
      />

      {/* Top section */}
      <div
        className="relative z-10 grid grid-cols-4 gap-8 px-12 pt-12 pb-8
        animate-[fadeUp_0.7s_ease_both]"
      >
        {/* Brand */}
        <div className="col-span-1">
          <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-white mb-2">
            Link Bridge
          </h3>
          <p className="text-xs font-light text-white/40 leading-relaxed mb-5">
            Connecting trusted IT and construction
            <br />
            professionals. Build faster, smarter.
          </p>

          {/* Socials */}
          <div className="flex gap-2.5">
            {socials.map(({ icon, label }) => (
              <a
                key={label}
                aria-label={label}
                className="w-8 h-8 rounded-full flex items-center justify-center
                  bg-white/[0.06] border border-white/15 text-white/60
                  transition-all duration-250 cursor-pointer
                  hover:bg-orange-400/20 hover:border-orange-400/50
                  hover:text-orange-400 hover:-translate-y-0.5"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([heading, items]) => (
          <div key={heading}>
            <h4
              className="text-[10px] font-medium tracking-[2px] uppercase
              text-orange-400 mb-4"
            >
              {heading}
            </h4>
            <ul className="flex flex-col gap-2">
              {items.map((item) => (
                <li key={item}>
                  <a
                    className="text-[13px] font-light text-white/50 cursor-pointer
                    transition-all duration-200 block
                    hover:text-white hover:pl-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative z-10 h-px bg-white/[0.08] mx-12" />

      {/* Bottom bar */}
      <div className="relative z-10 flex items-center justify-between px-12 py-5">
        <p className="text-[11px] font-light text-white/30">
          © {new Date().getFullYear()} Link Bridge — All rights reserved
        </p>
        <span className="text-[11px] font-light text-white/20">
          Built for construction & IT professionals
        </span>
      </div>
    </footer>
  );
}

export default Footer;
