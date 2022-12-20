import { ReactNode } from 'react';

type FeedLinkProps = {
  children: ReactNode;
  href: string;
};

export default function FeedLink({ children, href }: FeedLinkProps) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noreferrer'
      className='hover:underline visited:text-gray-500'
    >
      {children}
    </a>
  );
}
