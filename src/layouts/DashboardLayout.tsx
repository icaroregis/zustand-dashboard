import { SideMenu } from '../components';
import { Outlet } from 'react-router-dom';

export const DashboardLayout = () => {
  return (
    <div className="bg-slate-200 overflow-y-scroll w-screen h-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white">
      <div className="flex flex-row relative w-screen">
        <SideMenu />

        <main className="w-full p-4" role="main" aria-label="Conteúdo principal">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
