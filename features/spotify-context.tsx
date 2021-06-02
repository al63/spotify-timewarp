import { FC, createContext, useState, useContext, useEffect } from 'react';
import { getUserInfo, SpotifyUser } from './api/spotify';

interface SpotifyContextValues {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  user: SpotifyUser | null;
}

const SpotifyContext = createContext<SpotifyContextValues>({
  accessToken: null,
  setAccessToken: () => null,
  user: null,
});

export const SpotifyProvider: FC = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [user, setUser] = useState<SpotifyUser | null>(null);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    (async () => {
      const userInfo = await getUserInfo(accessToken);
      setUser(userInfo);
    })();
  }, [accessToken]);

  return (
    <SpotifyContext.Provider value={{ accessToken, setAccessToken, user }}>
      {children}
    </SpotifyContext.Provider>
  );
};
export const useSpotifyContext = () => useContext(SpotifyContext);
