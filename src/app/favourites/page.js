import Favourites from "@/components/FavouriteSongs/Favourites";
import MainSidebar from "@/components/Sidebar/MainSidebar";
import React from "react";

const page = () => {
  return (
    <main className="grid grid-cols-12 min-h-[100vh] bg-slate-950 text-white">
      <MainSidebar content="Favourites" />
      <Favourites />
    </main>
  );
};

export default page;
