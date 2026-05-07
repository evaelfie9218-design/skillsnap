import { Toaster } from "@/components/ui/sonner";
import { router } from "@/router";
import { RouterProvider } from "@tanstack/react-router";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="bottom-right" />
    </>
  );
}
