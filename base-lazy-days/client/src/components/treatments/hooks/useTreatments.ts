import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import type { Treatment } from "@shared/types";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

// for when we need a query function for useQuery
// async function getTreatments(): Promise<Treatment[]> {
//   const { data } = await axiosInstance.get("/treatments");
//   return data;
// }
async function getTreatments() {
  const { data } = await axiosInstance.get("/treatments");
  // console.log(data);
  return data;
}
export function useTreatments(): Treatment[] | undefined {
  const fallback: Treatment[] = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.treatments],
    queryFn: getTreatments,
    staleTime: 60000,
    gcTime: 90000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchInterval: 60000,
  });

  return data;
}

export function usePreFetchTreatments(): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: [queryKeys.treatments],
      queryFn: getTreatments,
      staleTime: 60000,
      gcTime: 90000,
    });
  }, []);
}
