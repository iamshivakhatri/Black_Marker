"use client";
import {cn} from "@/lib/utils";

import Link from "next/link";
import {usePathname, useParams} from "next/navigation"

export const MainNav = ({className, ...props}: React.HTMLAttributes<HTMLElement>) => {
    const pathname = usePathname();
    const params = useParams();

    const routes =[
        {
            href: "/",
            label: "Home",
            active: pathname === "/"
        },
        {
            href: "/resume",
            label: "Resume",
            active: pathname === "/resume"
        },
       

    ]
    console.log("pathname", pathname);
    return (
        <div className="flex">
            {routes.map((route) => (
                <Link key={route.href} href = {route.href} className={cn("flex items-center " ,className)}>
                    {route.label}
                </Link>
            ))  
            }

        </div>
    );
}