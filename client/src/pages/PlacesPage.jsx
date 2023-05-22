import { Link, useParams } from "react-router-dom";
import parkingArea from '../assets/parking-area.png';
import airConditioner from '../assets/air-conditioner.png';
import privateEntrance from '../assets/leave.png';
import washer from '../assets/washing-machine.png';
import kitchen from '../assets/kitchen.png';
import bathroomAmenities from '../assets/shampoo.png';
import tv from '../assets/tv.png';
import pets from '../assets/pets.png';
import privateSecurity from '../assets/guard.png';
import roomCleaningService from '../assets/sweeping.png';
import wifi from '../assets/wifi.png';

function PlacesPage() {
  const {action} = useParams();
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
            <h2 className="text-2xl mt-4">Title</h2>
            <p className="text-gray-500 text-sm">Title for your Place should be short and catchy</p>
            <input type="text" className="enabled:hover:border-indigo-500/75" placeholder="Title, for example My Lovely Abode" />
            <h2 className="text-2xl mt-4">Address</h2>
            <p className="text-gray-500 text-sm">Enter complete address with name of the City</p>
            <input type="text" className="enabled:hover:border-indigo-500/75" placeholder="Address of your Place" />
            <h2 className="text-2xl mt-4">Photos</h2>
            <p className="text-gray-500 text-sm">More are better</p>
            <div className="flex gap-3">
              <input type="text" className="enabled:hover:border-indigo-500/75" placeholder="Add using Link....jpg" />
              <button className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;Photos</button>
            </div>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
              <button className="flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Upload
              </button>
            </div>
            <h2 className="text-2xl mt-4">Description</h2>
            <p className="text-gray-500 text-sm">Desciption of the places</p>
            <textarea className="enabled:hover:border-indigo-500/75" />
            <h2 className="text-2xl mt-4">Perks</h2>
            <p className="text-gray-500 text-sm">Select Perks you offers at your Place</p>
            <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox"  />
                <img src={wifi} className='w-10 h-10' />
                <span>Wifi</span>
              </label>
              <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" />
                <img src={airConditioner} className='w-10 h-10 mt-4' />
                <span>Air conditioner</span>
              </label>
              <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" />
                <img src={parkingArea} className='w-12 h-12 mb-2' />
                <span>Free parking premises</span>
              </label>
              <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" />
                <img src={privateEntrance} className='w-10 h-10' />
                <span>Private Entrance</span>
              </label>
              <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" />
                <img src={washer} className='w-10 h-10' />
                <span>Washer</span>
              </label>
              <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" />
                <img src={kitchen} className='w-10 h-10 mb-2' />
                <span>Kitchen</span>
              </label>
              <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" />
                <img src={bathroomAmenities} className='w-10 h-10' />
                <span>Bathroom amenites </span>
              </label>
              <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" />
                <img src={tv} className='w-10 h-10' />
                <span>TV</span>
              </label>
              <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" />
                <img src={pets} className='w-10 h-10' />
                <span>Pets Allowed</span>
              </label>
              <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" />
                <img src={privateSecurity} className='w-10 h-10' />
                <span>Private Secuity</span>
              </label>
              <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" />
                <img src={roomCleaningService} className='w-12 h-12' />
                <span>Room Cleaning service</span>
              </label>
            </div>
            <h2 className="text-2xl mt-4">Extra Info</h2>
            <p className="text-gray-500 text-sm">House Rules</p>
            <textarea className="enabled:hover:border-indigo-500/75"></textarea>
            <h2 className="text-2xl mt-4">Check in & Check out times And Max Roomies</h2>
            <p className="text-gray-500 text-sm">Add Check in & Check out and Number of Roomies</p>
            <div className="grid gap-2 sm:grid-cols-3 ">
              <div>
                <h3 className="mt-2 -mb-1">Check in Time</h3>
                <input type="text" className="enabled:hover:border-indigo-500/75" placeholder="14:00" />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out Time</h3>
                <input type="text" className="enabled:hover:border-indigo-500/75" placeholder="19:00" />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of Roomies</h3>
                <input type="text" className="enabled:hover:border-indigo-500/75" placeholder="2" />
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