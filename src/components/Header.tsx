"use client";

import * as React from "react";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useStyletron } from "baseui";
import { Layer } from "baseui/layer";
import { ChevronDown, Delete, Overflow, Upload } from "baseui/icon";
import { AppNavBar, setItemActive, NavItem } from "baseui/app-nav-bar";
import useStore from "../store/store";

const MENU_ITEMS = [
  {
    icon: Upload,
    label: "Game",
    info: { visibility: "logged-in", link: "/game" },
  },
  {
    icon: Upload,
    label: "Leaderboard",
    info: { visibility: "public", link: "/leaderboard" },
  },
  {
    icon: Upload,
    label: "Login",
    info: { visibility: "logged-out", link: "/login" },
  },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const username = useStore((state) => state.username);
  const removeUser = useStore((state) => state.removeUser);
  const isLoggedIn = username !== null;
  const [css] = useStyletron();

  const [mainItems, setMainItems] = React.useState<NavItem[]>(
    MENU_ITEMS.map((item) => {
      return {
        ...item,
        active: pathname === item.info.link,
      };
    })
  );
  console.log('hey', pathname, mainItems);
  const userItems = [
    { icon: Overflow, label: "Logout", info: { action: () => removeUser() } },
  ];

  function handleMainItemSelect(item: NavItem) {
    setMainItems((prev) => setItemActive(prev, item));
    router.push(item.info.link);
  }

  return (
    <Layer>
      <div
        className={css({
          boxSizing: "border-box",
          width: "100vw",
          position: "fixed",
          top: "0",
          left: "0",
        })}
      >
        <AppNavBar
          title={
            <Link
              onClick={() => {
                console.log("menu", MENU_ITEMS);
                setMainItems(MENU_ITEMS.map((item) => {
                  return {
                    ...item,
                    active: false
                  };
                }));
              }}
              style={{ textDecoration: "none", color: "white" }}
              href="/"
            >
              2048er
            </Link>
          }
          mainItems={
            isLoggedIn
              ? mainItems.filter(
                  (item) =>
                    item.info.visibility === "logged-in" ||
                    item.info.visibility === "public"
                )
              : mainItems.filter(
                  (item) =>
                    item.info.visibility === "logged-out" ||
                    item.info.visibility === "public"
                )
          }
          onMainItemSelect={handleMainItemSelect}
          userItems={isLoggedIn ? userItems : []}
          onUserItemSelect={(item: NavItem) => {
            item.info?.action();
          }}
          username={username ?? ""}
          usernameSubtitle="5.0"
          userImgUrl=""
        />
      </div>
    </Layer>
  );
}
