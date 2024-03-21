"use client";
import {Input} from "@/components/ui/input";

export default function Home() {
  return (

    <div className='flex flex-col items-center  h-screen'>
    <div className='w-3/4 md:w-1/2 lg:w-1/2 xl:w-1/2  mt-20 space-y-4 p-8 pt-6'>
        <Input className="w-full" placeholder="Enter a Link" />
    </div>
 </div>
   

  );
}
