import {
  FC,
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';
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

  const value = useMemo(
    () => ({
      accessToken,
      user,
      setAccessToken,
    }),
    [accessToken, user, setAccessToken]
  );

  return (
    <SpotifyContext.Provider value={value}>
      {children}
    </SpotifyContext.Provider>
  );
};
export const useSpotifyContext = () => useContext(SpotifyContext);
