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

        // Fetch user name
        const userRes = await axios.get("/auth/me", {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });

        // Fetch category name by ID
        const catRes = await axios.get(
          `http://localhost:8080/Categories/getCategoryNameById/${ticket.type}`,
          { headers: { "Content-Type": "application/json" } }
        );

        // Date formatting
        const formatDate = (iso) =>
          new Date(iso).toLocaleDateString("he-IL");

        // Build transformed object
        const transformed = {
          key: ticket._id,
          name: userRes.data.userName,
          category: catRes.data,
          date: formatDate(ticket.createdAt),
          tags: ["normal"],
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
