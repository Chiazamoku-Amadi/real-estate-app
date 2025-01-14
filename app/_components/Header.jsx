"use client";

import { Button } from "@/components/ui/button";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const path = usePathname();
  const { user, isSignedIn } = useUser();

  return (
    <div className="font-outfit flex justify-between shadow-sm fixed top-0 z-10 bg-white p-6 px-10 w-full">
      <div className="flex gap-12 items-center">
        <Image
          priority={true}
          src={"/logo.svg"}
          width={150}
          height={150}
          alt="logo"
          className="h-12 w-32"
        />
        <ul className="hidden md:flex gap-10">
          <Link href={"/"}>
            <li
              className={`hover:text-primary font-medium text-sm cursor-pointer ${
                path === "/" && "text-primary"
              }`}
            >
              For Sale
            </li>
          </Link>
          <Link href={"/rent"}>
            <li
              className={`hover:text-primary font-medium text-sm cursor-pointer ${
                path === "/rent" && "text-primary"
              }`}
            >
              For Rent
            </li>
          </Link>
          <li className="hover:text-primary font-medium text-sm cursor-pointer">
            Agent Finder
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-2">
        <Link href={`/add-new-listing`}>
          <Button className="flex gap-2">
            <Plus className="h-5 w-5" /> Post Your Ad
          </Button>
        </Link>
        {isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={user?.imageUrl}
                width={35}
                height={35}
                alt="user profile"
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/user"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/user/my-listing"}>My Listing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SignOutButton>Logout</SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={`/sign-in`}>
            <Button variant="outline">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
