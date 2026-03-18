import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export function useGet(endpoint) {
  // console.log("useGet rendered with endpoint:", endpoint); // ← watch how often & if value stable
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (customEndpoint) => {
      setLoading(true);
      setError(null);

      try {
        const finalEndpoint = customEndpoint || endpoint;

        const response = await axios.get(`${BASE_URL}${finalEndpoint}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setData(response.data);
        return response.data; // 🔥 important
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    },
    [endpoint],
  );

  useEffect(() => {
    // console.log("useEffect triggered → calling fetchData");
    if (!endpoint) return;
    fetchData();
  }, [fetchData, endpoint]); // ✅ correct dependency

  return { data, loading, error, refetch: fetchData };
}
