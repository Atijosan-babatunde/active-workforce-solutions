import { getDivision } from "@/lib/content/divisions";
import { images } from "@/lib/content/images";

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; attribution?: string };

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  /** Division slug — drives the category badge's colour, icon and label. */
  division: string;
  author: string;
  authorRole: string;
  /** ISO date, e.g. "2026-06-02" */
  date: string;
  coverImage: string;
  featured?: boolean;
  body: BlogBlock[];
};

// NOTE for Babatunde: these six posts are illustrative placeholder content —
// real, on-brand and useful, but written in-house rather than supplied by
// the client. Swap in real posts from the client's marketing/editorial team
// when available; the page structure and design won't need to change.
export const blogPosts: BlogPost[] = [
  {
    slug: "first-48-hours-after-hospital-discharge",
    title: "A Practical Checklist for the First 48 Hours After Hospital Discharge",
    seoTitle: "The First 48 Hours After Hospital Discharge | Active Workforce Solutions",
    seoDescription: "The practical details that get missed in the rush of discharge are often the ones that matter most at home. Here's what to have in place before the car leaves the hospital.",
    excerpt: "The details that get missed in the rush of discharge are often the ones that matter most at home. Here's what to have in place before the car pulls away from the hospital.",
    division: "active-recovery-concierge",
    author: "Active Workforce Solutions Team",
    authorRole: "Active Recovery Concierge",
    date: "2026-06-02",
    coverImage: images.recovery["post-hospital-recovery-support"],
    featured: true,
    body: [
      { type: "paragraph", text: "Hospital discharge tends to move faster than people expect. A ward round confirms someone is medically fit to leave, and within a few hours they're in a car heading home — often before the practical side of that transition has been properly thought through. It isn't the clinical care that gets missed in this rush. It's the ordinary logistics: who's collecting the prescription, whether there's food in the house, whether the stairs are going to be a problem on day one." },
      { type: "heading", text: "Before you leave the ward" },
      { type: "list", items: [
        "Confirm the discharge letter, any follow-up appointments and who to contact if something changes.",
        "Arrange transport that suits the person's mobility that day, not their usual mobility.",
        "Check medication has actually been dispensed, not just prescribed.",
        "Agree who is meeting them at home, and what time.",
        "Ask what 'red flag' symptoms should prompt urgent medical contact, in writing if possible.",
      ] },
      { type: "heading", text: "The first evening at home" },
      { type: "paragraph", text: "The first evening is usually the point where gaps show up: no easy meals in the house, a cold house because no one thought to put the heating on, stairs that looked manageable in the hospital corridor and aren't at 9pm when everyone's tired. None of this is complicated to plan for. It just has to be planned for before the person walks through the door, not after." },
      { type: "quote", text: "A well organised first 48 hours doesn't prevent every setback — but it removes the ones that were entirely avoidable.", attribution: "Active Recovery Concierge" },
      { type: "heading", text: "When it's worth having someone coordinate this for you" },
      { type: "paragraph", text: "Families are often managing this alongside work, childcare and their own worry about the person recovering, which is exactly when small details get missed. This is the specific gap Active Recovery Concierge exists to close — one point of contact who checks the practical arrangements are actually in place, coordinates with hospital teams where appropriate, and gives everyone a clear plan for the days that matter most. It's non-clinical, practical support, built around the fact that a smooth first 48 hours makes a measurable difference to how the following weeks go." },
    ],
  },
  {
    slug: "five-signs-your-care-provider-needs-compliance-support",
    title: "Five Early Signs a Care Provider Needs Compliance Support",
    seoTitle: "Five Early Signs a Care Provider Needs Compliance Support | Active Workforce Solutions",
    seoDescription: "Compliance problems rarely appear overnight. These are the early, practical warning signs worth acting on before they become findings in an inspection report.",
    excerpt: "Compliance problems rarely appear overnight. These are the early, practical warning signs worth acting on before they show up in an inspection report.",
    division: "active-provider-solutions",
    author: "Active Workforce Solutions Team",
    authorRole: "Active Provider Solutions",
    date: "2026-06-18",
    coverImage: images.providerSolutionsSecondary,
    body: [
      { type: "paragraph", text: "Most compliance issues that surface in an inspection didn't appear that week. They built up quietly over months, usually because a growing organisation kept adding services, staff or locations faster than its systems could keep up. The good news is that the same slow build-up is usually visible well in advance, if you know what to look for." },
      { type: "heading", text: "The five signs" },
      { type: "list", items: [
        "Policies exist but staff can't describe how they apply day-to-day.",
        "Audits happen, but findings from the last one are still open when the next one starts.",
        "Registered managers are spending more time firefighting than reviewing.",
        "Onboarding and induction have quietly become inconsistent across sites or shifts.",
        "Growth (new contracts, new locations, new services) has outpaced the governance structure supporting it.",
      ] },
      { type: "heading", text: "Why this matters before an inspection, not during one" },
      { type: "paragraph", text: "Once an inspection is scheduled, the options narrow considerably. The value of catching these signs early is that fixing them becomes a planning exercise rather than a crisis response — a proper audit, a realistic action plan, and time to actually embed the change rather than paper over it." },
      { type: "quote", text: "The providers who handle inspections well aren't the ones with the fewest problems. They're the ones who already knew what their problems were.", attribution: "Active Provider Solutions" },
      { type: "paragraph", text: "Active Provider Solutions works alongside registered managers and leadership teams to get an honest, practical read on where things stand — and a workable plan to close the gaps, sized to what the organisation can actually sustain rather than a generic template." },
    ],
  },
  {
    slug: "building-a-training-culture-that-sticks",
    title: "Building a Training Culture That Actually Sticks",
    seoTitle: "Building a Training Culture That Actually Sticks | Active Workforce Solutions",
    seoDescription: "Mandatory training gets completed. It doesn't always get used. Here's the difference between a course being delivered and a training culture actually taking hold.",
    excerpt: "Mandatory training gets completed. It doesn't always get used. Here's the difference between a course being delivered and a training culture that actually takes hold.",
    division: "active-quality-academy",
    author: "Active Workforce Solutions Team",
    authorRole: "Active Quality Academy",
    date: "2026-07-09",
    coverImage: images.qualityAcademySecondary,
    body: [
      { type: "paragraph", text: "Almost every care and support organisation can show a completion rate for mandatory training. Far fewer can show that the training changed anything about how staff actually work. Those are two very different measures of success, and conflating them is one of the most common — and most avoidable — mistakes in workforce development." },
      { type: "heading", text: "What tends to go wrong" },
      { type: "paragraph", text: "Generic course content, delivered once a year, disconnected from the specific standards and situations staff face on shift, produces exactly what you'd expect: a certificate, and not much behaviour change. Staff can pass a module and still handle a real situation the way they always have." },
      { type: "heading", text: "What actually builds a training culture" },
      { type: "list", items: [
        "Training built around real scenarios from the organisation's own settings, not generic case studies.",
        "Short, regular refreshers rather than one annual session covering everything at once.",
        "Managers who reference training explicitly during supervision, not just at appraisal time.",
        "A clear line between what was taught and what's expected to change in practice.",
        "Leadership and quality-improvement pathways, not just induction and mandatory modules.",
      ] },
      { type: "quote", text: "A training culture isn't a course calendar. It's what staff do differently three months after the course finished.", attribution: "Active Quality Academy" },
      { type: "paragraph", text: "Active Quality Academy builds training programmes around the standards an organisation is actually held to and the situations its staff actually face, from induction through to leadership development, so completion rates and real capability start to mean the same thing." },
    ],
  },
  {
    slug: "what-good-workforce-matching-looks-like",
    title: "What Good Workforce Matching Actually Looks Like",
    seoTitle: "What Good Workforce Matching Actually Looks Like | Active Workforce Solutions",
    seoDescription: "Filling a shift and filling it properly aren't the same thing. Here's what separates recruitment that solves a problem from recruitment that just moves it.",
    excerpt: "Filling a shift and filling it properly aren't the same thing. Here's what separates recruitment that solves a problem from recruitment that just moves it.",
    division: "active-workforce-recruitment",
    author: "Active Workforce Solutions Team",
    authorRole: "Active Workforce Recruitment",
    date: "2026-07-24",
    coverImage: images.workforceRecruitmentSecondary,
    body: [
      { type: "paragraph", text: "It's entirely possible to fill a vacancy and make the underlying problem worse. A candidate who's technically available but the wrong fit for the team, the shift pattern or the setting tends to leave within months — and the organisation is back where it started, minus the time and cost of the first placement." },
      { type: "heading", text: "Availability isn't the same as fit" },
      { type: "paragraph", text: "Good matching starts with questions most recruitment processes skip: what does this team actually need beyond the job title, what's realistic about the shift pattern being offered, and what has caused turnover in this role before. Those answers shape who's worth putting forward far more than a keyword match against a CV." },
      { type: "heading", text: "The questions worth asking before a single CV is sent" },
      { type: "list", items: [
        "What specifically has gone wrong with previous hires in this role, if anything?",
        "Is the shift pattern being offered actually sustainable for the kind of candidate being sought?",
        "What does 'the right fit' mean for this specific team, beyond qualifications?",
        "Is this a one-off hire or the start of an ongoing staffing need?",
      ] },
      { type: "quote", text: "A candidate who's available today and gone in three months hasn't solved a staffing problem. They've deferred it.", attribution: "Active Workforce Recruitment" },
      { type: "paragraph", text: "Active Workforce Recruitment treats every vacancy this way, whether it's a single urgent hire or an ongoing staffing partnership — properly vetted candidates matched against what the role and team actually need, not just who happens to be free." },
    ],
  },
  {
    slug: "sourcing-accommodation-under-time-pressure",
    title: "Sourcing Suitable Accommodation Under Time Pressure",
    seoTitle: "Sourcing Suitable Accommodation Under Time Pressure | Active Workforce Solutions",
    seoDescription: "When accommodation is needed quickly, it's easy to solve for available and end up with unsuitable. Here's how to keep both requirements in view under pressure.",
    excerpt: "When accommodation is needed quickly, it's easy to solve for available and end up with unsuitable. Here's how to keep both requirements in view under pressure.",
    division: "active-accommodation-solutions",
    author: "Active Workforce Solutions Team",
    authorRole: "Active Accommodation Solutions",
    date: "2026-08-05",
    coverImage: images.accommodationSecondary,
    body: [
      { type: "paragraph", text: "Accommodation requests rarely arrive with plenty of notice. A placement needs to start next week, a professional is relocating for a short contract, a family needs somewhere suitable near a hospital and needs it now. Under that kind of time pressure, the temptation is to solve for whatever is available — and worry about suitability afterwards." },
      { type: "heading", text: "Why that trade-off backfires" },
      { type: "paragraph", text: "Accommodation that doesn't actually fit the requirement — wrong location, wrong access needs, wrong length of tenancy — tends to generate a second, more urgent search a few weeks later, usually with even less notice than the first one. Speed and suitability aren't actually in conflict; they just require someone running both searches in parallel from the start." },
      { type: "heading", text: "What to have clear before the search starts" },
      { type: "list", items: [
        "The genuinely non-negotiable requirements versus the merely preferred ones.",
        "Length of stay — a true short-term need should not become a rolling monthly rebooking.",
        "Access, mobility or proximity requirements stated explicitly, not assumed.",
        "Who is responsible for utilities, cleaning and any ongoing coordination once someone moves in.",
      ] },
      { type: "quote", text: "Fast and suitable aren't opposites. They just need someone coordinating both from day one.", attribution: "Active Accommodation Solutions" },
      { type: "paragraph", text: "Active Accommodation Solutions handles exactly this kind of search — sourcing, liaison and the practical arrangements from first enquiry through to move-in, for individuals, families and organisations who need accommodation arranged properly, even when the timeline is tight." },
    ],
  },
  {
    slug: "keeping-facilities-running-without-chaos",
    title: "Keeping Facilities Running Without the Chaos of Multiple Contractors",
    seoTitle: "Keeping Facilities Running Without Contractor Chaos | Active Workforce Solutions",
    seoDescription: "Every extra contractor is another phone call, another invoice and another handoff that can go wrong. Here's why one point of coordination changes how facilities actually run.",
    excerpt: "Every extra contractor is another phone call, another invoice and another handoff that can go wrong. Here's why one point of coordination changes how facilities actually run.",
    division: "active-facilities",
    author: "Active Workforce Solutions Team",
    authorRole: "Active Facilities",
    date: "2026-08-19",
    coverImage: images.facilitiesSecondary,
    body: [
      { type: "paragraph", text: "Most facilities problems aren't caused by any single contractor doing a bad job. They're caused by the gaps between contractors — the cleaning company that doesn't talk to the maintenance company, the site manager fielding five separate invoices and five separate excuses when something's missed, and no one person actually accountable for the premises as a whole." },
      { type: "heading", text: "The real cost of fragmentation" },
      { type: "paragraph", text: "Each additional contractor relationship adds coordination overhead that rarely shows up on a line-item invoice: the phone calls chasing a no-show, the meetings spent working out whose responsibility a problem actually was, the site manager's time spent managing suppliers instead of running the site." },
      { type: "heading", text: "What one point of coordination actually changes" },
      { type: "list", items: [
        "One escalation route when something goes wrong, instead of working out who to call.",
        "Consistent standards across cleaning, maintenance and wider premises support.",
        "A single point of accountability for the site, not a diffusion of responsibility across suppliers.",
        "Time given back to site and operations managers who were never meant to be facilities coordinators.",
      ] },
      { type: "quote", text: "The goal isn't a longer list of contractors doing good work. It's a shorter list of people you have to call when something goes wrong.", attribution: "Active Facilities" },
      { type: "paragraph", text: "Active Facilities provides exactly that — dependable facilities management and support, from routine maintenance and cleaning standards to wider premises coordination, so operational sites run smoothly without constant oversight from your own team." },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(current: BlogPost, limit = 3): BlogPost[] {
  const sameDivision = blogPosts.filter((p) => p.division === current.division && p.slug !== current.slug);
  const others = blogPosts.filter((p) => p.division !== current.division && p.slug !== current.slug);
  return [...sameDivision, ...others].slice(0, limit);
}

export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function wordCount(body: BlogBlock[]): number {
  return body.reduce((sum, block) => {
    if (block.type === "list") return sum + block.items.join(" ").split(/\s+/).filter(Boolean).length;
    return sum + block.text.split(/\s+/).filter(Boolean).length;
  }, 0);
}

export function estimateReadTime(body: BlogBlock[]): string {
  const minutes = Math.max(1, Math.round(wordCount(body) / 200));
  return `${minutes} min read`;
}

export function blogCategory(post: BlogPost) {
  return getDivision(post.division);
}
