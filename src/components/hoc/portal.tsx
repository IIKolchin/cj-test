import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type TPortalProps = {
  children: ReactNode;
};

function Portal({ children }: TPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(
      children,
      document.querySelector('#modals')!,
    )
    : null;
}

export default Portal;
