import { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${baseUrl}/auth/me`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        });
        setUser(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}
