"use client";

import React from "react";
import Navigation from "./Navigation";
import { useGetAuthProfileQuery } from "@/redux/features/userAuth/authEndpoints";
import dynamic from "next/dynamic";
const AccountNavigation = dynamic(() => import("./AccountNavigation"), {
  ssr: false,
});

const MainSidebar = ({ content, playlistID }) => {
  const { data: currentUser, isLoading } = useGetAuthProfileQuery();

  if (isLoading) return;

  return (
    <section className="col-span-3 bg-gray-900">
      {content === "Home" && <Navigation content={content} />}
      {content === "Favourites" && <Navigation content={content} />}
      {content === "Recents" && <Navigation content={content} />}
      {content === "Playlist" && (
        <Navigation content={content} playlistID={playlistID} />
      )}
      {content === "Account" && (
        <AccountNavigation content={content} currentUser={currentUser} />
      )}
      {content === "Music" && (
        <AccountNavigation content={content} currentUser={currentUser} />
      )}
      {content === "Users" && (
        <AccountNavigation content={content} currentUser={currentUser} />
      )}
    </section>
  );
};

export default MainSidebar;
