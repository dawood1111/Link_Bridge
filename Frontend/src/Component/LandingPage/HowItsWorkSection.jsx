import learn from '../../Images/learn.jpg';
function HowItsWorkSection(){
    const TextConteainer=" text-[#0c2b78] text-[24px]  font-semibold mb-10  bg-white pt-3 pb-3 pl-3 pr-3   border-r-16 border-b-16 border-yellow-500 "
    return( 
        <div className="flex flex-col text-1xl  items-center font-bold justify-center h-120 bg-[#0c2b78]  m-5  shadow-2xl ">


            <h1 className="mt-5 text-white mb-5 text-3xl">How it work</h1>
            <div className="flex justify-between items-center mt-10    ">
                <div className="flex flex-col gap-1 ml-10 mr-40 ">
                <div className={TextConteainer}>Step 1: Create an Account</div>
                <div className={TextConteainer}>Step 2: Post Your Project</div>
                <div className={TextConteainer}>Step 3: Review Bids & Hire</div>  
                </div>

                <div className='w-120  mb-10 border-r-16 border-b-16 border-yellow-500'>
                    <img src={`${learn}`} alt="" />
                   
                </div>
                 
            </div>
        </div>



    )}
    export default HowItsWorkSection;   
