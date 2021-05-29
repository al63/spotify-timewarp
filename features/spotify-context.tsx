import {
  FC, createContext, useState, useContext,
} from 'react';

interface SpotifyContextValues {
  accessToken: string | null
  setAccessToken: (accessToken: string) => void;
}

const SpotifyContext = createContext<SpotifyContextValues>({ accessToken: null, setAccessToken: () => null });

export const SpotifyProvider: FC = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>('');
  return (
    <SpotifyContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </SpotifyContext.Provider>
  );
};
export const useSpotifyContext = () => useContext(SpotifyContext);
