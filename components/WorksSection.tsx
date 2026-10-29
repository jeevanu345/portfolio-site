import { ArrowUpRight } from 'lucide-react';
import { Button } from './ui/button';

const works = [
  {
    title: 'Renure AI',
    category: 'AI-assisted embroidery digitization',
    description:
      'An embroidery workspace that turns artwork into stitch plans and Tajima DST files, with editable designs, stitch previews, and quality checks.',
    href: 'https://renure.app',
  },
  {
    title: 'TapCart',
    category: 'NFC-based smart retail system',
    description:
      'A smart retail prototype that brings product browsing, checkout, order management, and inventory together for customers and stores through an NFC-oriented shopping experience.',
    href: 'https://github.com/jeevanu345/TapCart',
  },
];

export default function WorksSection() {
  return (
    <section aria-labelledby="works-heading" className="mt-20 sm:mt-32">
      <h2 id="works-heading" className="mb-10 text-4xl font-medium sm:text-5xl">
        Works
      </h2>
      <div className="grid gap-5 md:grid-cols-2">
        {works.map(work => (
          <article
            key={work.title}
            className="flex flex-col rounded-xl border border-border bg-card p-6 text-card-foreground sm:p-8"
          >
            <p className="mb-3 text-sm text-primary">{work.category}</p>
            <h3 className="text-2xl font-medium">{work.title}</h3>
            <p className="mb-8 mt-4 leading-relaxed text-muted-foreground">
              {work.description}
            </p>
            <Button asChild variant="outline" className="mt-auto self-start">
              <a
                href={work.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View the Work: ${work.title}`}
              >
                View the Work
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
