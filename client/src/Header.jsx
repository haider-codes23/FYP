import { useContext } from 'react'
import BedRoomIcon from './assets/bedroom.png'
import HamburgerMenuIcon from './assets/menu.png'
import UserIcon from './assets/user.png'
import {Link} from 'react-router-dom'
import { UserContext } from './UserContext'


function Header() {
  const {user} = useContext(UserContext);
  return (
    <>
      <div>
        <header className='flex justify-between flex-shrink-0 pb-4'>
          
          <Link to={'/'} href="" className="flex items-center gap-1 flex-shrink-0 ">
            <img src={BedRoomIcon} className='w-12 h-12' alt="" />
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg> */}
            <span className='font-bold text-xl bg-rose text-white rounded-full px-1.5 py-2 flex flex-shrink-0'>Roomie</span>
          </Link>
          <div className='flex flex-shrink-0 border border-gray-300 rounded-full px-4 py-3 gap-3 shadow-md shadow-gray-300'>
            <div className=' text-rose-500'>Any Place</div>
            <div className='border border-l border-gray-300'></div>
            <div className=' text-rose-500'>Any Week</div>
            <div className='border border-l border-gray-300'></div>
            <div className=' text-rose-500'>Add Roomies</div>
            <button className='bg-primary text-white p-1 rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <Link to={user ? '/account':'/login'} className='flex flex-shrink-0 items-center border border-gray-300 rounded-full py-2 px-4 gap-2'>
            <img src={HamburgerMenuIcon} className='w-6 h-6' alt="" />
            <div>
              <img src={UserIcon} className='w-6 h-6' alt="" />
            </div>
            {!!user && (
              <div>
                {user.name}
              </div>
            )}
          </Link>
        </header>
      </div>
    </>
  );
}

export default Header;