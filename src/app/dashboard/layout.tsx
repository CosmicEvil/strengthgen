import Header from '@/src/components/ui/Header';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-950 from-10% via-teal-900 via-70% to-fuchsia-700 flex flex-col justify-between items-center font-sans text-slate-900 dark:text-white">
      <Header />
      {children}
    </div>
  );
};

export default DashboardLayout;
