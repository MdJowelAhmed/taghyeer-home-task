"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { userService, SearchUser } from "../services/user.service";

export function useDebounce<T>(value: T, delayMs: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}

export function useUserSearch(searchTerm: string) {
  const debouncedQuery = useDebounce(searchTerm.trim(), 350);

  return useQuery<SearchUser[]>({
    queryKey: ["users", "search", debouncedQuery],
    queryFn: () => userService.searchUsers(debouncedQuery),
    enabled: debouncedQuery.length >= 1,
    staleTime: 1000 * 60, // 1 minute
  });
}
