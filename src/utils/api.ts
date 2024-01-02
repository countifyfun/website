import { env } from "../env.mjs";

export interface Server {
  id: string;
  name: string;
  avatar?: string;
  count: number;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  counts: number;
  fails: number;
}

export const userSorts = ["counts", "fails", "cf_ratio"] as const;
export type UserSort = (typeof userSorts)[number];

const fetchFromAPI = (url: string) => fetch(`${env.API_URL}${url}`);

export const getServers = async (): Promise<Server[]> => {
  const res = await fetchFromAPI("/servers");
  return await res.json();
};

export const getServer = async (id: string): Promise<Server | undefined> => {
  const res = await fetchFromAPI(`/servers/${id}`);
  const data = await res.json();

  if (res.status === 404 || !data) return undefined;
  return data;
};

export const getServerUsers = async (
  id: string,
  options?: { sort?: UserSort; page?: number },
): Promise<{ users: User[]; totalPages: number }> => {
  const params = new URLSearchParams();
  if (options?.sort) params.set("sort", options.sort);
  if (options?.page) params.set("page", options.page.toString());

  const res = await fetchFromAPI(`/servers/${id}/users?${params}`);
  return await res.json();
};
