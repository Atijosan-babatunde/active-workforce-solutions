import type { BlogBlock } from "@/lib/content/blog";

export default function BlogPostBody({ body }: { body: BlogBlock[] }) {
  return (
    <div>
      {body.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h2 key={i} className="font-display text-2xl text-navy mt-10 mb-4 first:mt-0">
              {block.text}
            </h2>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="space-y-2.5 my-6">
              {block.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-ink/80 leading-relaxed">
                  <span className="text-gold mt-0.5 shrink-0" aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote key={i} className="my-8 border-l-4 border-gold pl-6 py-1">
              <p className="font-display text-xl md:text-2xl text-navy leading-snug">&ldquo;{block.text}&rdquo;</p>
              {block.attribution && <footer className="mt-3 text-sm text-muted">{block.attribution}</footer>}
            </blockquote>
          );
        }
        return (
          <p key={i} className="text-ink/80 leading-relaxed mb-5 text-[1.05rem]">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
