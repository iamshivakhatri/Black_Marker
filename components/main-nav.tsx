"use client";
import {cn} from "@/lib/utils";
import { PenLine } from 'lucide-react';

import Link from "next/link";
import {usePathname, useParams} from "next/navigation"

export const MainNav = ({className, ...props}: React.HTMLAttributes<HTMLElement>) => {
    const pathname = usePathname();
    const params = useParams();

    const routes =[
        {
            href: "/",
            label: (
                <span className="text-white text-2xl font-bold">
          Black Marker <PenLine className="inline-block ml-2" />
        </span>
                ),
            active: pathname === "/"
        },
        // {
        //     href: "/resume",
        //     label: "Resume",
        //     active: pathname === "/resume"
        // },
       

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