import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "../Perks";
import axios from "axios";


function PlacesPage() {
  const {action} = useParams();

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
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

  async function addPhotoByLink(event) {
    event.preventDefault();
     const {data:filename} = await axios.post('/upload-by-link', {link: photoLink});
     setAddedPhotos(previous => {
      return (
        [...previous, filename]
      );
     });
    setPhotoLink('');

  }

  function uploadPhoto(event) {
    const files = event.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios.post('/upload', data, {
      headers: {'Content-Type': 'multipart/form-data'}
    }).then(response => {
      const {data:filenames} = response;
      setAddedPhotos(previous => {
        return (
          [...previous, ...filenames]
        );
       });
    })
  }

  console.log(action);

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
            <div className="flex gap-3">
              <input type="text" value={photoLink} onChange={event => setPhotoLink(event.target.value)} className="enabled:hover:border-indigo-500/75" placeholder="Add using Link....jpg" />
              <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;Photos</button>
            </div>
            
            <div className="mt-2 grid gap-1 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
              {addedPhotos.length > 0 && addedPhotos.map(link => (
                // eslint-disable-next-line react/jsx-key
                <div className="h-32 flex">
                  <img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/' + link} alt="" />
                </div>
              ))}
              <label className="flex h-32 justify-center items-center gap-1 border bg-transparent cursor-pointer rounded-2xl p-2 text-2xl text-gray-600 mb-5">
                <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Upload
              </label>
            </div>
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