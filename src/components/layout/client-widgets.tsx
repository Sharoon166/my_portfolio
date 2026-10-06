"use client";

import dynamic from "next/dynamic";

/*
 * Client-side-only overlays. None of them render page content, so skipping
 * SSR is safe — they mount after hydration and stay out of the server HTML.
 * (`ssr: false` is only allowed inside Client Components, which is why this
 * file exists: layout.tsx itself is a Server Component.)
 */
const CommandPallete = dynamic(() => import("@/components/command-pallete"), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("@/components/mouse-cursor"), {
  ssr: false,
});
const ScrollProgressButton = dynamic(
  () =>
    import("@/components/layout/scroll-progress-button").then(
      (m) => m.ScrollProgressButton,
    ),
  { ssr: false },
);
const ToastContainer = dynamic(
  () => import("react-toastify").then((m) => m.ToastContainer),
  { ssr: false },
);

export function ClientWidgets() {
  return (
    <>
      <CustomCursor />
      <ScrollProgressButton />
      <CommandPallete />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        closeOnClick
        pauseOnHover={false}
        draggable={false}
        theme="dark"
      />
    </>
  );
}
