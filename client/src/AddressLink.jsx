import mapsIcon from './assets/map.png';
export default function AddressLink({place}) {
  return (
    <a className="my-2 block flex gap-1 font-semibold underline" target="_blank" href={'https://maps.google.com/?q=' + place.address} rel="noreferrer">
    <img src={mapsIcon} className='w-5 h-5' alt="" />
    {place.address}
  </a>
  );
}