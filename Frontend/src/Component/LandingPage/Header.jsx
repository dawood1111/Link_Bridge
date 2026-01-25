function Header(){
    const HeaderText="text-white mx-4 cursor-pointer hover:text-gray-300"
    
    return(
        <>
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center h-20 z-8 bg-white px-10 bg-image[]">
             <div className="font-bold text-2xl text-[#0c2b78]"> LinkBridge</div>
            <div>Right Side</div>

        </div>
         <div className="shadow-2xl bg-[#0c2b78] flex justify-center items-center h-16 [clip-path:polygon(10%_0,100%_0,100%_10%,100%_100%,0_100%,0%_100%)] absolute top-14 z-10 right-16 left-90">
            <div className={HeaderText}>About</div>
            <div className={HeaderText}>Services</div>
            <div className={HeaderText}>Contact</div>  
            <div className={HeaderText}>Blog</div>
        </div>
        </>
       

    )
}
export default Header;
