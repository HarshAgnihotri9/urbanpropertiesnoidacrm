"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectToHome() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home"); // Redirect to home page
  }, [router]);

  return null; // No UI, just redirect
}
