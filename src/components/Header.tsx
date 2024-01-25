"use client";

import * as React from "react";

import { useRouter, usePathname } from "next/navigation";
import { useStyletron } from "baseui";
import { Layer } from "baseui/layer";
import { ChevronDown, Delete, Overflow, Upload } from "baseui/icon";
import { AppNavBar, setItemActive, NavItem } from "baseui/app-nav-bar";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname()
  console.log('route', pathname);
  const [css] = useStyletron();

  const [mainItems, setMainItems] = React.useState<NavItem[]>([
    { icon: Upload, label: "Game", info: {link: "/"}, active: pathname == '/' },
    { icon: Upload, label: "User", info: {link: "/user"}, active: pathname == '/user' },
  ]);
  const userItems = [
    { icon: Overflow, label: "Profile" },
    { icon: Overflow, label: "Logout" },
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
          title="2048er"
          mainItems={mainItems}
          userItems={userItems}
          onMainItemSelect={handleMainItemSelect}
          onUserItemSelect={(item) => console.log("user", item)}
          username="Umka Marshmallow"
          usernameSubtitle="5.0"
          userImgUrl=""
        />
      </div>
    </Layer>
  );
}
