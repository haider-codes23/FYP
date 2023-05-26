import axios from "axios";



import BookingWidget from '../BookingWidget.jsx'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink.jsx";

export default function PlacePage() {
  const {id} = useParams();
  const [place, setPlace] = useState(null);

  
  

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then(response => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return '';

  
  return (

    <div className="mt-8 bg-slate-100 -mx-8 px-8 pt-8">
      <h1 className="font-semibold text-3xl">{place.title}</h1>
      <AddressLink place={place}></AddressLink>
      
      <PlaceGallery place={place} ></PlaceGallery>
      
      <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          <div className="bg-indigo-100 rounded-2xl p-4">
            Check-in: {place.checkIn}<br />
            Check-out: {place.checkOut}<br />
            Max number of Roomies: {place.maxRoomies}

          </div>
          
        </div>
        <div className="">
          <BookingWidget place={place}></BookingWidget>
        </div>
      </div>
      <div className="bg-indigo-100 -mx-8 px-8 py-8 border-t">
        <h2 className="font-semibold text-2xl">Extra Info</h2>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>

      </div>

      
    </div>
  );
}