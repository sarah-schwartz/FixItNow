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

        // שליפת שם המשתמש
        const userRes = await axios.get("/auth/me", {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });

        // שליפת שם הקטגוריה לפי ID
        const catRes = await axios.get(
          `http:///Categories/getCategoryNameById/${ticket.type}`,
          { headers: { "Content-Type": "application/json" } }
        );

        // המרה של תאריך
        const formatDate = (iso) =>
          new Date(iso).toLocaleDateString("he-IL");

        // בניית אובייקט מתורגם
        const transformed = {
          key: ticket._id,
          name: userRes.data.userName,
          category: catRes.data, // חשוב שהשרת יחזיר מחרוזת ישירה
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
