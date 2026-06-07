import { Anchor } from './CustomHtml';

function Footer(): JSX.Element {
  return (
    <footer className="flex flex-col items-center justify-center w-full py-6 border-t">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center">
          made with <span className="text-red-500 mx-1">❤</span> by
          <Anchor className="ml-1" href="https://github.com/jeevanu345">
            jeevanu345
          </Anchor>
        </div>
        <div className="mt-2 mb-2">
          <Anchor
            href="https://portfolio-site-arch-linux-style.vercel.app/"
            className="inline-flex items-center justify-center px-8 py-4 text-xl font-extrabold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/30 ring-2 ring-purple-500/50"
          >
            Explore Linux Version 🐧
          </Anchor>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
