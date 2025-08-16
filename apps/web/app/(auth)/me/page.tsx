"use client";

import React from "react";
import { authClient } from "../../../lib/auth-client"; // import the auth client

export default function Me() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Me</h1>
      <p>{session?.user?.email.toString()}</p>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.image}</p>
      <p>{session?.user?.id}</p>
    </div>
  );
}
