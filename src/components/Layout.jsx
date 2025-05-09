import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Outlet />
    </div>
  );
}