import { useState } from 'react';
import Hamburger from './Hamburger';
import NavLink from './NavLink';

export default function NavBar() {
  const [isFolded, setIsFolded] = useState(true);
  const items = (
    <>
      <div>
        <NavLink href='/'>Top</NavLink>
      </div>
      <div>
        <NavLink href='/best'>Best</NavLink>
      </div>
      <div>
        <NavLink href='/new'>New</NavLink>
      </div>
    </>
  );
  return (
    <nav className='flex flex-col sm:flex-row sm:items-center gap-3 p-3'>
      <div className='flex justify-between items-center'>
        <div className='py-2'>Hacker News</div>
        <Hamburger
          className='block h-10 w-10 sm:hidden'
          onClick={() => setIsFolded((f) => !f)}
        />
      </div>
      <div
        className={
          'flex flex-col gap-4 sm:gap-3 sm:flex-row ' +
          (isFolded ? 'hidden sm:flex' : '')
        }
      >
        {items}
      </div>
    </nav>
    // <nav className='flex flex-col gap-4 p-1 sm:flex-row sm:items-center'>
    //   <div className='flex justify-between'>
    //     <div className='p-3'>Hacker News</div>
    //     <Hamburger
    //       className='block h-5 w-5 sm:hidden'
    //       onClick={() => setIsFolded((f) => !f)}
    //     />
    //   </div>
    //   <div
    //     className={
    //       'flex flex-col gap-4 sm:flex-row sm:items-center' +
    //       ' ' +
    //       (isFolded ? 'hidden sm:block' : '')
    //     }
    //   >
    //     {items}
    //   </div>
    // </nav>
  );
}
