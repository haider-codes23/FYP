import axios from "axios";
import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "../Perks";
import AccountNavigation from "../AccountNavigation.jsx";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxRoomies, setMaxRoomies] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/' + id).then(response => {
      const {data} = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxRoomies(data.maxRoomies);
      setPrice(data.price);
      
    })
    
  }, [id])

  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }

  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }

  function preinput(header, description) {
    return (
      <div>
        {inputHeader(header)}
        {inputDescription(description)}
      </div>
    );
  }

  async function savePlace(event) {
    event.preventDefault();
    const placeData = {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxRoomies, price};

    if (id) {
      //update
      await axios.put('/places', {id, ...placeData});
      setRedirect(true);
    } else {
      // new place
      await axios.post('/places', placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
    <div>
      <AccountNavigation />
      <form onSubmit={savePlace}>
        {preinput('Title', 'Title for your Place should be short and catchy')}
        <input type="text" value={title} onChange={event => setTitle(event.target.value)} className="enabled:hover:border-indigo-500/75" placeholder="Title, for example Room with work table and balcony" />
        {preinput('Address', 'Enter complete address with name of the City')}
        <input type="text" value={address} onChange={event => setAddress(event.target.value)} className="enabled:hover:border-indigo-500/75" placeholder="Address of your Place" />
        
        {preinput('Photos', 'More are better')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        
        {preinput('Description', 'Desciption of the places')}
        <textarea value={description} onChange={event => setDescription(event.target.value)} className="enabled:hover:border-indigo-500/75" />

        {preinput('Perks', 'Select Perks you offers at your Place')}
        <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {preinput('Extra Info', 'House Rules')}
        <textarea value={extraInfo} onChange={event => setExtraInfo(event.target.value)} className="enabled:hover:border-indigo-500/75"></textarea>
        {preinput('Check in, Check out time And Max Roomies', 'Add Check in & Check out and Number of Roomies')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4 ">
          <div>
            <h3 className="mt-2 -mb-1">Check in Time</h3>
            <input type="text" value={checkIn} onChange={event => setCheckIn(event.target.value)} className="enabled:hover:border-indigo-500/75" placeholder="14:00" />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out Time</h3>
            <input type="text" value={checkOut} onChange={event => setCheckOut(event.target.value)} className="enabled:hover:border-indigo-500/75" placeholder="19:00" />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of Roomies</h3>
            <input type="number" value={maxRoomies} onChange={event => setMaxRoomies(event.target.value)} className="enabled:hover:border-indigo-500/75" placeholder="2" />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per Hour</h3>
            <input type="number" value={price} onChange={event => setPrice(event.target.value)} className="enabled:hover:border-indigo-500/75" placeholder="2" />
          </div>
          
        </div>
        <div className="">
          <button className="bg-secondary rounded-2xl p-2 mt-2 w-full text-white">Save</button>
        </div>
      </form>
    </div>
  );
}