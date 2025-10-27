import { Suspense } from "react";
import UpdateLeadPage from "./updateLead";

export default function PageWrapper() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <UpdateLeadPage />
    </Suspense>
  );
}