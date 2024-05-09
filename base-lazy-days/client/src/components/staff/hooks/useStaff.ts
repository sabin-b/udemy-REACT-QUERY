import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

import type { Staff } from "@shared/types";

import { filterByTreatment } from "../utils";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

// query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get("/staff");
  return data;
}

export function useStaff() {
  // for filtering staff by treatment
  const [filter, setFilter] = useState("all");

  // update based on the select happen on radio button
  const filterBySelect = useCallback(
    (data: Staff[]) => {
      if (filter === "all") return data;
      // based on the input return staff
      return filterByTreatment(data, filter);
    },
    [filter]
  );

  // TODO: get data from server via useQuery
  const staff: Staff[] = [];
  const { data = staff } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
    select: filterBySelect,
  });

  return { data, filter, setFilter };
}
