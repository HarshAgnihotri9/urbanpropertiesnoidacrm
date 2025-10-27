import { Suspense } from "react";
import AssignLeadPage from "./mainComponent";

export default function PageWrapper() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AssignLeadPage />
    </Suspense>
  );
}