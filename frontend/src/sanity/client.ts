import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "35ik4q2e", // <--- REPLACE THIS WITH YOUR ACTUAL ID
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Set to false for fresh data during development, true for production
});