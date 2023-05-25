/* eslint-disable react/prop-types */
import parkingArea from './assets/parking-area.png';
import airConditioner from './assets/air-conditioner.png';
import privateEntrance from './assets/leave.png';
import washer from './assets/washing-machine.png';
import kitchen from './assets/kitchen.png';
import bathroomAmenities from './assets/shampoo.png';
import tv from './assets/tv.png';
import pets from './assets/pets.png';
import privateSecurity from './assets/guard.png';
import roomCleaningService from './assets/sweeping.png';
import wifi from './assets/wifi.png';

export default function Perks({selected, onChange}) {
  function handleCheckboxClick(event) {
    const {checked, name} = event.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter(selectedName => selectedName !== name)]);
    }

    // onChange([...selected], name);
  }

  return (
    <>
      <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleCheckboxClick} />
                <img src={wifi} className='w-10 h-10' />
                <span>Wifi</span>
              </label>
              <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('airConditioner')} name='airConditioner' onChange={handleCheckboxClick} />
                <img src={airConditioner} className='w-10 h-10 mt-4' />
                <span>Air conditioner</span>
              </label>
              <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('parking')} name='parking' onChange={handleCheckboxClick} />
                <img src={parkingArea} className='w-12 h-12 mb-2' />
                <span>Free parking premises</span>
              </label>
              <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('privateEntrance')} name='privateEntrance' onChange={handleCheckboxClick} />
                <img src={privateEntrance} className='w-10 h-10' />
                <span>Private Entrance</span>
              </label>
              <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('washer')} name='washer' onChange={handleCheckboxClick} />
                <img src={washer} className='w-10 h-10' />
                <span>Washer</span>
              </label>
              <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('kitchen')} name='kitchen' onChange={handleCheckboxClick} />
                <img src={kitchen} className='w-10 h-10 mb-2' />
                <span>Kitchen</span>
              </label>
              <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('bathroomAmenities')} name='bathroomAmenities' onChange={handleCheckboxClick} />
                <img src={bathroomAmenities} className='w-10 h-10' />
                <span>Bathroom amenites </span>
              </label>
              <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('tv')} name='tv' onChange={handleCheckboxClick} />
                <img src={tv} className='w-10 h-10' />
                <span>TV</span>
              </label>
              <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('pets')} name='pets' onChange={handleCheckboxClick} />
                <img src={pets} className='w-10 h-10' />
                <span>Pets Allowed</span>
              </label>
              <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('privateSecurity')} name='privateSecurity' onChange={handleCheckboxClick} />
                <img src={privateSecurity} className='w-10 h-10' />
                <span>Private Secuity</span>
              </label>
              <label className="border hover:border-indigo-500/75 p-4 gap-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('roomCleaningService')} name='roomCleaningService' onChange={handleCheckboxClick} />
                <img src={roomCleaningService} className='w-12 h-12' />
                <span>Room Cleaning service</span>
              </label>
    </>
  );
}