import Header from '@/src/components/ui/Header';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-between items-center font-sans text-white">
      {children}
    </div>
  );
};

export default DashboardLayout;
