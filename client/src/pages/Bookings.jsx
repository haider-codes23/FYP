import { useEffect, useState } from "react";
import AccountNavigation from "../AccountNavigation";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { differenceInCalendarDays, format } from 'date-fns';
import calendarIcon from '../assets/calendar.png';
import { Link } from "react-router-dom";

export default function BookingsPage() {
  const [bookings, setBookings] =useState([]);
  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data);
    })
  }, []);

  return (
    <div>
      <AccountNavigation></AccountNavigation>
      <div>
        {bookings?.length > 0 && bookings.map(booking => (
          // eslint-disable-next-line react/jsx-key
          <Link to={`/account/bookings/${booking._id}`} className="mt-7 bg-indigo-50 cursor-pointer gap-5 flex rounded-2xl overflow-hidden">
            <div className="w-48">
              <PlaceImg place={booking.place}></PlaceImg>
            </div>
            <div className="py-3 pr-3 grow">
             
              
              <h2 className="text-xl">{booking.place.title}</h2>
              
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
          </Link>
        ))}
      </div>
    </div>
  );
}