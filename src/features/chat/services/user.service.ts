import { apiFetch } from "@/lib/api";

export interface SearchUser {
  _id: string;
  name: string;
  phone: string;
}

export const userService = {
  searchUsers: (query: string) => {
    return apiFetch<SearchUser[]>(`/users/search?q=${encodeURIComponent(query)}`);
  },
};
