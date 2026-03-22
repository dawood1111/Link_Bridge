import { GetData } from '../../Redux/Slices/FeedSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {formatDistanceToNow} from 'date-fns';
import {FaLocationArrow,FaPhone,FaEnvelope} from 'react-icons/fa';







export function Feed(){

    const timeAgo=(date)=>{
       return formatDistanceToNow(new Date(date), { addSuffix: true });
    }


    const [PopupOpen,SetPopupopen]=useState(false);
    const [Items,SetItems]=useState({});
    const [OpenViewDetails,setOpenViewDetails]=useState('');


    const DispatchData=useDispatch();
    const SelectData=useSelector((state)=>state.feed.GetData);
    
    
    function PopupPost(item,opendetails){
        if(OpenViewDetails==opendetails){
        SetPopupopen(false);
        SetItems('');
        setOpenViewDetails({})

        }
        else{
         SetPopupopen(true);
        SetItems(item);
        setOpenViewDetails(opendetails)

        }
       

    }


useEffect(()=>{

    DispatchData(GetData());

},[DispatchData]);

    return(
        <div className='absolute '>
        
    <div className='flex flex-col justify-center  items-center gap-5   '>
        {
            
            SelectData.map((item,idx)=>(
                
    <div className=" bg-gray-100 w-130  shadow-xl  rounded-2xl  " key={idx}>
        <div className=' flex flex-row justify-between  items-center gap-3  '>
          <div className='relative top-8 left-4'>
              <div className='bg-amber-700 h-10 w-10 flex  justify-center items-center rounded-4xl'>A</div>
            <div className='flex relative left-10 bottom-10 justify-between  ml-2 '>   
                   <p >{item.user.userName}</p>
            <p className='text-neutral-400 text-xs mr-4 absolute top-6 '>{timeAgo(item.postDate)}</p>    
            </div>
            
          </div>
            
          

           
              
            
        </div>
  <div className="card-body h-25 mt-6 relative" >
    <h3 className="card-title" >{item.projectTitle}</h3>
    <p className='text-sm'>{item.projectDescription}</p>
  </div>
  <div className='w-130 h-116 '>
   <Swiper slidesPerView={1} spaceBetween={10} className='h-full'>
                        {item.images?.map((img, index) => (
                            <SwiperSlide key={img.id || index}>
                                <img
                                    src={`http://localhost:5194${img.image}`}
                                    alt="Project"
                                    className="w-full h-full object-cover"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    
  
  </div>
   {
        PopupOpen&&Items &&OpenViewDetails==idx &&(
          
            
            <div>

                  
                   

              
                   

           <div className='flex flex-row justify-around  h-18      items-center  ' >
            <div className='  flex flex-col text-center justify-center items-center  bg-gray-200 pr-6  pl-6 pt-1 pb-1 rounded-sm shadow '>
                 <label htmlFor="start-date" className='stat-title'>Start Date</label>
          <div className="stat-title text-gray-700 font-bold text-[12px]">{new Date(Items.startDate).toLocaleDateString()}</div>
            </div>

            <div className='  flex flex-col text-center justify-center items-center  bg-gray-200 pr-6 pl-6 pt-1 pb-1 rounded-sm shadow '>
            <label htmlFor="end-date" className='stat-title'>End Date</label>
           <div className="stat-title text-gray-700 font-bold text-[12px]">{new Date(Items.endDate).toLocaleDateString()}</div>
            </div>

             <div className=' border-gray-200  flex flex-col text-center justify-center items-center text-[12px]  bg-gray-200 pr-6  pl-6 pt-1 pb-1 rounded-sm shadow '>
               <label className='stat-title'>Status</label>


                  <p className=''>  {
                Items.projectStatus === 0 ?  <span className=' text-amber-500 StatusContainer' >Pending</span>  :
                Items.projectStatus === 1 ? <span className='text-blue-600 StatusContainer'>In Progress</span> :
                Items.projectStatus === 2 ? <span className='text-green-600 StatusContainer'>Completed</span> :
                Items.projectStatus === 3 ? <span className='text-red-600 StatusContainer'>Cancelled</span> :
                'Unknown'
            
            }</p>

         </div>
          
           
           </div>
    
              <div className='flex   stat justify-around h-18 '>
                <div className=' ViewDetailInfoContainer'>
               <FaEnvelope className='stat-title text-[14px] text-red-700'/>
               
                <p className='stat-title text-black text-[13px]'>{Items.user.email}</p>
                </div>
                <div className=' ViewDetailInfoContainer'>
                      <FaPhone className='stat-title text-[14px] text-green-700'/>
                    <p className='stat-title text-black text-[13px] '>{Items.user.phoneNumber}</p>

                </div>
                <div className='ViewDetailInfoContainer'>
                    <FaLocationArrow className='stat-title text-[14px] text-yellow-500' />
                    <p className='stat-title text-black text-[13px]'>{item.projectLocation}</p>
                </div>
              
           
            

              </div>
            

 
            </div>

            
         
         
        )
    }
   
  <button className='pt-2 pb-2 bg-gray-50 text-[#0c2b78] rounded-b-2xl  w-full ' onClick={() => PopupPost(item,idx)}>view details</button>
</div>

        ))
        }

        
        </div>
        
  

    
    </div> 
   
    );
 
}
export default Feed;