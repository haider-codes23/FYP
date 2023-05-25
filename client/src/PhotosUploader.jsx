/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import trashCan from './assets/trash-bin.png';
import starEmpty from './assets/starEmpty.png';
import star from './assets/stars.png';


export default function PhotosUploader({addedPhotos, onChange}) {
  const [photoLink, setPhotoLink] = useState('');
  

  async function addPhotoByLink(event) {
    event.preventDefault();
     const {data:filename} = await axios.post('/upload-by-link', {link: photoLink});
     onChange(previous => {
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
      onChange(previous => {
        return (
          [...previous, ...filenames]
        );
       });
    })
  }

  function removePhoto(event, filename) {
    event.preventDefault();
    onChange([...addedPhotos.filter(photo => photo !== filename)]);
  }

  function selectAsCoverPhoto(event, filename) {
    event.preventDefault();
    const addedPhotosWithoutSelected = addedPhotos.filter(photo => photo !== filename);
    const newAddedPhotos = [filename, ...addedPhotosWithoutSelected];
    onChange(newAddedPhotos);
  }


  return (
    <>
      <div className="flex gap-3">
              <input type="text" value={photoLink} onChange={event => setPhotoLink(event.target.value)} className="enabled:hover:border-indigo-500/75" placeholder="Add using Link....jpg" />
              <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;Photos</button>
            </div>
            
            <div className="mt-2 grid gap-3 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
              {addedPhotos.length > 0 && addedPhotos.map(link => (
                // eslint-disable-next-line react/jsx-key
                <div className="h-32 flex relative" key={link}>
                  <img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/' + link} alt="" />
                  <button onClick={(event) => removePhoto(event ,link)} className=" cursor-pointer absolute w-5 h-5 bottom-2 right-2">
                    <img src={trashCan} alt="" />
                  </button>
                  <button onClick={(event) => selectAsCoverPhoto(event, link)} className=" cursor-pointer absolute w-7 h-7 bottom-2 left-2">
                    {link === addedPhotos[0] && (
                      <img src={star} />
                    )}
                    {link !== addedPhotos[0] && (
                      <img src={starEmpty} />
                    )}
                  </button>
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
    </>
  );
}