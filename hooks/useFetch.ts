"use client";

import { useState, useCallback } from "react";

export function useFetch<T extends unknown>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (
      endpoint: string,
      method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
      body?: Record<string, any>
    ) => {
      if (typeof window === "undefined") return null;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/${endpoint}`, {
          method,
          headers: { "Content-Type": "application/json" },
          body: body ? JSON.stringify(body) : undefined,
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error(`❌ API Error: ${res.status} - ${errorText}`);
          throw new Error(`API Error: ${res.status} - ${errorText}`);
        }

        const result = await res.json();

        setData((prevData) =>
          JSON.stringify(prevData) !== JSON.stringify(result)
            ? result
            : prevData
        );
        return result;
      } catch (err: any) {
        setError(err.message || "Something went wrong. Please try again.");
        setData(null);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, fetchData };
}
