import { MainNav } from "./main-nav";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="border-b bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg">
      <div className="flex justify-start items-center p-4 max-w-9xl mx-auto">
        <MainNav className="mx-6 flex-grow" />
      </div>
    </div>
  );
}

export default Navbar;
