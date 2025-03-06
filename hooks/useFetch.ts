"use client";

import { useState, useCallback } from "react";

export function useFetch<T>() {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchData = useCallback(
    async (
      endpoint: string,
      method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
      body?: Record<string, unknown>
    ): Promise<T> => {
      if (typeof window === "undefined")
        throw new Error("Window is undefined.");

      setLoading(true);
      setError(undefined);

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

        const result: T = await res.json();

        setData((prevData) =>
          JSON.stringify(prevData) !== JSON.stringify(result)
            ? result
            : prevData
        );

        return result;
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred.";
        setError(errorMessage);
        setData(undefined);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, fetchData };
}
