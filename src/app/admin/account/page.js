import MainHome from "@/components/MainBody/Home/Home";
import MainSidebar from "@/components/Sidebar/MainSidebar";
import React from "react";

const page = () => {
  return (
    <main className="grid grid-cols-12 min-h-[100vh] bg-slate-950 text-white">
      <MainSidebar content="Account" />
      <div className="col-span-9 py-20 px-12">
        <div>
          <h2 className="text-5xl font-bold mb-2">Welcome to Wizard Waves</h2>
        </div>
        <div>
          <p className="text-xl font-semibold">Welcome to Wizard Waves</p>
        </div>
      </div>
    </main>
  );
};

export default page;
