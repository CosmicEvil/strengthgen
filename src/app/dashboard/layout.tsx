import Header from '@/src/components/ui/Header';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-between items-center font-sans text-slate-900 dark:text-white">
      <Header />
      {children}
    </div>
  );
};

export default DashboardLayout;
