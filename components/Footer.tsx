import { Anchor } from './CustomHtml';

function Footer(): JSX.Element {
  return (
    <footer className="flex flex-col items-center justify-center w-full py-6 border-t">
      <div className="flex flex-col items-end">
        <div className="flex items-center justify-center">
          made with <span className="text-red-500 mx-1">❤</span> by
          <Anchor className="ml-1" href="https://github.com/jeevanu345">
            jeevanu345
          </Anchor>
        </div>
        <div className="mt-1">
          <Anchor href="https://portfolio-site-arch-linux-style.vercel.app/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Open Linux
          </Anchor>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
