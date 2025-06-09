"use client";

import { useSession } from "next-auth/react";
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-sm space-y-4 p-4">
        {!session ? (
          <>
            <h1 className="text-2xl font-bold text-center">Welcome</h1>
            <p className="text-center text-gray-600">
              Sign in to get started
            </p>
            <LoginButton />
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome, {session.user?.name}</h1>
            <p className="mt-2 text-green-600">
              Successfully signed in
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
