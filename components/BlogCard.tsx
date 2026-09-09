import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/content/blog";
import { blogCategory, formatBlogDate, estimateReadTime } from "@/lib/content/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  const category = blogCategory(post);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white border border-line rounded-card overflow-hidden hover:shadow-lg hover:shadow-navy/10 transition-all"
    >
      <div className="relative h-48">
        <Image src={post.coverImage} alt="" fill sizes="400px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/0 to-transparent" />
        {category && (
          <span className="absolute top-4 left-4 eyebrow text-navydeep bg-gold rounded-full px-3 py-1 shadow-md shadow-black/20">
            {category.name}
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-6">
        <p className="text-xs text-muted mb-2">
          {formatBlogDate(post.date)} <span aria-hidden="true">·</span> {estimateReadTime(post.body)}
        </p>
        <p className="font-display text-lg text-navy mb-2 leading-snug">{post.title}</p>
        <p className="text-sm text-ink/70 leading-relaxed line-clamp-3">{post.excerpt}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy mt-4">
          Read more
          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
