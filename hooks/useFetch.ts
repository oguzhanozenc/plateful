"use client";

import { useState } from "react";

export function useFetch<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (
    endpoint: string,
    params?: Record<string, string>
  ) => {
    if (typeof window === "undefined") return;

    setLoading(true);
    setError("");

    try {
      const url = new URL(`/api/${endpoint}`, window.location.origin);
      if (params) {
        Object.entries(params).forEach(([key, value]) =>
          url.searchParams.append(key, value)
        );
      }

      const res = await fetch(url.toString());

      if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }

      const result = await res.json();

      setData(result);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}
