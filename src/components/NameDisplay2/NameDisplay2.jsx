import React, { useContext } from 'react'
import './NameDisplay2.css'
import { StoreContext } from '../../context/StoreContext'
import NameItem from '../NameItem/NameItem'
import { API_BASE_URl } from "../../assets/assets";
import useSWR from "swr";


const NameDisplay2 = () => {
   // const {name_list}=useContext(StoreContext)
    const { auth, axiosins } = useContext(StoreContext);

  const datatleraaija = (url) => axiosins.get(url).then((r) => r.data);

  const {
    data: events,
    error,
    isLoading,
  } = useSWR(`${API_BASE_URl}/events`, datatleraaija);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  const currentDate = new Date();
  const finishedEvents = events.filter(event => {
    const eventEndDate = new Date(event.endDate); 
    return eventEndDate < currentDate;});

  return (
    <div className='nd'>
        <h2>Sakisakeko event</h2>
        <div className='nd-list'>
            {finishedEvents.length > 0 ?(
                finished.map((event,index)=>{
                    if(index>5) return;
                    return(
                        <NameItem
                        key={event._id}
                        id={event._id}
                        name={event.eventName}
                        description={event.eventDescription}
                        image={event.eventBanner}/>
                    )
                })
            ):(
                <div>No Finished Competitions</div>
            )
        }
        </div>
      <hr/>
    </div>
  )
}

export default NameDisplay2
