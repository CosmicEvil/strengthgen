import Header from '@/src/components/ui/Header';
import Banner from '@/src/components/pages/home/Banner';
import Devices from '@/src/components/pages/home/Devices';

export default function Home() {
  return (
    <div className="flex flex-col justify-between items-center font-sans text-slate-900 dark:text-white">
      <Header />
      <Banner />
      <Devices />
    </div>
  );
}
