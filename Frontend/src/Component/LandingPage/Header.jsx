function Header() {
  const HeaderText = "text-[#0c2b78] mx-4 cursor-pointer hover:text-[#0c2b78]";

  return (
    <>
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center h-18 z-8 bg-linear-to-r from-slate-900 to-blue-900 px-6 ">
        <div className="font-bold text-2xl text-white"> LinkBridge</div>
      </div>
      <div className="shadow-2xl bg-white flex justify-center items-center h-16 [clip-path:polygon(10%_0,100%_0,100%_10%,100%_100%,0_100%,0%_100%)] absolute top-10 z-10 right-16 left-90 ">
        <div className={HeaderText}>About</div>
        <div className={HeaderText}>Services</div>
        <div className={HeaderText}>Contact</div>
        <div className={HeaderText}>Blog</div>
      </div>
    </>
  );
}
export default Header;
