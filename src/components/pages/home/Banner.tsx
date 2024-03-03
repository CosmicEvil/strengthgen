import Link from 'next/link';

const Banner = () => {
  return (
    <div className="relative h-[350px] w-full px-4 md:h-[605px] md:px-6 lg:px-8 xl:px-10 2xl:px-0">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="inline-block text-center text-4xl font-medium tracking-tighter text-dark lg:text-7xl">
          AI-Generated Strength Programs
        </h1>
        <p className="mt-8 text-center text-xl font-light tracking-tight lg:text-3xl">
         Your machine powered personal trainer <br />that makes programs custom tailored to your needs
        </p>
        <Link
          href={'/dashboard'}
          className="flex mt-10 h-10 items-center rounded-lg bg-purple-500 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 active:bg-purple-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        >
          Get Started!
        </Link>
      </div>
     
    </div>
  );
};

export default Banner;

