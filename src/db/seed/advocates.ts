import { v4 } from "uuid";
import { z } from "zod";

const specialties = [
  "Bipolar",
  "LGBTQ",
  "Medication/Prescribing",
  "Suicide History/Attempts",
  "General Mental Health (anxiety, depression, stress, grief, life transitions)",
  "Men's issues",
  "Relationship Issues (family, friends, couple, etc)",
  "Trauma & PTSD",
  "Personality disorders",
  "Personal growth",
  "Substance use/abuse",
  "Pediatrics",
  "Women's issues (post-partum, infertility, family planning)",
  "Chronic pain",
  "Weight loss & nutrition",
  "Eating disorders",
  "Diabetic Diet and nutrition",
  "Coaching (leadership, career, academic and wellness)",
  "Life coaching",
  "Obsessive-compulsive disorders",
  "Neuropsychological evaluations & testing (ADHD testing)",
  "Attention and Hyperactivity (ADHD)",
  "Sleep issues",
  "Schizophrenia and psychotic disorders",
  "Learning disorders",
  "Domestic abuse",
] as const;

const Specialty = z.enum(specialties)


const randomSpecialty = () => {
  const random1 = Math.floor(Math.random() * 24);
  const random2 = Math.floor(Math.random() * (24 - random1)) + random1 + 1;

  return [random1, random2];
};

declare const AdvocateIdSymbol: unique symbol;
type AdvocateId = string & {[AdvocateIdSymbol]: void}
const AdvocateId = z.custom<AdvocateId>()

const makeAdvocateId = () => v4() as AdvocateId

export const Advocate = z.object({
  id: AdvocateId,
  firstName: z.string(),
lastName:  z.string(),
city:  z.string(),
degree:  z.string(),
specialties: Specialty.array(),
yearsOfExperience: z.number().int(),
phoneNumber: z.number().int()
})
export type Advocate = z.infer<typeof Advocate>

const advocateData: Advocate[] = [
  {
    id: makeAdvocateId(),
    firstName: "John",
    lastName: "Doe",
    city: "New York",
    degree: "MD",
    specialties: specialties.slice(...randomSpecialty()),
    yearsOfExperience: 10,
    phoneNumber: 5551234567,
  },
  {
    id: makeAdvocateId(),
    firstName: "Jane",
    lastName: "Smith",
    city: "Los Angeles",
    degree: "PhD",
    specialties: specialties.slice(...randomSpecialty()),
    yearsOfExperience: 8,
    phoneNumber: 5559876543,
  },
  {
    id: makeAdvocateId(),
    firstName: "Alice",
    lastName: "Johnson",
    city: "Chicago",
    degree: "MSW",
    specialties: specialties.slice(...randomSpecialty()),
    yearsOfExperience: 5,
    phoneNumber: 5554567890,
  },
  {
    id: makeAdvocateId(),
    firstName: "Michael",
    lastName: "Brown",
    city: "Houston",
    degree: "MD",
    specialties: specialties.slice(...randomSpecialty()),
    yearsOfExperience: 12,
    phoneNumber: 5556543210,
  },
  {
    id: makeAdvocateId(),
    firstName: "Emily",
    lastName: "Davis",
    city: "Phoenix",
    degree: "PhD",
    specialties: specialties.slice(...randomSpecialty()),
    yearsOfExperience: 7,
    phoneNumber: 5553210987,
  },
  {
    id: makeAdvocateId(),
    firstName: "Chris",
    lastName: "Martinez",
    city: "Philadelphia",
    degree: "MSW",
    specialties: specialties.slice(...randomSpecialty()),
    yearsOfExperience: 9,
    phoneNumber: 5557890123,
  },
  {
    id: makeAdvocateId(),
    firstName: "Jessica",
    lastName: "Taylor",
    city: "San Antonio",
    degree: "MD",
    specialties: specialties.slice(...randomSpecialty()),
    yearsOfExperience: 11,
    phoneNumber: 5554561234,
  },
  {
    id: makeAdvocateId(),
    firstName: "David",
    lastName: "Harris",
    city: "San Diego",
    degree: "PhD",
    specialties: specialties.slice(...randomSpecialty()),
    yearsOfExperience: 6,
    phoneNumber: 5557896543,
  },
  {
    id: makeAdvocateId(),
    firstName: "Laura",
    lastName: "Clark",
    city: "Dallas",
    degree: "MSW",
    specialties: specialties.slice(...randomSpecialty()),
    yearsOfExperience: 4,
    phoneNumber: 5550123456,
  },
  {
    id: makeAdvocateId(),
    firstName: "Daniel",
    lastName: "Lewis",
    city: "San Jose",
    degree: "MD",
    specialties: specialties.slice(...randomSpecialty()),
    yearsOfExperience: 13,
    phoneNumber: 5553217654,
  },
  {
    id: makeAdvocateId(),
    firstName: "Sarah",
    lastName: "Lee",
    city: "Austin",
    degree: "PhD",
    specialties: specialties.slice(...randomSpecialty()),
    yearsOfExperience: 10,
    phoneNumber: 5551238765,
  },
  {
    id: makeAdvocateId(),
    firstName: "James",
    lastName: "King",
    city: "Jacksonville",
    degree: "MSW",
    specialties: specialties.slice(...randomSpecialty()),
    yearsOfExperience: 5,
    phoneNumber: 5556540987,
  },
  {
    id: makeAdvocateId(),
    firstName: "Megan",
    lastName: "Green",
    city: "San Francisco",
    degree: "MD",
    specialties: specialties.slice(...randomSpecialty()),
    yearsOfExperience: 14,
    phoneNumber: 5559873456,
  },
  {
    id: makeAdvocateId(),
    firstName: "Joshua",
    lastName: "Walker",
    city: "Columbus",
    degree: "PhD",
    specialties: specialties.slice(...randomSpecialty()),
    yearsOfExperience: 9,
    phoneNumber: 5556781234,
  },
  {
    id: makeAdvocateId(),
    firstName: "Amanda",
    lastName: "Hall",
    city: "Fort Worth",
    degree: "MSW",
    specialties: specialties.slice(...randomSpecialty()),
    yearsOfExperience: 3,
    phoneNumber: 5559872345,
  },
];

export { advocateData };
