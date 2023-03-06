import { useEffect } from 'react';

export default function useTitle(title = '') {
  useEffect(() => {
    const titleElement = document.querySelector('title');
    if (titleElement) {
      titleElement.innerText = title;
    }
  });
}
