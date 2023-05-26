import { useParams } from "react-router-dom";
import calendarIcon from '../assets/calendar.png';
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import { differenceInCalendarDays, format } from "date-fns";

export default function BookingPage() {
  const {id} = useParams();
  const [booking, setBookings] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({_id}) => _id === id);
        if (foundBooking) {
          setBookings(foundBooking);
        }
      });
    }
  }, [id])

  if (!booking) {
    return '';
  }
  
  return (
    <div className="my-8">
     <h1 className="text-xl">{booking.place.title}</h1>
     <AddressLink place={booking.place} className="my-2 block">{booking.place.address}</AddressLink>
     <div className="bg-indigo-100 p-4 mb-4 rounded-2xl">
      <h2 className="text-xl">Your Reservation Information</h2>
      <div className="py-3 pr-3 grow">
        <div className="flex gap-2 flex-shrink-0 items-center  border-indigo-300 border-t mt-2 py-2">
          <img src={calendarIcon} className="w-5 h-5" alt="" ></img>
          <span className="text-green-600 text-base">Check-In at: </span><span className="text-base">{format(new Date(booking.checkIn), 'dd-MM-yyyy')}</span>
          <div className="border-r"></div>
          <img src={calendarIcon} className="w-5 h-5" alt="" ></img>
          <span className="text-red-600 text-base">Check-Out at: </span><span className="text-base">{format(new Date(booking.checkOut), 'dd-MM-yyyy')}</span> 
          
          
        </div>
              <div className="text-gray-500 text-l">
                {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights | Total Price: {booking.price} Rs
              </div>
            </div>
     </div>
     <PlaceGallery place={booking.place} ></PlaceGallery>
      
    </div>
  );
}