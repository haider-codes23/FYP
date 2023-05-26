import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from 'date-fns';
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({place}) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfRoomies, setNumberOfRoomies] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  const {user} = useContext(UserContext);

  useEffect(() => {
    setName(user.name);
  }, [user]);

  let numberOfDays = 0;
  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(new Date(checkIn), new Date(checkOut));
    if (numberOfDays < 0) {
      numberOfDays = numberOfDays * (-1);
    }
  }

  async function bookThisPlace() {
    
    const response = await axios.post('/bookings', {checkIn, checkOut, numberOfRoomies, name, phone, place:place._id, price:numberOfDays*place.price });
    const bookingId = response.data._id;
    console.log(response);
    setRedirect(`/account/bookings/${bookingId}`);


  }

  if (redirect) {
    return <Navigate to={redirect} />

  }


 
  
  return (
    <div className="bg-indigo-100 shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        <span className="text-fuchsia-500 font-bold">Price </span>  
        <span className="text-fuchsia-500 font-bold">Rs </span>
        <span className="font-bold">{place.price} </span>
        <span className="text-fuchsia-400 font-semibold">/ </span>
        <span className="font-bold">night</span>

      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex text-center">
          <div className="py-4 px-4 ">
            <label>Check in</label>
            <input type="date" value={checkIn} onChange={event => setCheckIn(event.target.value)} />
          </div>
          <div className="py-4 px-4 border-l border-gray-400">
            <label>Check out</label>
            <input type="date" value={checkOut} onChange={event => setCheckOut(event.target.value)} />
          </div>
                

        </div>
        <div className="py-4 px-4 border-t border-gray-400">
            <label>Number of Roomies</label>
            <input type="number" value={numberOfRoomies} onChange={event => setNumberOfRoomies(event.target.value)} />
        </div>
          {numberOfDays > 0 && (
            <div className="py-4 px-4 border-t">
              <label>Your Full name:</label>
              <input type="text" value={name} onChange={event => setName(event.target.value)} />
              <label>Phone Number:</label>
              <input type="tel" value={phone} onChange={event => setPhone(event.target.value)} />
            </div>
          )}
        </div>
        <button onClick={bookThisPlace} className="btn-secondary rounded-2xl mt-4 p-2 text-white">
          Reserve at 
          {numberOfDays > 0 && (
            <span> Rs:{numberOfDays * place.price}</span>
          )}
        </button>
              
    </div>
  );
}