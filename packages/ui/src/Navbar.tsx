import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Logo } from '@/components/Icons/Logo';
import { useUser } from '@/utils/useUser';
import Link from 'next/link';
import { Button } from '@/components/Button'; 
import { Github } from '@/components/Icons/Github'; 
import { useRouter } from 'next/router';


function ScrollListener() {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScroll(window.scrollY > 50);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}

export const Navbar = () => {
  const { user } = useUser();
  const [active, setActive] = useState(false);
  const [scroll, setScroll] = useState(false);
  const router = useRouter();
  const navClass = `text-xl font-medium hover:underline mx-3 ${router?.pathname === '/' && 'text-white'}`;

  // if(router.asPath === '/'){
  //   useEffect(() => {
  //     window.addEventListener("scroll", () => {
  //       setScroll(window.scrollY > 50);
  //     });
  //     if(window.scrollY > 50 && scroll === false){
  //       setScroll(true);
  //     }
  //   }, []);
  // }

  return (
    <>
      {router.asPath === "/" && <ScrollListener />}
      <div
        className={`${
          router?.pathname === "/"
            ? scroll
              ? "bg-secondary-3"
              : "bg-transparent"
            : "border-b-4 border-gray-200 bg-white"
        } transition-background sticky top-0 z-40 duration-300 ease-in-out`}
      >
        <div className="wrapper py-6">
          <div className="flex justify-between">
            <div className="flex justify-start">
              <div className="mr-4 flex flex-shrink-0 items-center">
                <Link href="/">
                  {router?.pathname === "/" ? (
                    <Logo white className="h-10 w-auto md:h-12" />
                  ) : (
                    <Logo className="h-10 w-auto md:h-12" />
                  )}
                </Link>
              </div>
            </div>

            <div className="hidden items-center justify-center lg:flex">
              <nav className="flex items-center justify-center">
                <a href="/#features" className={navClass}>
                  Features
                </a>
                <a href="/pricing" className={navClass}>
                  Pricing
                </a>
                <a href="https://reflio.com/resources" className={navClass}>
                  Docs & Guides
                </a>
                <a
                  href="https://reflio.canny.io"
                  className={navClass}
                  target="_blank"
                  rel="noreferrer"
                >
                  Roadmap
                </a>
              </nav>
            </div>

            <button
              className="inline-flex rounded outline-none lg:hidden"
              onClick={(e) => {
                active ? setActive(false) : setActive(true);
              }}
            >
              {active ? (
                <XMarkIcon
                  className={`h-auto w-8 ${
                    router?.pathname === "/" && "text-white"
                  }`}
                />
              ) : (
                <Bars3Icon
                  className={`h-auto w-8 ${
                    router?.pathname === "/" && "text-white"
                  }`}
                />
              )}
            </button>

            {active && (
              <div className="absolute left-0 top-auto z-50 mt-12 w-full origin-top-right overflow-hidden border-t-4 border-gray-200 bg-white shadow-xl md:mt-14 lg:hidden">
                <a
                  onClick={(e) => {
                    setActive(false);
                  }}
                  className="text-md bg:text-white block border-b-2 border-gray-200 p-5 hover:bg-gray-100"
                  href="/#features"
                >
                  Features
                </a>
                <a
                  onClick={(e) => {
                    setActive(false);
                  }}
                  className="text-md bg:text-white block border-b-2 border-gray-200 p-5 hover:bg-gray-100"
                  href="/pricing"
                >
                  Pricing
                </a>
                <a
                  onClick={(e) => {
                    setActive(false);
                  }}
                  className="text-md bg:text-white block border-b-2 border-gray-200 p-5 hover:bg-gray-100"
                  href="/resources"
                >
                  Docs & Guides
                </a>
                <a
                  onClick={(e) => {
                    setActive(false);
                  }}
                  className="text-md bg:text-white block border-b-2 border-gray-200 p-5 hover:bg-gray-100"
                  href="https://reflio.canny.io"
                  target="_blank"
                  rel="noreferrer"
                >
                  Roadmap
                </a>
                {!user && (
                  <a
                    onClick={(e) => {
                      setActive(false);
                    }}
                    className="text-md bg:text-white block p-5 font-semibold hover:bg-gray-100"
                    href="/signin"
                  >
                    Sign In
                  </a>
                )}
                <a
                  onClick={(e) => {
                    setActive(false);
                  }}
                  className="text-md block border-b-4 border-b-primary-3 bg-primary p-5 font-semibold hover:bg-primary-2"
                  href={user ? "/dashboard" : "/signup"}
                >
                  {user ? "Dashboard" : "Get Started for Free"}
                </a>
              </div>
            )}

            <div className="hidden items-center justify-end lg:flex">
              <a
                className="mr-1"
                href="https://github.com/Reflio-com/reflio"
                target="_blank"
                rel="noreferrer"
              >
                <Github
                  className={`h-6 w-auto ${
                    router?.pathname === "/" && "text-white"
                  }`}
                />
              </a>
              {user ? (
                <div className="flex-shrink-0">
                  <Button small primary href="/dashboard">
                    <span>View Dashboard</span>
                  </Button>
                </div>
              ) : (
                <div className="flex-shrink-0">
                  <a href="/signin" className={navClass + " mr-4"}>
                    Sign In
                  </a>
                  <Button small primary href="/signup">
                    <span>Get Started for Free</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;