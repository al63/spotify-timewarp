import { useState, useEffect } from 'react';

interface Props {
    onClient: () => void;
}

const CSR = (props: Props) => {
  const { onClient } = props;
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <>{onClient()}</> : <></>;
};

export { CSR };
