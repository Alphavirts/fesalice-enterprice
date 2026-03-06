"use client";

import { Toaster } from "sonner";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Configure NProgress
NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.1 });

function RouteProgressBar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        NProgress.done();
        return () => {
            NProgress.start();
        };
    }, [pathname, searchParams]);

    return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Suspense fallback={null}>
                <RouteProgressBar />
            </Suspense>
            <Toaster position="top-right" richColors closeButton />
            {children}
        </>
    );
}
