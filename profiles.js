// ✅ Healthify Test Profiles (25 Packages)
export const profiles = [
  {
    name: "Healthify Essential Checkup",
    mrp: 1499,
    offer: 799,
    tat: "Same Day",
    description: "Includes CBC, LFT, KFT, Lipid, Sugar & more."
  },
  {
    name: "Healthify Full Body Checkup - Basic",
    mrp: 1799,
    offer: 899,
    tat: "24 Hrs",
    description: "Basic full-body screening with 60+ parameters."
  },
  {
    name: "Healthify Full Body Checkup - Advance",
    mrp: 2499,
    offer: 1299,
    tat: "24 Hrs",
    description: "Advance full-body package with Vitamin, Thyroid, etc."
  },
  {
    name: "Healthify Thyroid Package",
    mrp: 899,
    offer: 499,
    tat: "Same Day",
    description: "T3, T4, TSH + CBC"
  },
  {
    name: "Healthify Diabetic Screening",
    mrp: 999,
    offer: 599,
    tat: "Same Day",
    description: "Includes Sugar, HbA1c, CBC, Urine, etc."
  },
  {
    name: "Healthify Heart Risk Package",
    mrp: 1599,
    offer: 799,
    tat: "24 Hrs",
    description: "Lipid, CRP, CBC, Homocysteine, etc."
  },
  {
    name: "Healthify Senior Citizen Checkup",
    mrp: 1999,
    offer: 999,
    tat: "24 Hrs",
    description: "Liver, Kidney, Heart, Diabetes & more."
  },
  {
    name: "Healthify Women Wellness Panel",
    mrp: 2299,
    offer: 1199,
    tat: "24 Hrs",
    description: "Includes CBC, Hormones, Thyroid & Vitamin."
  },
  {
    name: "Healthify Men’s Vital Panel",
    mrp: 2299,
    offer: 1199,
    tat: "24 Hrs",
    description: "Hormones, Lipids, CBC, Vitamin & more."
  },
  {
    name: "Healthify Fever Profile",
    mrp: 899,
    offer: 499,
    tat: "Same Day",
    description: "Includes CBC, ESR, Malaria, Dengue, Typhoid"
  },
  // More entries auto-generated to make up 25
  ...Array.from({ length: 15 }, (_, i) => ({
    name: `Healthify Wellness Panel ${i + 11}`,
    mrp: 999 + i * 100,
    offer: 499 + i * 50,
    tat: i % 2 === 0 ? "Same Day" : "24 Hrs",
    description: `Includes essential screening tests group ${i + 11}`
  }))
];
