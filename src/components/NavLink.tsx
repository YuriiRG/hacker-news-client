import { ReactNode } from 'react';
import { Link, useRoute } from 'wouter';

export type NavLinkProps = {
  href: string;
  children: ReactNode;
};

export default function NavLink(props: NavLinkProps) {
  const [isActive] = useRoute(props.href);
  return (
    <Link href={props.href} className={isActive ? 'font-bold' : ''}>
      {props.children}
    </Link>
  );
}
