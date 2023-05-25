import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces([...response.data,...response.data,...response.data,]);
    });
  }, []);

  return (
    <div className="mt-20 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 && places.map(place => (
        // eslint-disable-next-line react/jsx-key
        <Link to={'/place/' + place._id}>
          <div className="bg-gray-500 rounded-2xl mb-2 flex">
            {place.photos?.[0] && (
              
              <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt="" />
            )}

          </div>
          <h3 className="font-bold">{place.address}</h3>
          <h2 className="text-sm">{place.title}</h2>
          <div className="mt-1">
          <span className="text-fuchsia-500 font-bold">Rs</span>
          <span className="font-bold">{place.price}</span>
          <span className="text-fuchsia-400 font-semibold">/</span>
          <span className="font-bold">hour</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default IndexPage;