// Curated, free-to-use photography (Pexels License — free for commercial use,
// no attribution required: https://www.pexels.com/license/). Centralising the
// IDs here means swapping in the client's own photography later is a one-line
// change per entry, not a hunt through every page component.
export function pexels(id: number, w = 1600) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
}

export const images = {
  homepageHero: pexels(29267512),
  homepageTeam: pexels(29267520),
  homepageWhyChoose: pexels(29267517),
  ctaBackground: pexels(30004357),

  aboutHero: pexels(29284266),
  contactHero: pexels(4963437),

  qualityAcademy: pexels(18999469),
  qualityAcademySecondary: pexels(29267524),
  providerSolutions: pexels(33175653),
  providerSolutionsSecondary: pexels(33175648),
  workforceRecruitment: pexels(6918507),
  workforceRecruitmentSecondary: pexels(4963437),
  facilities: pexels(34516670),
  facilitiesSecondary: pexels(6195273),

  accommodation: pexels(6933852),
  accommodationSecondary: pexels(7214447),
  accommodationThird: pexels(6958130),

  recovery: {
    "active-recovery-concierge": pexels(18459198),
    "post-hospital-recovery-support": pexels(18459702),
    "post-operative-recovery-coordination": pexels(29372730),
    "family-recovery-coordination": pexels(18429308),
    "executive-international-recovery-concierge": pexels(18459209),
    "professional-referral-partners": pexels(29372534),
    "how-it-works": pexels(18429374),
    "recovery-planning-consultation": pexels(18459208),
    "resources-faqs": pexels(18429569),
  } as Record<string, string>,
};
