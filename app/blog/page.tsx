import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ServiceHero from "@/components/ServiceHero";
import CTASection from "@/components/CTASection";
import BlogIndexGrid from "@/components/BlogIndexGrid";
import { blogPosts, blogCategory, formatBlogDate, estimateReadTime } from "@/lib/content/blog";
import { images } from "@/lib/content/images";

export const metadata: Metadata = {
  title: "Insights",
  description: "Practical guidance and perspectives from across Active Workforce Solutions' divisions — recovery coordination, provider compliance, training, recruitment, accommodation and facilities.",
};

export default function Page() {
  const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];
  const featuredCategory = blogCategory(featured);

  return (
    <>
      <ServiceHero
        eyebrow="Insights"
        h1="Practical Perspectives from Across Our Divisions"
        supportingCopy="Guidance, checklists and lessons from the people coordinating recovery, compliance, training, recruitment, accommodation and facilities every day."
        primaryButton="Browse Articles"
        secondaryButton="Speak to Our Team"
        primaryHref="#insights"
        secondaryHref="/contact"
        image={images.homepageWhyChoose}
      />

      <div id="insights" className="mx-auto max-w-content px-6 py-16 md:py-20">
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid md:grid-cols-2 gap-0 bg-white border border-line rounded-card overflow-hidden hover:shadow-lg hover:shadow-navy/10 transition-all mb-16"
        >
          <div className="relative h-64 md:h-full">
            <Image src={featured.coverImage} alt="" fill sizes="600px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/0 to-transparent md:bg-gradient-to-r" />
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            {featuredCategory && (
              <span className="inline-flex items-center gap-2 eyebrow text-navydeep bg-gold rounded-full px-4 py-1.5 mb-5 w-fit">
                {featuredCategory.name}
              </span>
            )}
            <p className="font-display text-2xl md:text-3xl text-navy leading-snug mb-3">{featured.title}</p>
            <p className="text-ink/70 leading-relaxed mb-5">{featured.excerpt}</p>
            <p className="text-xs text-muted mb-5">
              {formatBlogDate(featured.date)} <span aria-hidden="true">·</span> {estimateReadTime(featured.body)}
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
              Read the article
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </span>
          </div>
        </Link>

        <BlogIndexGrid posts={blogPosts} />
      </div>

      <CTASection heading="Have a Question for Our Team?" body="Speak to us about workforce solutions, consultancy, recovery coordination or training for your organisation or family." />
    </>
  );
}
