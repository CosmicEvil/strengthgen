import Link from 'next/link';
import { Button } from '@/src/components/ui/button'
const Banner = () => {
  return (
    <div className="relative min-h-[100vh] w-full px-4 md:h-[605px] md:px-6 lg:px-8 xl:px-10 2xl:px-0">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="inline-block text-center text-4xl font-medium tracking-tighter text-white lg:text-7xl">
          Your machine powered<br /> <b>personal trainer.</b>
        </h1>
        <p className="mt-8 text-center text-xl font-light tracking-tight lg:text-3xl">
          AI-Generated Strength Programs, <b>custom</b> tailored to your needs!
        </p>

        <Button className="mt-8 bg-cyan-500 text-white shadow-xl shadow-cyan-500/50">
            <Link href="./dashboard">
              Get Started!
            </Link>
        </Button>
      </div>
     
    </div>
  );
};

export default Banner;

