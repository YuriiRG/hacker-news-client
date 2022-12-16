import NavLink from './NavLink';

export default function NavBar() {
  return (
    <div className='flex p-5 gap-5'>
      <div>Logo</div>
      <NavLink href='/'>Main page</NavLink>
      <NavLink href='/page1'>Page 1</NavLink>
    </div>
  );
}
