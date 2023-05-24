import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";


function PlacesPage() {
  const {action} = useParams();

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  
  const [descriptions, setDescriptions] = useState('');
  const [perks, setPerks] = useState([]);
  const [exrtaInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxRoomies, setMaxRoomies] = useState(1);

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



  return (
    <div>
      {action !== 'new' && (
      <div className="text-center">
        <Link to={'/account/places/new'} className="inline-flex gap-1 bg-secondary text-white px-6 py-4 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New Places
        </Link>
      </div>
      )}
      {action === 'new' && (
        <div>
          <form>
            {preinput('Title', 'Title for your Place should be short and catchy')}
            <input type="text" value={title} onChange={event => setTitle(event.target.value)} className="enabled:hover:border-indigo-500/75" placeholder="Title, for example Room with work table and balcony" />
            {preinput('Address', 'Enter complete address with name of the City')}
            <input type="text" value={address} onChange={event => setAddress(event.target.value)} className="enabled:hover:border-indigo-500/75" placeholder="Address of your Place" />
            
            {preinput('Photos', 'More are better')}
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
            
            {preinput('Description', 'Desciption of the places')}
            <textarea value={descriptions} onChange={event => setDescriptions(event.target.value)} className="enabled:hover:border-indigo-500/75" />

            {preinput('Perks', 'Select Perks you offers at your Place')}
            <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>

            {preinput('Extra Info', 'House Rules')}
            <textarea value={exrtaInfo} onChange={event => event.target.value(setExtraInfo)} className="enabled:hover:border-indigo-500/75"></textarea>
            {preinput('Check in, Check out time And Max Roomies', 'Add Check in & Check out and Number of Roomies')}
            <div className="grid gap-2 sm:grid-cols-3 ">
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
              
            </div>
            <div className="">
              <button className="bg-secondary rounded-2xl p-2 mt-2 w-full text-white">Save</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

export default PlacesPage;