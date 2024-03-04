"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/tailwindutils";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    password: "",
    username: "",
    isVerified: false,
    isAdmin: false,
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  useEffect(() => {
    if (user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const payload = {
        UserName: user.username,
        Password: user.password,
      };
      window.electronAPI.send("loginTrial", payload);
      window.electronAPI.on("loginresult", (event, data) => {
        console.log(data);
        if (data.success) {
          const token = Math.random().toString(36).substring(7);
          if (typeof window !== "undefined") {
            // Perform localStorage action
            localStorage.setItem("token", token);
          }
          // Store the token in local storage

          // Set a timeout to remove the token after 20 minutes
          setTimeout(() => {
            if (typeof window !== "undefined") {
              localStorage.removeItem("token");
            }
          }, 1 * 60 * 1000); // 20 minutes in milliseconds

          // Redirect to the home page
          router.push("/");
        }
      });
    } catch (error) {
      console.error(error);
    }
    // try {
    //   console.log("f")
    //   const response = await axios.post("/api/sign-up", user);
    //   if (response.status === 200) {
    //     router.push("/login");
    //   }
    // } catch (error) {
    //   console.log("error", error);
    // } finally {
    //   setLoading(false);
    //
  };

  return (
    <div
      className={
        "flex flex-col items-center justify-center h-screen p-5 w-full"
      }
    >
      <h1 className={"text-2xl my-16"}>Login</h1>
      <label className={"flex flex-col items-start"} htmlFor={"username"}>
        Username
      </label>
      <input
        className={
          " text-black my-4 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
        }
        type={"text"}
        id={"username"}
        placeholder={"Username"}
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <label htmlFor={"password"}>Password</label>
      <input
        className={
          "text-black my-4 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
        }
        type={"password"}
        id={"password"}
        placeholder={"Password"}
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <Button
        variant="default"
        className={
          "mt-4 border-2 border-white py-2 rounded hover:bg-white hover:text-black p-2 cursor-pointer"
        }
        onClick={onSubmit}
        disabled={buttonDisabled}
      >
        {/* {loading ? <BounceLoader className={""} /> : "Sign Up"} */}
        Login
      </Button>
      {/* <Link className={"text-sm my-2"} href={"/login"}>
        Already have an account? Login
      </Link> */}
    </div>
  );
};
export default Page;
