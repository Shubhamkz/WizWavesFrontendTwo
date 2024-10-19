import React from "react";
import Search from "./Search";
import dynamic from "next/dynamic";
const Account = dynamic(() => import("./Account"), {
  ssr: false,
});

const Header = () => {
  return (
    <section className="flex justify-between px-5 py-5">
      <Search />
      <Account />
    </section>
  );
};

export default Header;
