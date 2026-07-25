"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function RouteBroadcaster() {
  const pathname = usePathname();

  useEffect(() => {
    // Send a message up to the parent IDE window containing the new path
    if (window.parent && window !== window.parent) {
      console.log("Broadcasting route change:", pathname); // For debugging
      window.parent.postMessage({ type: "ROUTE_CHANGE", pathname }, "*");
    }
  }, [pathname]);

  return null;
}