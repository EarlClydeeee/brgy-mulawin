export type Official = {
  name: string;
  title: string;
  photo: string | null;
  initials: string;
  email?: string;
  phone?: string;
  term?: string;
  message?: string;
};

export const SHARED_EMAIL = "BARANGAYMULAWIN@YAHOO.COM";
export const SHARED_PHONE = "(046) 418-2082";

export const punongBarangay: Official = {
  name: "Hon. Tricia L. Gutierrez",
  title: "Punong Barangay",
  term: "2023 – 2026",
  photo: "/brgy_officers/brgycaptain/KapitanaTriciaLubigan.png",
  email: SHARED_EMAIL,
  phone: SHARED_PHONE,
  initials: "TG",
  message:
    "Dedicated to transparent, compassionate, and people-centered governance for every resident of Barangay Mulawin.",
};

export const sangguniangBarangay: Official[] = [
  {
    name: "Hon. Jonas Edward P. Armintia",
    title: "Sangguniang Barangay Member",
    photo: "/brgy_officers/BrgyCouncilor/JONASEDWARDPARMINTIA.jpg",
    initials: "JA",
    email: SHARED_EMAIL,
    phone: SHARED_PHONE,
  },
  {
    name: "Hon. Benito A. Arbues",
    title: "Sangguniang Barangay Member",
    photo: "/brgy_officers/BrgyCouncilor/BENITOAARBUES.jpg",
    initials: "BA",
    email: SHARED_EMAIL,
    phone: SHARED_PHONE,
  },
  {
    name: "Hon. Juancho C. Pareja",
    title: "Sangguniang Barangay Member",
    photo: "/brgy_officers/BrgyCouncilor/JUANCHOCPAREJA.jpg",
    initials: "JP",
    email: SHARED_EMAIL,
    phone: SHARED_PHONE,
  },
  {
    name: "Hon. Khey Cee Arbues",
    title: "Sangguniang Barangay Member",
    photo: "/brgy_officers/BrgyCouncilor/KHEY CEE ARBUES.jpg",
    initials: "KA",
    email: SHARED_EMAIL,
    phone: SHARED_PHONE,
  },
  {
    name: "Hon. Jullian A. Bataclan",
    title: "Sangguniang Barangay Member",
    photo: "/brgy_officers/BrgyCouncilor/JULLIANABATACLAN.jpg",
    initials: "JB",
    phone: SHARED_PHONE,
  },
  {
    name: "Hon. Matias P. Arbues",
    title: "Sangguniang Barangay Member",
    photo: "/brgy_officers/BrgyCouncilor/MATIASPARBUES.jpg",
    initials: "MA",
    email: SHARED_EMAIL,
    phone: SHARED_PHONE,
  },
  {
    name: "Hon. Kurt T. Dignos",
    title: "Sangguniang Barangay Member",
    photo: "/brgy_officers/BrgyCouncilor/KURT T. DIGNOS.jpg",
    initials: "KD",
    email: SHARED_EMAIL,
    phone: SHARED_PHONE,
  },
];

export const skOfficials: Official[] = [
  {
    name: "Camila Marie B. Perez",
    title: "SK Chairperson",
    photo: "/sk_officers/CamilaPerez.jpg",
    initials: "CP",
    email: "camilamarie.perez.26@gmail.com",
    phone: "(046) 418-2082",
  },
];

export const appointedOfficials: Official[] = [
  {
    name: "Remil D. Sosa",
    title: "Barangay Secretary",
    photo: "/brgy_officers/BrgyCouncilor/REMILSOSA.jpg",
    initials: "RS",
    email: "remsosa1996@gmail.com",
    phone: "0917-144-4710",
  },
  {
    name: "Judith",
    title: "Barangay Coordinator",
    photo: "/brgy_officers/BrgyCoordinator/Judith.jpg",
    initials: "JD",
    email: SHARED_EMAIL,
    phone: SHARED_PHONE,
  },
];
