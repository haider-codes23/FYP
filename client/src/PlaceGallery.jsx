import gridIcon from './assets/visualization.png';

import cancelIcon from './assets/cancel.png';
import { useState } from 'react';
export default function PlaceGallery({place}) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white  min-h-screen">
        <div className="grid gap-4 p-8 bg-black">
          <div>
            <h2 className="text-3xl">Photos of {place.title}</h2>
            <button onClick={() => setShowAllPhotos(false)} className="bg-slate-300 fixed right-12 top-40  flex gap-2 px-4 py-2 rounded-2xl">
              <img src={cancelIcon} className='w-5 h-5' alt="" />
              Close Photos
            </button>
          </div>
          {place?.photos?.length > 0 && place.photos.map(photo => (
            // eslint-disable-next-line react/jsx-key
            <div>
              <img src={'http://localhost:4000/uploads/' + photo} alt="" />
            </div>
          ))}

        </div>
        
      </div>
    );
  }


  return (
    <div className="relative">
    <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
      <div>
      
        {place.photos?.[0] && (
          <div className="">
            <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={'http://localhost:4000/uploads/' + place.photos[0]} alt="" />
          </div>
        )}
      </div>
      <div className="grid ">
      {place.photos?.[1] && (
          <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={'http://localhost:4000/uploads/' + place.photos[1]} alt="" />
        )}
        <div className="overflow-hidden">
        {place.photos?.[2] && (
          <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover relative top-2" src={'http://localhost:4000/uploads/' + place.photos[2]} alt="" />
        )}

        </div>
      </div>
    </div>
    <button onClick={() => setShowAllPhotos(true)} className="flex gap-2 bg-slate-100 text-gray-600 absolute bottom-3 right-3 py-2 px-4 rounded-lg shadow-md shadow-indigo-500 opacity-80">
      <img src={gridIcon} className='w-5 h-5' />
      Show more photos
    </button>
  </div>
  );
}