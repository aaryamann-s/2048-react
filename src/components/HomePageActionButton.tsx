"use client";

import { DisplayLarge } from "baseui/typography";
import Link from "next/link";
import { Button } from "baseui/button";
import useStore from "../store/store";

export default function HomePageActionButton() {
    console.log("CLIENT!");
  const username = useStore((state) => state.username);
  const isLoggedIn = username !== null;
  return (
      <Link href={isLoggedIn ? "/game" : "/login"}>
        <Button style={{ minWidth: 150 }}>
          {isLoggedIn ? "Play" : "Login"}
        </Button>
      </Link>
  );
}
