export type Announcement = {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  fullContent: string;
  category: string;
  color: "pink" | "green";
  details?: {
    time?: string;
    location?: string;
    requirements?: string[];
    contact?: string;
  };
};

export const announcements: Announcement[] = [
  {
    id: "barangay-assembly-q2-2026",
    date: "May 20, 2026",
    title: "Barangay Assembly – Q2 2026",
    excerpt:
      "All residents are invited to attend the quarterly barangay assembly on May 28 at the Barangay Hall. Your voice matters.",
    fullContent:
      "All residents of Barangay Mulawin are invited to attend the Second Quarter Barangay Assembly on May 28, 2026. This assembly will cover updates on barangay projects, budget utilization, and upcoming community programs.\n\nAgenda items include reports from the Punong Barangay and Barangay Council, open forum for resident concerns, and approval of proposed ordinances. Your participation is vital to transparency and progress in our community.",
    category: "Assembly",
    color: "pink",
    details: {
      time: "8:00 AM – 12:00 NN",
      location: "Barangay Mulawin Hall, Tanza, Cavite",
      requirements: ["Valid ID for registration", "Face mask (optional)"],
      contact: "Barangay Secretary — (046) 234-5678",
    },
  },
  {
    id: "medical-dental-mission-may-2026",
    date: "May 15, 2026",
    title: "Free Medical & Dental Mission",
    excerpt:
      "A free medical and dental mission will be held on May 30. Bring a valid ID and barangay clearance. Services include blood pressure monitoring and dental care.",
    fullContent:
      "Barangay Mulawin, in partnership with the Municipal Health Office, will conduct a free Medical and Dental Mission on May 30, 2026. This initiative aims to provide accessible health services to all residents, especially senior citizens, PWDs, and indigent families.\n\nServices offered include general medical consultation, blood pressure and blood sugar monitoring, dental check-up and extraction (limited slots), and free basic medicines. First come, first served — please arrive early.",
    category: "Health",
    color: "green",
    details: {
      time: "7:00 AM – 3:00 PM",
      location: "Barangay Covered Court, Mulawin St., Tanza, Cavite",
      requirements: [
        "Valid government-issued ID",
        "Barangay clearance (for dental services)",
        "Health card or previous medical records (if available)",
      ],
      contact: "BHW Hotline — 0917-234-5678",
    },
  },
  {
    id: "livelihood-training-2026",
    date: "May 10, 2026",
    title: "Livelihood Training Program",
    excerpt:
      "Register now for the upcoming livelihood training on basic skills and entrepreneurship. Limited slots — priority given to unemployed residents.",
    fullContent:
      "The Barangay Mulawin Livelihood Office is now accepting registrations for the Basic Skills and Entrepreneurship Training Program. This program is designed to equip residents with practical skills for home-based businesses and self-employment.\n\nTraining modules include basic dressmaking, food processing, and small business management. Participants who complete the program will receive a certificate of completion and may qualify for starter kits (subject to availability).",
    category: "Program",
    color: "pink",
    details: {
      time: "June 1–15, 2026 · 9:00 AM – 4:00 PM",
      location: "Barangay Mulawin Training Center",
      requirements: [
        "Barangay residency certificate",
        "2 pieces 1×1 ID photo",
        "Accomplished registration form (available at Barangay Hall)",
      ],
      contact: "Livelihood Office — brgy.mulawin@tanza.gov.ph",
    },
  },
];

export const newsArticles: Announcement[] = [
  ...announcements,
  {
    id: "road-rehab-mulawin-st",
    date: "May 5, 2026",
    title: "Road Rehabilitation on Mulawin St. Begins June",
    excerpt:
      "Expect minor road closures along Mulawin Street as road rehabilitation begins in June. Alternate routes will be posted.",
    fullContent:
      "The Municipal Engineering Office will begin road rehabilitation along Mulawin Street starting June 2026. Work will be done in phases to minimize disruption to residents and motorists.\n\nAffected sections will have temporary one-way traffic and signage will be posted at major intersections. Project completion is targeted by end of July 2026. We ask for your patience and cooperation during this improvement project.",
    category: "Infrastructure",
    color: "green",
    details: {
      time: "June 2026 – July 2026",
      location: "Mulawin Street, Barangay Mulawin, Tanza, Cavite",
      contact: "Barangay Hall — (046) 234-5678",
    },
  },
  {
    id: "cleanup-drive-may-2026",
    date: "April 28, 2026",
    title: "Monthly Clean-Up Drive – May 4",
    excerpt:
      "Join our monthly barangay clean-up drive on May 4, 2026, at 6:00 AM. Assembly point at the Barangay Plaza.",
    fullContent:
      "Barangay Mulawin invites all residents to join the monthly community clean-up drive. This activity supports our environmental programs and keeps our barangay clean and safe for everyone.\n\nGarbage bags, gloves, and light refreshments will be provided. Purok leaders are encouraged to mobilize their respective areas. Certificates of participation will be given to active youth and SK members.",
    category: "Environment",
    color: "green",
    details: {
      time: "6:00 AM – 9:00 AM",
      location: "Barangay Plaza (assembly point)",
      requirements: ["Comfortable clothing", "Own water bottle"],
      contact: "Environment Committee — Barangay Hall",
    },
  },
  {
    id: "4ps-validation-2026",
    date: "April 20, 2026",
    title: "4Ps Beneficiary Update & Validation",
    excerpt:
      "The DSWD and barangay social welfare office will conduct an update and validation of 4Ps beneficiaries.",
    fullContent:
      "The Department of Social Welfare and Development (DSWD), together with the Barangay Social Welfare Office, will conduct a beneficiary update and validation for the Pantawid Pamilyang Pilipino Program (4Ps).\n\nAll registered 4Ps beneficiaries must attend on their scheduled date. Failure to appear may affect grant eligibility. Please bring all required documents listed below.",
    category: "Social Welfare",
    color: "pink",
    details: {
      time: "May 12–14, 2026 · 8:00 AM – 5:00 PM",
      location: "Barangay Mulawin Social Welfare Office",
      requirements: [
        "Original and photocopy of valid ID",
        "4Ps ID or household reference number",
        "Proof of residency",
      ],
      contact: "Social Welfare Desk — Barangay Hall",
    },
  },
  {
    id: "sk-summer-sports-2026",
    date: "April 14, 2026",
    title: "SK Summer Sports Clinic Wrap-Up",
    excerpt:
      "The SK-led Summer Sports Clinic concluded with more than 120 youth participants.",
    fullContent:
      "The Sangguniang Kabataan (SK) of Barangay Mulawin successfully concluded its Summer Sports Clinic with over 120 youth participants from across the barangay.\n\nActivities included basketball, volleyball, and basic fitness training held at the barangay gym. Certificates of participation were distributed during the closing ceremony. The SK thanks all volunteers, coaches, and parents for their support.",
    category: "Youth",
    color: "pink",
    details: {
      location: "Barangay Mulawin Gymnasium",
      contact: "SK Office — Barangay Hall",
    },
  },
];

export function getAnnouncementById(id: string): Announcement | undefined {
  return newsArticles.find((a) => a.id === id);
}
