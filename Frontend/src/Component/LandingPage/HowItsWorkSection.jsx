import learn from "../../Images/learn.jpg";
function HowItsWorkSection() {
  const TextConteainer =
    " text-[#0c2b78] text-[22px]  font-semibold mb-12  bg-white pt-4 pb-4 pl-8 pr-8   border-r-10 border-b-10  border-yellow-400 ";
  return (
    <div className="flex flex-col text-1xl  items-center font-bold justify-center h-120 bg-linear-to-r from-slate-900 to-blue-900 m-5  ">
      <h1 className="mt-5 text-white mb-5 text-3xl">How it work</h1>
      <div className="flex justify-between items-center mt-10    ">
        <div className="flex flex-col gap-1 ml-10 mr-40 ">
          <div className={TextConteainer}>Step 1: Create an Account</div>
          <div className={TextConteainer}>Step 2: Post Your Project</div>
          <div className={TextConteainer}>Step 3: Review Bids & Hire</div>
        </div>

        <div className="w-120  mb-10 border-r-16 border-b-16 border-yellow-500">
          <img src={`${learn}`} alt="" />
        </div>
      </div>
    </div>
  );
}
export default HowItsWorkSection;
