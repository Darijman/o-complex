import { useEffect } from 'react';

export function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  onClickOutside: (event: MouseEvent) => void,
  ignoredRef?: React.RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        (!ignoredRef?.current || !ignoredRef.current.contains(event.target as Node))
      ) {
        onClickOutside(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClickOutside, ref, ignoredRef]);
}
