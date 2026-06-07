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
            className="inline-flex items-center justify-center px-8 py-4 text-xl font-bold bg-primary text-primary-foreground rounded-full hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg ring-2 ring-primary/20"
          >
            Open Linux
          </Anchor>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
