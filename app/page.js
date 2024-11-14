// app/page.js
//import PlantIdentifier from "../components/PlantIdentifier";
//import PlantIdentifier from "@/components/PlantIdentifier";
//import { useState } from "react"; (not a js code, its tsx I think)
import PlantIdentifier from "./components/PlantIdentifier";

export default function Home() {
  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <PlantIdentifier />
    </main>
  );
}
