import NavLink from './NavLink';

export default function NavBar() {
  return (
    <div className='flex p-5 gap-5'>
      <div>Logo</div>
      <NavLink href='/'>Top stories</NavLink>
    </div>
  );
}
