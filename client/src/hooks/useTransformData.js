import { useState, useEffect } from "react";
import axios from '../services/axiosInstance';

const useTransformData = (ticket) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ticket) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch current user details
        const userRes = await axios.get("/auth/me", {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });

        // Get category name from ID
        const catRes = await axios.get(
          `http:///Categories/getCategoryNameById/${ticket.type}`,
          { headers: { "Content-Type": "application/json" } }
        );

        // Format date to local string
        const formatDate = (iso) =>
          new Date(iso).toLocaleDateString("he-IL");

        // Build transformed data object
        const transformed = {
          key: ticket._id,
          name: userRes.data.userName,
          category: catRes.data, // Server returns category name as string
          date: formatDate(ticket.createdAt),
          tags: ["רגיל"],
          status: ticket.status,
        };

        setData(transformed);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ticket]);

  return { data, loading, error };
};

export default useTransformData;
