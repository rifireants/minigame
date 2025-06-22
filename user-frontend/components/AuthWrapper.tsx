"use client";

import { useEffect } from "react";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      const modal = document.getElementById("signModal") as HTMLDialogElement | null;
      modal?.showModal();
    }
  }, []);

  return <>{children}</>;
}
