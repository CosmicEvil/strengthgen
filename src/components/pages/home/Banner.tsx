import Link from 'next/link';
import { Button } from '@/src/components/ui/button'
import Image from 'next/image';

const Banner = () => {
  return (
    <div className="relative flex items-center flex-col min-h-[100vh] w-full pt-32 sm:h-[605px] px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-0">
      <div className="flex h-[40vh] sm:h-[40vh] xl:h-[80vh] w-full flex-col items-center justify-start ">
        <h1 className="inline-block mt-10 sm:mt-2 text-center text-4xl font-medium tracking-tighter text-white lg:text-7xl">
          Your machine powered<br /> <b>personal trainer.</b>
        </h1>
        <p className="mt-8 text-center text-xl font-light tracking-tight lg:text-3xl">
          AI-Generated Strength Programs, <b>custom</b> tailored to your needs!
        </p>
        <Button className="mt-8 z-5 bg-cyan-500 hover:bg-cyan-300 text-white shadow-xl shadow-cyan-500/50">
            <Link href="./dashboard">
              Get Started!
            </Link>
        </Button>
        
      </div>
      <div className="flex z-0 w-[100vw] md:w-[50vw] max-w-[800px] -mt-2 sm:-mt-20 items-center">
          <Image
              src="/images/desktop-2.png"
              width={800}
              height={500}
              alt="laptop"
              className="h-full w-full"
            />
        </div>
    </div>
  );
};

export default Banner;

