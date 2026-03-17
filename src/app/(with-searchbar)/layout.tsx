import { Suspense, type ReactNode } from "react";
import Searchbar from "@/components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Suspense fallback={<></>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
