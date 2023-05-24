import { Link } from "react-router-dom";
import AccountNavigation from "../AccountNavigation";



function PlacesPage() {
  
  return (
    <div>
      <AccountNavigation />
      
      <div className="text-center">
        List of all added places
        <br />
        <Link to={'/account/places/new'} className="inline-flex gap-1 bg-secondary text-white px-6 py-4 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New Places
        </Link>
      </div>
      
      
      

    </div>
  );
}

export default PlacesPage;