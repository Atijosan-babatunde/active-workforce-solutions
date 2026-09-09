import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import CTASection from "@/components/CTASection";
import IconBadge from "@/components/IconBadge";
import BlogCard from "@/components/BlogCard";
import BlogPostBody from "@/components/BlogPostBody";
import { blogPosts, getBlogPost, getRelatedPosts, blogCategory, formatBlogDate, estimateReadTime } from "@/lib/content/blog";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return { title: post.seoTitle, description: post.seoDescription };
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) return notFound();

  const category = blogCategory(post);
  const related = getRelatedPosts(post);

  return (
    <>
      <article>
        <div className="mx-auto max-w-content px-6 pt-10 md:pt-14">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-navy2 transition-colors">
            <ChevronLeft size={16} /> All Insights
          </Link>

          <div className="max-w-3xl mx-auto mt-6">
            {category && (
              <span className="inline-flex items-center gap-2 eyebrow text-navydeep bg-gold rounded-full px-4 py-1.5 mb-5 w-fit">
                {category.name}
              </span>
            )}
            <h1 className="font-display text-4xl md:text-5xl leading-[1.05] text-navy">{post.title}</h1>
            <p className="mt-5 text-lg text-ink/70 leading-relaxed">{post.excerpt}</p>

            <div className="mt-7 flex items-center gap-3">
              {category && <IconBadge icon={category.icon} color={category.color} size="md" />}
              <div>
                <p className="font-medium text-ink text-sm">{post.author}</p>
                <p className="text-xs text-muted">
                  {post.authorRole} <span aria-hidden="true">·</span> {formatBlogDate(post.date)} <span aria-hidden="true">·</span> {estimateReadTime(post.body)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-content px-6 mt-9">
          <div className="relative h-72 md:h-[440px] rounded-card overflow-hidden">
            <Image src={post.coverImage} alt="" fill priority sizes="1180px" className="object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,12,28,0.35) 0%, rgba(6,12,28,0) 35%)" }} />
            <div className="absolute left-0 bottom-0 w-1.5 h-full bg-gold/80" />
          </div>
        </div>

        <div className="mx-auto max-w-content px-6 py-14 md:py-16">
          <div className="max-w-3xl mx-auto">
            <BlogPostBody body={post.body} />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-sand border-t border-line">
          <div className="mx-auto max-w-content px-6 py-16">
            <h2 className="font-display text-2xl text-navy mb-8">More Insights</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection heading="Have a Question for Our Team?" body="Speak to us about workforce solutions, consultancy, recovery coordination or training for your organisation or family." />
    </>
  );
}
