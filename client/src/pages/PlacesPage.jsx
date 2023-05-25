import { Link } from "react-router-dom";
import AccountNavigation from "../AccountNavigation";
import { useEffect, useState } from "react";
import axios from "axios";



function PlacesPage() {

  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/user-places').then(({data}) => {
      setPlaces(data);
    })
  }, [])
  return (
    <div>
      <AccountNavigation />
      
      <div className="text-center">
        <Link to={'/account/places/new'} className="inline-flex gap-1 bg-secondary text-white px-6 py-4 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New Places
        </Link>
        
      </div>
      <div className="mt-8 grid gap-x-6 gap-y-5">
        {places.length > 0 && places.map(place => (
          // eslint-disable-next-line react/jsx-key
          <Link to={'/account/places/' + place._id} className="bg-indigo-50 shadow-md cursor-pointer gap-4 flex rounded-2xl p-4">
            <div className="w-32 h-32 flex bg-gray-300 grow shrink-0">
              {place.photos.length > 0 && (
                <img className="object-cover" src={'http://localhost:4000/uploads/' + place.photos[0]} alt="" />
              )}
            </div>
            <div className="grow-0 shrink">
              <h2 className="text-xl">{place.title}</h2>
              <p className="text-sm mt-2">{place.description}</p>

            </div>
            
          </Link>
        ))}
      </div>
      
      
      

    </div>
  );
}

export default PlacesPage;