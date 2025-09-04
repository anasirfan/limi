"use client";

import SavedConfigurations from "../portal/components/dashboard/SavedConfigurations";

export default function ARViewPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] p-4">
      <SavedConfigurations isARView={true} />
    </div>
  );
}
