import { Playlist, User } from "@prisma/client";
import useSWR from "swr";
import fetcher from "./fetcher";
import { useRouter } from "next/router";
import { validateToken } from "./auth";

export function useMe() {
  const { data, error } = useSWR("me", fetcher);

  return {
    data: data as User,
    isLoading: !data && !error,
    isError: error,
  };
}

export function usePlaylists() {
  const { data, error } = useSWR("playlists", fetcher);

  return {
    playlists: data as Playlist[],
    isLoading: !data && !error,
    isError: error,
  };
}
