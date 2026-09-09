export type Section = {
  heading: string;
  /** A short pull-quote/question shown above the body, styled larger and distinct from ordinary copy. */
  quote?: string;
  body?: string;
  list?: string[];
  downloads?: { label: string; href: string }[];
  /** Sub-headed mini-sections within one themed card (e.g. the areas ARC supports with). */
  subsections?: { heading: string; body: string }[];
  /** A numbered process (e.g. "The ARC Approach"). */
  steps?: { title: string; body: string }[];
  /** Bold-label + description pairs (e.g. desired outcomes). */
  outcomes?: { label: string; body: string }[];
  /** "From → to" transformation pairs. */
  transformations?: { from: string; to: string }[];
  /** A short, bolded closing line — e.g. a scenario's "desired outcome". */
  outcome?: string;
};

export type FAQ = { q: string; a: string };

export type ServicePage = {
  slug: string;
  title: string; // used in nav / cards
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  h1: string;
  supportingCopy: string;
  primaryButton: string;
  secondaryButton: string;
  /** Where the hero buttons actually go. Both default to the contact wizard if omitted — set explicitly whenever the label promises something more specific (a download, another page). */
  primaryHref?: string;
  secondaryHref?: string;
  sections: Section[];
  faqs: FAQ[];
  formFields: string[];
};

export const recoveryConciergePages: ServicePage[] = [
  {
    slug: "active-recovery-concierge",
    title: "Overview",
    seoTitle: "Active Recovery Concierge | Recovery Coordination & Planning",
    seoDescription: "Recovery doesn't end when you leave the hospital. ARC helps individuals and families manage everything that happens next — a dedicated, non-clinical recovery coordination service.",
    eyebrow: "Active Recovery Concierge",
    h1: "Recovery Doesn't End When You Leave the Hospital",
    supportingCopy: "We help you manage everything that happens next. A hospital discharge, an operation, a sudden illness, an accident or a change in mobility or independence can turn everyday life upside down — we become the organising hand behind the recovery journey.",
    primaryButton: "Book Your ARC Recovery Consultation",
    secondaryButton: "Explore How It Works",
    secondaryHref: "/active-recovery-concierge/how-it-works",
    sections: [
      {
        heading: "We Help You Manage Everything That Happens Next",
        list: [
          "A hospital discharge.",
          "An operation.",
          "A sudden illness.",
          "An accident.",
          "A change in mobility or independence.",
          "A loved one who suddenly needs more support.",
        ],
        body: "These moments can turn everyday life upside down. There may be appointments to organise, transport to arrange, equipment to source, a home to prepare, prescriptions to collect, professionals to contact, family members to update and important decisions to make, often while the person affected is tired, worried, in pain or simply trying to recover. That is where Active Recovery Concierge — ARC — comes in. We provide a dedicated, non-clinical recovery coordination service that helps individuals and families organise the practical side of recovery. We become the organising hand behind the recovery journey — helping make sure plans are clear, arrangements are made, responsibilities are understood and important things do not fall through the gaps.",
        outcome: "You focus on getting better. We help organise what getting better requires.",
      },
      {
        heading: "The Gap We Exist to Solve",
        quote: "\"They said I can go home… but what happens when I actually get there?\"",
        body: "This is one of the biggest gaps in recovery. Hospitals and clinical professionals understandably focus on diagnosis, treatment and clinical discharge. But recovery happens largely outside the hospital, at home — and that is where practical problems often begin.",
        list: [
          "Who is collecting you?",
          "Is your home ready?",
          "Who will collect your prescription?",
          "How will you get to your follow-up appointment?",
          "What equipment has been recommended?",
          "Who is keeping track of the different professionals involved?",
          "Does your family understand the discharge instructions?",
          "Who is arranging additional services?",
          "What happens when your daughter lives three hours away?",
          "What happens when your partner is working?",
          "What happens when you live alone?",
          "And what happens when everyone assumes somebody else is dealing with it?",
        ],
        outcome: "ARC exists for that space. We help turn a collection of instructions, appointments, responsibilities and worries into a clear, coordinated recovery plan.",
      },
      {
        heading: "Real Life Doesn't Stop Because You Are Recovering",
        body: "Imagine you are having a hip replacement next Thursday. Your surgeon has explained the procedure and the hospital has given you information. But you live alone. Your bedroom is upstairs, you normally drive yourself everywhere, you have groceries to organise, you may need temporary equipment, and your daughter lives in another city and is worried about leaving you alone. Then there are follow-up appointments, transport, household tasks and the question nobody has really answered: \"How am I actually going to manage all this?\" ARC can work with you before your procedure to identify the practical challenges likely to affect your recovery, create your recovery coordination plan and help organise the arrangements you need. Instead of coming home and discovering problems one by one, you come home to a plan.",
        outcome: "The desired outcome: a safer, calmer and better-organised transition home, with fewer avoidable surprises and greater confidence about what happens next.",
      },
      {
        heading: "“My Mum Has Been Discharged and I Don’t Know Where to Start.”",
        body: "Perhaps your mother has been admitted following a fall. She is medically ready to leave hospital, but she isn't quite as independent as she was before. Suddenly the family WhatsApp group is full of questions: who is staying with Mum, has anyone spoken to the therapist, who is getting her medication, does she need equipment, who is taking her back to hospital next Tuesday, has anybody arranged someone to help at home. One sibling thinks another sibling is doing it. Everyone loves Mum, everyone wants to help — but everyone also has jobs, children and responsibilities of their own. Love is present. Coordination is missing. That is exactly the kind of problem ARC was created to solve. With the individual's consent, we can help bring the practical arrangements together, establish what needs to happen, identify who is responsible for each action, coordinate agreed services and keep nominated family members appropriately informed.",
        outcome: "The desired outcome: less confusion, less pressure on the family and a more coordinated recovery journey for Mum.",
      },
      {
        heading: "“I Live Abroad. My Parents Are in the UK. I Need Someone I Can Rely On.”",
        body: "Distance can make a family health crisis incredibly difficult. You may be in Nigeria, Canada, Dubai, America or elsewhere while your parent is recovering in the UK. You cannot simply leave work and board a plane every time something needs arranging, but you also don't want to spend every day wondering: \"Is everything actually being sorted?\" Subject to consent and the agreed scope of our service, ARC can act as your UK-based recovery coordinator. We can help organise agreed practical arrangements, coordinate appointments and transport, communicate with relevant providers, follow up outstanding actions and provide agreed updates to the family. We do not replace relatives, doctors, nurses or regulated care providers — we help connect the moving pieces around them.",
        outcome: "The desired outcome: greater reassurance for families at a distance and a clearer, more organised recovery experience for the person they love.",
      },
      {
        heading: "“I’m Having Surgery Privately. I Want the Whole Experience Managed Properly.”",
        body: "Perhaps the problem isn't lack of family support — perhaps you simply value your time, privacy and convenience. You have arranged your procedure, and you don't want to spend the days before surgery organising transport, chasing arrangements, making endless telephone calls and coordinating everything yourself. After surgery, you certainly don't want recovery to become another project to manage. Our Private Recovery Concierge service can coordinate the practical aspects of your recovery around you. From pre-procedure preparation and home-readiness planning to transport, appointments, practical services and recovery check-ins, ARC provides a discreet central point of coordination.",
        outcome: "The desired outcome: a smoother, more private and professionally coordinated recovery experience.",
      },
      {
        heading: "What Exactly Does ARC Do?",
        body: "Every recovery journey is different, so our support begins by understanding your situation rather than selling you a standard package. We identify the practical problems, risks, responsibilities and gaps surrounding your recovery and develop an agreed plan. Depending on your circumstances, ARC can support with:",
        subsections: [
          { heading: "Pre-Surgery & Pre-Discharge Planning", body: "We help you think ahead — what will you need when you return home, who will be available, what practical difficulties could arise and what arrangements need to be made before discharge. Our aim is to identify avoidable problems before they become stressful problems." },
          { heading: "Your Personal Recovery Coordination Plan", body: "We bring important actions into one organised plan — appointments, transport, practical arrangements, family responsibilities, external providers, outstanding actions and important dates. You know what needs to happen, who is responsible and what still needs attention." },
          { heading: "Home-Readiness Coordination", body: "Returning home can expose practical problems that were easy to overlook before an illness or procedure. We help identify home-readiness requirements and coordinate agreed practical services or specialist assessments where appropriate." },
          { heading: "Appointment & Transport Coordination", body: "Multiple appointments can quickly become confusing. We can help organise diaries, appointment logistics and suitable transport arrangements so that recovery does not become an endless series of last-minute phone calls." },
          { heading: "Family Coordination", body: "Families want to help, but multiple people trying to organise the same recovery can sometimes create more confusion. With appropriate consent, ARC can provide a central coordination point, clarify agreed responsibilities and provide agreed updates." },
          { heading: "Finding & Coordinating Appropriate Services", body: "Sometimes recovery requires services outside ARC's own scope. Where appropriate, we can help identify and coordinate suitable external providers or refer you to appropriately regulated or specialist organisations. We don't pretend to provide services that require qualifications or regulation we do not hold — we help you find the right people and help bring the plan together." },
          { heading: "Recovery Reviews & Problem Solving", body: "Recovery rarely follows a perfectly straight line. Circumstances change, something planned may no longer work, a new problem may arise. Our coordination can continue throughout the agreed recovery period, reviewing practical arrangements and helping resolve emerging issues." },
        ],
      },
      {
        heading: "We Don’t Just Ask “What Service Do You Want?”",
        quote: "We ask: “What is making recovery difficult right now?”",
        body: "That difference matters. Someone might call us asking for transport. But after speaking with them, we may discover that transport isn't really the problem — the actual problem is that Dad has six appointments with four different services, Mum doesn't drive, the children live outside the area, nobody knows which appointments are essential and the family has no central plan. The solution isn't simply a taxi. The solution is coordination. Another client may initially ask for help after an operation, but the real concerns may be:",
        list: [
          "“I live alone.”",
          "“I won't be able to drive.”",
          "“My dog still needs walking.”",
          "“I don't know how I'll manage shopping.”",
          "“My family can't take two weeks off work.”",
          "“I don't know who to call if something isn't working.”",
        ],
        outcome: "These are the everyday realities that can turn recovery into stress. ARC looks at the whole practical picture.",
      },
      {
        heading: "The ARC Approach",
        body: "From overwhelmed to organised.",
        steps: [
          { title: "Tell us what is happening", body: "You or your family contact ARC and explain the situation. You don't need to know exactly what service you need — start by telling us what is worrying you." },
          { title: "We identify the gaps", body: "We explore what is already in place, what still needs organising and where practical problems could arise." },
          { title: "We build your ARC Recovery Plan", body: "Together, we agree priorities, actions, responsibilities and the level of coordination you require." },
          { title: "We help put the plan into action", body: "ARC coordinates the agreed practical arrangements and liaises with relevant people and services within the scope you have authorised." },
          { title: "We follow through", body: "Making a referral or telephone call is not the same as solving a problem. Where included in your service, we follow agreed actions through, keep track of outstanding arrangements and help address practical gaps that emerge." },
          { title: "We help you move towards independence", body: "The aim is not to make you permanently dependent on ARC — it's to help create enough organisation, stability and confidence around your recovery that life can progressively become manageable again." },
        ],
      },
      {
        heading: "What Are We Trying to Achieve?",
        body: "Our desired outcomes are simple but powerful:",
        outcomes: [
          { label: "Less overwhelm.", body: "You and your family have a clearer understanding of what is happening and what needs to happen next." },
          { label: "Fewer gaps.", body: "Important practical arrangements are less likely to be forgotten between different people and organisations." },
          { label: "Better preparation.", body: "Potential difficulties can be identified before discharge, surgery or the next stage of recovery." },
          { label: "Greater family reassurance.", body: "Relatives can know there is an agreed plan and a central coordination point." },
          { label: "More confidence at home.", body: "Returning home should feel like the next stage of recovery — not the beginning of another crisis." },
          { label: "More time and energy for recovery.", body: "Instead of spending your recovery making calls, chasing arrangements and trying to organise everyone, you can concentrate more of your energy on yourself." },
          { label: "Progress towards independence.", body: "Where possible, everything we coordinate should ultimately support one important goal — helping you regain control of everyday life." },
        ],
      },
      {
        heading: "ARC Is Not a Replacement for Healthcare",
        body: "Active Recovery Concierge is a non-clinical recovery coordination service. We do not replace your GP, hospital team, nurses, therapists, emergency services or regulated care providers, and we do not diagnose medical conditions or provide clinical treatment. Where clinical, personal-care, safeguarding or other regulated/specialist needs are identified, we help signpost, refer or coordinate with appropriate providers within the agreed scope of our service.",
        outcome: "This boundary is important — it means ARC can concentrate on what we are designed to do exceptionally well: organising the practical world around your recovery.",
      },
      {
        heading: "Who Is ARC For?",
        body: "ARC may be particularly valuable if:",
        list: [
          "You are preparing for surgery and want everything organised before you return home.",
          "You have recently been discharged from hospital and are struggling with the practical arrangements.",
          "You live alone and don't have someone nearby who can coordinate everything.",
          "Your parent or relative needs help organising life after illness or hospitalisation.",
          "Your family members are trying to help but responsibilities have become confusing or overwhelming.",
          "You live far away from the person recovering and need trusted local coordination.",
          "You are a busy professional or executive who wants discreet, efficient recovery arrangements.",
          "You are travelling to the UK for treatment and need practical recovery logistics coordinated.",
          "Your health has improved enough to leave hospital, but everyday life hasn't yet caught up.",
        ],
        outcome: "Or perhaps you simply think: “I can probably organise all of this myself — but right now, I really don't want to have to.” That's enough reason to call us.",
      },
      {
        heading: "For Families",
        quote: "You can love someone deeply and still need help coordinating everything.",
        body: "Being a son, daughter, husband, wife, sibling or friend does not automatically make you a discharge coordinator, transport planner, appointment manager and service navigator. Sometimes the best way to support someone you love is to bring in another pair of capable hands. ARC doesn't replace family.",
        outcome: "We give families room to be family again.",
      },
      {
        heading: "For Hospitals, Discharge Teams & Health Professionals",
        quote: "When the clinical plan is ready but practical life still needs organising.",
        body: "Some individuals are medically ready to progress but remain anxious about the practical realities surrounding recovery. ARC can provide an additional non-clinical coordination option for suitable individuals and families who want privately arranged practical recovery support. We can support areas such as pre-discharge practical planning, recovery logistics, family coordination, appointment organisation, transport arrangements, home-readiness coordination and connection with appropriate external services. Professionals can contact us to discuss whether ARC may be appropriate for an individual or family.",
        outcome: "ARC is designed to complement — not duplicate or replace — statutory, clinical or regulated services.",
      },
      {
        heading: "For Executives, Private Clients & International Families",
        quote: "Recovery with discretion.",
        body: "Health events do not respect diaries, businesses or international borders. Our concierge approach is designed for clients who require additional privacy, convenience and personal coordination. We can develop a bespoke recovery coordination arrangement around the individual's circumstances, treatment pathway, location and family situation. Whether you are a busy executive, an international patient recovering in the UK or a family coordinating support for someone from overseas, ARC can provide a consistent point of contact for the agreed non-clinical aspects of the recovery journey.",
      },
      {
        heading: "Why Active Recovery Concierge?",
        body: "Because recovery is bigger than medicine. It is the journey from:",
        transformations: [
          { from: "Hospital", to: "Home" },
          { from: "Treatment", to: "Recovery" },
          { from: "Dependence", to: "Independence" },
          { from: "Confusion", to: "Clarity" },
          { from: "Overwhelm", to: "Organisation" },
          { from: "“How are we going to manage?”", to: "“We have a plan.”" },
        ],
        outcome: "That journey contains hundreds of small practical details, and sometimes those small details determine whether recovery feels manageable or overwhelming. ARC exists to help make those details work.",
      },
      {
        heading: "You Don’t Have to Have Everything Figured Out Before You Call Us",
        body: "In fact, that is exactly why we are here.",
        list: [
          "Perhaps you don't know what you need yet.",
          "Perhaps discharge is tomorrow.",
          "Perhaps surgery is three weeks away.",
          "Perhaps Mum came home yesterday and things simply aren't working.",
          "Perhaps your family has been managing for weeks and everyone is exhausted.",
          "Email: arc@activeworkforcesolutions.com",
          "Telephone: 07943 553777",
        ],
        outcome: "Tell us what is happening. Tell us what you are worried about. Tell us what isn't working. We'll start there.",
      },
    ],
    faqs: [
      { q: "Is this a medical service?", a: "No. Active Recovery Concierge provides non clinical planning, practical coordination and onward referral. Clinical advice, treatment and regulated care remain the responsibility of appropriately qualified providers." },
      { q: "Can you work with my hospital or consultant?", a: "Yes, with your consent and subject to the professional's cooperation. We can coordinate practical information, appointments and agreed arrangements while respecting clinical boundaries and confidentiality." },
      { q: "Can you arrange care at home?", a: "We can help identify requirements, organise enquiries and coordinate introductions to appropriate providers. Any regulated care must be delivered by a suitably registered provider." },
      { q: "Do you support people outside your local area?", a: "The service can be delivered through a combination of remote coordination and agreed local arrangements. Availability depends on the location and complexity of the request." },
      { q: "How quickly can support begin?", a: "Urgency is discussed during the initial enquiry. Planned recovery journeys are best arranged in advance, but we also consider time sensitive discharge and post operative requests where capacity allows." },
    ],
    formFields: ["Full name", "Telephone number", "Email address", "Who is the support for?", "Current location or hospital", "Expected surgery or discharge date", "Type of support required", "Preferred contact method", "Optional professional referrer details"],
  },
  {
    slug: "post-hospital-recovery-support",
    title: "Post Hospital Recovery Support",
    seoTitle: "Post Hospital Recovery Support | Active Recovery Concierge",
    seoDescription: "Practical, non-clinical coordination for a smoother, better organised return home after hospital treatment.",
    eyebrow: "Active Recovery Concierge",
    h1: "A More Organised Return Home After Hospital",
    supportingCopy: "Hospital discharge can happen quickly, while the practical arrangements needed at home may still feel unclear. We help clients and families organise the non-clinical details, understand the plan and coordinate the next steps.",
    primaryButton: "Request Support",
    secondaryButton: "View the Discharge Checklist",
    secondaryHref: "/active-recovery-concierge-client-preparation-guide.pdf",
    sections: [
      { heading: "Before discharge", body: "We begin by clarifying the expected discharge plan, the client's priorities, practical concerns, key contacts and any actions that must be completed before returning home." },
      { heading: "Preparing the home", body: "Depending on the agreed scope, we can coordinate practical preparations such as essential shopping, access arrangements, household readiness, equipment liaison, transport and contact with chosen providers." },
      { heading: "The first days at home", body: "We create a practical schedule covering appointments, contacts, medication collection arrangements as directed by professionals, meals, transport, family roles and escalation contacts. We do not provide clinical advice or alter medical instructions." },
      { heading: "Keeping everyone informed", body: "With consent, we can provide agreed updates to relatives and maintain one shared recovery plan so that responsibilities and next steps remain clear." },
      { heading: "When additional support is required", body: "Where the person requires nursing, personal care, therapy or another regulated service, we help coordinate enquiries and introductions to appropriately qualified organisations." },
      { heading: "Outcome", body: "The objective is a smoother transition, fewer missed practical details and greater confidence for the person returning home and the people supporting them." },
    ],
    faqs: [
      { q: "Can you attend a discharge meeting?", a: "Where appropriate and agreed in advance, we may attend or join a discharge planning discussion in a non-clinical coordination role." },
      { q: "Can you collect prescriptions?", a: "We may coordinate collection or delivery arrangements where lawful and appropriate, but we do not provide pharmacy advice or manage medication clinically." },
      { q: "What happens if the person becomes unwell?", a: "Urgent medical concerns must be directed to the appropriate emergency or clinical service. Our recovery plan will identify the relevant escalation contacts provided by the client or professionals." },
    ],
    formFields: ["Patient or client name", "Hospital and ward, if applicable", "Expected discharge date", "Home postcode", "Main family contact", "Known practical concerns", "Services already arranged", "Professional contact details", "Urgency"],
  },
  {
    slug: "post-operative-recovery-coordination",
    title: "Post-Operative Recovery Coordination",
    seoTitle: "Post-Operative Recovery Coordination | Active Recovery Concierge",
    seoDescription: "Personalised planning before surgery and coordinated practical support through discharge, early recovery and return to routine.",
    eyebrow: "Active Recovery Concierge",
    h1: "Prepare for Surgery. Return Home with a Clear Plan.",
    supportingCopy: "A successful recovery journey begins before the operation. We help clients organise the practical details, prepare the home environment, coordinate appointments and create a personalised plan for the days and weeks after surgery.",
    primaryButton: "Plan My Recovery",
    secondaryButton: "Download the Preparation Guide",
    secondaryHref: "/active-recovery-concierge-client-preparation-guide.pdf",
    sections: [
      { heading: "Four stages of support", body: "Our post operative coordination can begin before surgery and continue through discharge, early recovery and transition back to normal routines." },
      { heading: "Stage 1: Prepare", body: "We clarify dates, transport, accommodation, household arrangements, essential items, family roles and professional contacts." },
      { heading: "Stage 2: Return", body: "We coordinate agreed transport and home readiness arrangements, helping ensure that the practical transition is organised." },
      { heading: "Stage 3: Recover", body: "We maintain the agreed schedule, appointments, practical support arrangements and communication plan, while clinical decisions remain with the treating professionals." },
      { heading: "Stage 4: Regain independence", body: "As the client becomes more confident, we help simplify the plan, reduce coordination and support a structured transition back to usual routines." },
      { heading: "Designed around the individual", body: "Every plan reflects the person's procedure, circumstances, home environment, support network, preferences and instructions from their clinical team." },
      { heading: "Discreet premium service", body: "For clients who value privacy and continuity, we provide a named coordinator, documented arrangements and carefully managed communication." },
    ],
    faqs: [
      { q: "Which types of surgery do you support?", a: "We consider a wide range of planned procedures. The service scope depends on the person's practical needs, location and the clinical instructions provided by their treating team." },
      { q: "Can you provide a carer after surgery?", a: "We can coordinate enquiries with appropriate providers. Any personal care or nursing must be delivered by a suitably registered and qualified service." },
      { q: "Can you guarantee a particular recovery time?", a: "No. Recovery varies and clinical outcomes are determined by many factors. We coordinate practical support around the instructions and expectations provided by the treating team." },
    ],
    formFields: ["Procedure or treatment", "Hospital or clinic", "Surgery date", "Expected discharge date", "Home location", "Living arrangements", "Family support available", "Practical support requested", "Professional contacts"],
  },
  {
    slug: "family-recovery-coordination",
    title: "Family Recovery Coordination",
    seoTitle: "Family Recovery Coordination | Active Recovery Concierge",
    seoDescription: "A trusted point of coordination for families managing a relative's recovery, wherever they are based.",
    eyebrow: "Active Recovery Concierge",
    h1: "Support for Your Relative, Clarity for the Whole Family",
    supportingCopy: "When someone you care about is recovering, families often become the organisers, communicators and problem-solvers. We provide a trusted point of coordination so responsibilities, appointments and practical arrangements are easier to manage.",
    primaryButton: "Talk to a Coordinator",
    secondaryButton: "See How Family Updates Work",
    secondaryHref: "/active-recovery-concierge/how-it-works",
    sections: [
      { heading: "When families are carrying too much", body: "Relatives may be balancing work, children, travel, complex family dynamics and concern about the person's wellbeing. Our role is to reduce avoidable practical pressure without removing the person's voice or independence." },
      { heading: "One agreed plan", body: "We create a documented plan that identifies priorities, actions, owners, dates and professional contacts. The client remains at the centre, and information is shared only with appropriate consent." },
      { heading: "Support for families who live far away", body: "Remote relatives can receive agreed updates, participate in planning and understand what has been arranged without needing to manage every call themselves." },
      { heading: "Respecting choice and confidentiality", body: "The person receiving support must be treated with dignity, involved in decisions and supported to exercise choice. We will not share confidential information simply because someone is a relative." },
      { heading: "Practical family coordination", body: "We can help organise visits, transport, household tasks, appointment diaries, questions for professionals and a shared understanding of who is doing what." },
      { heading: "A calmer family experience", body: "The aim is greater clarity, fewer duplicated efforts, reduced conflict and a recovery plan everyone can understand." },
    ],
    faqs: [
      { q: "Can I arrange support for my parent without them knowing?", a: "We can discuss general options with you, but a service involving the person will normally require their knowledge, consent and participation unless a lawful representative is acting on their behalf." },
      { q: "Will you update the whole family?", a: "Only people authorised by the client or lawful representative will receive information, and the content and frequency of updates will be agreed." },
      { q: "Can you make decisions for us?", a: "We facilitate planning and coordination. Legal, financial, clinical and best-interest decisions remain with the appropriate person or professional." },
    ],
    formFields: ["Your name and relationship", "Name of person needing support", "Does the person know about the enquiry?", "Current situation", "Location", "Main concerns", "Family members involved", "Preferred outcome"],
  },
  {
    slug: "executive-international-recovery-concierge",
    title: "Executive & International Recovery Concierge",
    seoTitle: "Executive & International Recovery Concierge | Active Recovery Concierge",
    seoDescription: "Discreet recovery coordination for clients managing demanding schedules, international travel or a high need for privacy.",
    eyebrow: "Active Recovery Concierge",
    h1: "Discreet Recovery Coordination for Complex Lives",
    supportingCopy: "For clients managing demanding schedules, international travel or a high need for privacy, recovery requires more than standard arrangements. We coordinate practical logistics with discretion, precision and a single trusted point of contact.",
    primaryButton: "Request a Private Consultation",
    secondaryButton: "Explore International Support",
    secondaryHref: "/active-recovery-concierge/how-it-works",
    sections: [
      { heading: "Designed for discretion", body: "Communication channels, authorised contacts and information sharing protocols are agreed at the outset. We minimise unnecessary disclosure and maintain professional boundaries." },
      { heading: "International coordination", body: "We can help organise practical arrangements around travel, accommodation, local transport, appointments, family communication and onward support, subject to legal and provider availability." },
      { heading: "Working with personal assistants and family offices", body: "Where authorised, we can coordinate with a client's PA, family office, employer, insurer or representative to ensure the plan is practical and aligned." },
      { heading: "Continuity across locations", body: "For clients recovering away from home or returning to another country, we document responsibilities, contacts, dates and transition requirements to reduce gaps." },
      { heading: "Premium does not mean clinical", body: "The service remains non-clinical. Medical care and regulated support are delivered by appropriately qualified professionals, with whom we coordinate where authorised." },
      { heading: "Bespoke engagement", body: "Scope, response expectations, reporting and fees are agreed in a written service proposal following a confidential consultation." },
    ],
    faqs: [
      { q: "Do you provide 24-hour availability?", a: "Any extended availability or out-of-hours coordination must be specifically agreed in the service proposal and is subject to capacity and pricing." },
      { q: "Can you support an international client receiving treatment in the UK?", a: "Yes, subject to the client's needs, immigration and travel arrangements, location, timing and the availability of appropriate providers." },
      { q: "Do you sign confidentiality agreements?", a: "We can consider reasonable confidentiality arrangements. These do not override legal, safeguarding, insurance or regulatory obligations." },
    ],
    formFields: ["Client or representative name", "Country of residence", "Treatment location", "Key dates", "Preferred language", "Travel and accommodation needs", "Authorised contacts", "Privacy requirements", "Scope requested", "Preferred consultation time"],
  },
  {
    slug: "professional-referral-partners",
    title: "Professional Referral Partners",
    seoTitle: "Professional Referral Partners | Active Recovery Concierge",
    seoDescription: "A trusted non-clinical coordination partner for hospitals, consultants, case managers, insurers and employers.",
    eyebrow: "Active Recovery Concierge",
    h1: "A Trusted Non-Clinical Coordination Partner for Recovery Journeys",
    supportingCopy: "Active Recovery Concierge helps bridge the practical gap between treatment and everyday recovery. We provide structured planning, coordination and communication for clients who need a clear, personalised pathway beyond the clinical setting.",
    primaryButton: "Discuss a Referral Pathway",
    secondaryButton: "Download the Referrer Overview",
    secondaryHref: "/active-recovery-concierge-brochure.docx",
    sections: [
      { heading: "The referral challenge", body: "Clinical teams and professional referrers often identify clients who are medically ready to progress but practically unprepared. Families may be overwhelmed, arrangements may be fragmented and there may be no single person coordinating the non-clinical details." },
      { heading: "Our role", body: "We provide a named coordinator, assess practical needs, document the plan, coordinate agreed actions and keep authorised parties informed. We do not duplicate clinical responsibility or regulated care." },
      {
        heading: "Suitable referrals",
        list: [
          "Planned surgery requiring pre- and post-operative coordination.",
          "Hospital discharge with significant practical arrangements.",
          "Clients whose families live at a distance.",
          "Private or international patients requiring discreet coordination.",
          "Executives or employees requiring structured return and recovery logistics.",
          "Cases where multiple non-clinical providers or appointments need coordination.",
        ],
      },
      { heading: "Referral information required", body: "Referrers should provide the client's consent, contact details, relevant dates, known practical needs, professional contacts, risk or safeguarding information appropriate to the referral and the expected outcome." },
      { heading: "Reporting", body: "Subject to consent and the agreed service, referrers may receive acknowledgement, a summary plan, milestone updates and closure information." },
      { heading: "Partnership options", body: "Options may include individual referrals, preferred provider arrangements, bespoke discharge pathways, employer funded recovery coordination and commissioned packages." },
    ],
    faqs: [
      { q: "Do you accept urgent referrals?", a: "Urgent referrals are considered according to capacity, location, risk and the clarity of the requested scope. We are not an emergency service." },
      { q: "What governance information is available?", a: "We can provide service scope, insurance details, privacy information, safeguarding arrangements, complaints process and relevant policies during due diligence." },
      { q: "Can you work under a service-level agreement?", a: "Yes, where the scope, responsibilities, response standards, reporting, data processing and fees are agreed in writing." },
    ],
    formFields: ["Organisation", "Referrer name and role", "Contact details", "Client name and consent status", "Referral reason", "Key dates", "Location", "Known risks or safeguarding concerns", "Other professionals involved", "Funding route", "Documents available"],
  },
  {
    slug: "how-it-works",
    title: "How It Works",
    seoTitle: "How It Works | Active Recovery Concierge",
    seoDescription: "A clear, structured recovery pathway from first enquiry through to confident transition.",
    eyebrow: "Active Recovery Concierge",
    h1: "A Clear Process from First Conversation to Confident Transition",
    supportingCopy: "Our structured recovery pathway helps clients understand what will happen, what information is needed and how the service will adapt as recovery progresses.",
    primaryButton: "Start Your Recovery Plan",
    secondaryButton: "Ask a Question",
    secondaryHref: "/contact?division=active-recovery-concierge",
    sections: [
      { heading: "Step 1: Enquire", body: "Tell us what is happening, the key dates, the location and the practical concerns. We will confirm whether the request appears to fit our service." },
      { heading: "Step 2: Consultation", body: "A recovery coordinator discusses priorities, existing professional input, family involvement, consent, risks, timing and the outcome you want." },
      { heading: "Step 3: Scope and proposal", body: "We define what we will coordinate, what remains outside our role, the expected communication arrangements, fees and any dependencies." },
      { heading: "Step 4: Recovery plan", body: "We create a written plan containing actions, responsibilities, dates, contacts, appointments, practical arrangements, contingencies and review points." },
      { heading: "Step 5: Coordination", body: "We carry out the agreed coordination, maintain records and communicate with authorised people and providers." },
      { heading: "Step 6: Review", body: "We review progress, resolve practical barriers and update the plan when circumstances change." },
      { heading: "Step 7: Transition or closure", body: "When the client is more independent or ongoing services are established, we provide a clear handover or closure summary." },
      { heading: "Service standards", body: "Clients should expect respectful communication, clear boundaries, documented actions, prompt acknowledgement, privacy, transparent fees and an escalation route for concerns." },
    ],
    faqs: [
      { q: "How long does an engagement last?", a: "Some engagements are short and focused around a discharge or procedure. Others continue for several weeks. Duration is agreed according to need and reviewed regularly." },
      { q: "How are fees calculated?", a: "Fees may be based on a consultation, a fixed coordination package, retained support or bespoke commissioned work. A written proposal should explain what is included and any additional costs." },
      { q: "Can the plan change?", a: "Yes. Recovery journeys can change. Any material change to scope, risk, availability or fees should be agreed and documented." },
    ],
    formFields: [],
  },
  {
    slug: "recovery-planning-consultation",
    title: "Recovery Planning Consultation",
    seoTitle: "Book a Recovery Planning Consultation | Active Recovery Concierge",
    seoDescription: "Begin with a confidential conversation about what needs to be organised and where the pressure points are likely to be.",
    eyebrow: "Active Recovery Concierge",
    h1: "Begin with a Confidential Recovery Planning Conversation",
    supportingCopy: "Tell us what is happening, what needs to be organised and where the pressure is greatest. We will listen, clarify the practical requirements and explain the most appropriate next step.",
    primaryButton: "Book Consultation",
    secondaryButton: "Make a Professional Referral",
    secondaryHref: "/active-recovery-concierge/professional-referral-partners",
    sections: [
      {
        heading: "What the consultation covers",
        list: ["The person's current situation and key dates.", "The practical outcomes they want.", "Existing clinical, care or professional support.", "Home, transport, family and communication considerations.", "Any known safety, safeguarding or access concerns.", "The proposed scope, timescale and likely next step."],
      },
      { heading: "Before you book", body: "Please do not use this form for emergencies, urgent medical advice or crisis support. Contact the appropriate emergency, hospital, GP or clinical service." },
      { heading: "After submission", body: "You will receive an acknowledgement, and our team will be notified so we can respond within a reasonable timeframe. We will not promise an unrealistic deadline." },
      { heading: "Privacy", body: "We only collect information necessary to assess your enquiry. Sensitive health information is minimised, protected and handled under our privacy notice." },
    ],
    faqs: [],
    formFields: ["I am enquiring as: client / family / professional / employer / other", "Full name", "Organisation and role, if applicable", "Phone", "Email", "Preferred contact method", "Who needs support?", "Current location", "Key date", "Brief description", "Immediate practical concerns", "Existing professionals involved", "Funding method, if known", "Communication or accessibility needs"],
  },
  {
    slug: "resources-faqs",
    title: "Resources & FAQs",
    seoTitle: "Resources & FAQs | Active Recovery Concierge",
    seoDescription: "Practical, non-clinical guidance to help you prepare for surgery, hospital discharge and recovery at home.",
    eyebrow: "Active Recovery Concierge",
    h1: "Practical Guidance for a More Organised Recovery",
    supportingCopy: "Explore clear, non-clinical resources to help you prepare for surgery, hospital discharge and recovery at home.",
    primaryButton: "Download a Guide",
    primaryHref: "/active-recovery-concierge-client-preparation-guide.pdf",
    secondaryButton: "Speak to a Coordinator",
    secondaryHref: "/contact?division=active-recovery-concierge",
    sections: [
      {
        heading: "Recommended downloadable resources",
        downloads: [
          {
            label: "Client Preparation Guide from your first enquiry to a well coordinated recovery journey (PDF)",
            href: "/active-recovery-concierge-client-preparation-guide.pdf",
          },
          {
            label: "Active Recovery Concierge Brochure (Word document)",
            href: "/active-recovery-concierge-brochure.docx",
          },
        ],
      },
    ],
    faqs: [
      { q: "What is recovery coordination?", a: "Recovery coordination is the structured organisation of practical arrangements, communication, appointments, logistics and onward referrals around a person's recovery plan." },
      { q: "How is it different from home care?", a: "Home care may include regulated personal care delivered by a registered provider. Recovery coordination focuses on planning, communication and practical organisation, and can help clients identify suitable care providers where needed." },
      { q: "Can you advise on medication or symptoms?", a: "No. Questions about medication, symptoms or medical treatment must be directed to a pharmacist, doctor, nurse or other qualified clinician." },
      { q: "Is the service confidential?", a: "Information is handled in line with applicable data-protection law, the privacy notice and agreed consent arrangements, subject to legal and safeguarding duties." },
    ],
    formFields: ["Name", "Email", "Role", "Consent to receive the resource"],
  },
];

export function getRecoveryPage(slug: string) {
  return recoveryConciergePages.find((p) => p.slug === slug);
}
