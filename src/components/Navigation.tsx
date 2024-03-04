"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname, useRouter } from "next/navigation";
const Navigation = () => {
  const router = useRouter();
  const path = usePathname();

  const [token, setToken] = useState<null | string>(
    localStorage.getItem("token")
  );
  useEffect(() => {
    console.log("c", window.location.pathname);
    if (typeof window !== "undefined") {
      console.log(localStorage.getItem("token"));
      setToken(localStorage.getItem("token"));
      const intervalId = setInterval(() => {
        setToken(localStorage.getItem("token"));
        console.log(token);
        console.log(path);

        // If the token exists, redirect to the home page
        if (token === null) {
          router.push("/login");
        } else {
          console.log("f");
          router.push(path);
        }
      }, 2000); // 2 seconds interval

      // Cleanup the interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [token]); // Empty dependency array to run effect once on mount
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {token == null ? (
            <Link href="/login" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                login
              </NavigationMenuLink>
            </Link>
          ) : (
            <Link
              onClick={() => {
                localStorage.removeItem("token");
                setToken(localStorage.getItem("token"));
              }}
              href=""
              legacyBehavior
              passHref
            >
              <NavigationMenuLink
                onClick={() => {
                  localStorage.removeItem("token");
                  setToken(null);
                  router.push("/login");
                }}
                className={navigationMenuTriggerStyle()}
              >
                logout
              </NavigationMenuLink>
            </Link>
          )}
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/Orders" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Orders
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/Inventory" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Inventory
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
