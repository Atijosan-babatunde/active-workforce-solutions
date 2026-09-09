"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/lib/content/blog";
import { divisions } from "@/lib/content/divisions";
import BlogCard from "./BlogCard";

export default function BlogIndexGrid({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState<string | null>(null);

  const categories = useMemo(
    () => divisions.filter((d) => posts.some((p) => p.division === d.slug)),
    [posts]
  );

  const visible = active ? posts.filter((p) => p.division === active) : posts;

  return (
    <div>
      <div className="flex flex-wrap gap-2.5 mb-10" role="group" aria-label="Filter by division">
        <button
          type="button"
          onClick={() => setActive(null)}
          className={`rounded-full px-4 py-2 text-sm font-medium border-2 transition-colors ${
            active === null ? "border-gold bg-goldtint text-golddark" : "border-line text-ink/70 hover:border-navy/30"
          }`}
        >
          All Insights
        </button>
        {categories.map((d) => (
          <button
            key={d.slug}
            type="button"
            onClick={() => setActive(d.slug)}
            aria-pressed={active === d.slug}
            className={`rounded-full px-4 py-2 text-sm font-medium border-2 transition-colors ${
              active === d.slug ? "border-gold bg-goldtint text-golddark" : "border-line text-ink/70 hover:border-navy/30"
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-ink/70">No posts in this category yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
