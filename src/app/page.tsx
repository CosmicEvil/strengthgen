import Header from '@/src/components/ui/Header';
import Banner from '@/src/components/pages/home/Banner';
import Devices from '@/src/components/pages/home/Devices';

export default function Home() {
  return (
    <div className="flex flex-col h-full justify-between items-center font-sans text-white text-white">
      <Banner />
      <Devices />
    </div>
  );
}
