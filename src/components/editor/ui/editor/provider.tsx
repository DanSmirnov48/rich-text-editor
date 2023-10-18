"use client";

import { createContext } from "react";

export const Context = createContext<{
  completionApi: string;
}>({
  completionApi: "/api/generate",
});
