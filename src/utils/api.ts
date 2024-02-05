import { env } from "../env.mjs";

export interface Server {
  id: string;
  name: string;
  avatar?: string;
  count: number;
}

export interface ServerWithData extends Server {
  channels: {
    id: string;
    name: string;
  }[];
  categories: {
    id: string;
    name: string;
    channels: {
      id: string;
      name: string;
    }[];
  }[];
  channelId: string;
  settings: {
    oneByOne: boolean;
    resetOnFail: boolean;
    talking: boolean;
    noDeletion: boolean;
    pinMilestones: boolean;
    unlisted: boolean;
  };
}

export interface APIServer {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
  features: string[];
  botInGuild: boolean;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  counts: number;
  fails: number;
}

export interface Datapoint {
  time: number;
  count: number;
}

export const userSorts = ["counts", "fails", "cf_ratio"] as const;
export type UserSort = (typeof userSorts)[number];

export const fetchFromAPI = (url: string, init?: RequestInit) =>
  fetch(`${env.API_URL}${url}`, init);

export const getServers = async (): Promise<Server[]> => {
  const res = await fetchFromAPI("/servers");
  return await res.json();
};

export const getServersForCurrentUser = async (
  accessToken?: string,
): Promise<APIServer[]> => {
  const res = await fetchFromAPI("/dashboard/servers", {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : (undefined as any),
    },
  });
  return await res.json();
};

export const getServerForCurrentUser = async (
  id: string,
  accessToken?: string,
): Promise<ServerWithData | undefined> => {
  const res = await fetchFromAPI(`/dashboard/servers/${id}`, {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : (undefined as any),
    },
  });
  const data = await res.json();

  if (res.status === 404 || !data) return undefined;
  return data;
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

export const getServerHistory = async (id: string): Promise<Datapoint[]> => {
  const res = await fetchFromAPI(`/servers/${id}/history`);
  return await res.json();
};
