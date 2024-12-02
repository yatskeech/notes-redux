import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div className="flex-grow flex items-center justify-center mb-40">
      <Outlet />
    </div>
  );
}
