import { Outlet } from 'react-router';

export function Layout() {
  return (
    <div className="h-screen bg-bg2 flex">
      <Outlet />
    </div>
  );
}
