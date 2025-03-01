"use client";

import { useState } from "react";

export function useFetch<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: Record<string, any>
  ) => {
    if (typeof window === "undefined") return null;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      console.log(`📡 Fetching API: /api/${endpoint}`);
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
      console.log("✅ API Response:", result);

      setData(result && Object.keys(result).length ? result : null);
      return result;
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setData(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}
