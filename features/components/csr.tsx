import { useState, useEffect, ReactElement } from 'react';

interface Props {
  onClient: () => ReactElement;
  placeHolder?: ReactElement;
}

const CSR = ({ onClient, placeHolder }: Props) => {
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? onClient() : placeHolder || null;
};

export { CSR };
