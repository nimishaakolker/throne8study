const groups = [
  {
    id: 1,
    title: "Focus JEE Warriors",
    description:
      "A disciplined study group for serious JEE aspirants.\n" +
      "Daily problem-solving sessions and focused study hours.\n" +
      "Ideal for students aiming to stay consistent and motivated.",
    cameraOn: true,
    goalHours: 12,
    attendanceRequired: true,
    attendanceAvg: 82,
    leader: "Aman Sharma",
    visibility: "public",
    category: "JEE Aspirant",
    capacity: 30,           
    members: 15,            
    rank: 1                 
  },
  {
    id: 2,
    title: "Night Study Club",
    description:
      "Late-night study group designed for NEET aspirants.\n" +
      "Calm environment with flexible camera rules.\n" +
      "Perfect for students who study best at night.",
    cameraOn: false,
    goalHours: 10,
    attendanceRequired: true,
    attendanceAvg: 74,
    leader: "Riya Verma",
    visibility: "private",
    category: "College",
    capacity: 25,
    members: 20,
    rank: 2
  },
  {
    id: 3,
    title: "DSA Placement Prep",
    description:
      "Focused group for students preparing for technical placements.\n" +
      "Daily DSA practice with mock interviews and discussions.\n" +
      "Daily DSA practice with mock interviews and discussions.\n" +
      "Best suited for final-year students and fresh graduates.",

    cameraOn: true,
    goalHours: 8,
    attendanceRequired: false,
    attendanceAvg: 68,
    leader: "Kunal Mehta",
    visibility: "public",
    category: "Placement Preparation",
    capacity: 40,
    members: 32,
    rank: 3
  },
  {
    id: 4,
    title: "Language Skills Booster",
    description:
      "Improve your spoken and professional language skills.\n" +
      "Daily practice sessions with peer interaction.\n" +
      "Helpful for interviews, group discussions, and confidence building.",
    cameraOn: false,
    goalHours: 6,
    attendanceRequired: false,
    attendanceAvg: 91,
    leader: "Neha Singh",
    visibility: "public",
    category: "College",
    capacity: 20,
    members: 10,
    rank: 4
  },
  {
    id: 5,
    title: "Language Skills Booster",
    description:
      "Improve your spoken and professional language skills.\n" +
      "Daily practice sessions with peer interaction.\n" +
      "Helpful for interviews, group discussions, and confidence building.",
    cameraOn: false,
    goalHours: 6,
    attendanceRequired: false,
    attendanceAvg: 91,
    leader: "Neha Singh",
    visibility: "public",
    category: "College",
    capacity: 20,
    members: 10,
    rank: 4
  },
  {
    id: 6,
    title: "Language Skills Booster",
    description:
      "Improve your spoken and professional language skills.\n" +
      "Daily practice sessions with peer interaction.\n" +
      "Helpful for interviews, group discussions, and confidence building.",
    cameraOn: false,
    goalHours: 6,
    attendanceRequired: false,
    attendanceAvg: 91,
    leader: "Neha Singh",
    visibility: "public",
    category: "Placement Preparation",
    capacity: 20,
    members: 10,
    rank: 4
  },
  {
    id: 7,
    title: "Language Skills Booster",
    description:
      "Improve your spoken and professional language skills.\n" +
      "Daily practice sessions with peer interaction.\n" +
      "Helpful for interviews, group discussions, and confidence building.",
    cameraOn: false,
    goalHours: 6,
    attendanceRequired: false,
    attendanceAvg: 91,
    leader: "Neha Singh",
    visibility: "public",
    category: "College",
    capacity: 20,
    members: 10,
    rank: 4
  },
   {
    id: 8,
    title: "Language Skills Booster",
    description:
      "Improve your spoken and professional language skills.\n" +
      "Daily practice sessions with peer interaction.\n" +
      "Helpful for interviews, group discussions, and confidence building.",
    cameraOn: false,
    goalHours: 6,
    attendanceRequired: false,
    attendanceAvg: 91,
    leader: "Neha Singh",
    visibility: "public",
    category: "Placement Preparation",
    capacity: 20,
    members: 10,
    rank: 4
  },
  {
    id: 9,
    title: "Language Skills Booster",
    description:
      "Improve your spoken and professional language skills.\n" +
      "Daily practice sessions with peer interaction.\n" +
      "Helpful for interviews, group discussions, and confidence building.",
    cameraOn: false,
    goalHours: 6,
    attendanceRequired: false,
    attendanceAvg: 91,
    leader: "Neha Singh",
    visibility: "public",
    category: "Placement Preparation",
    capacity: 20,
    members: 10,
    rank: 4
  },
];

// ✅ DERIVED ARRAYS (PRO WAY)
export const publicGroups = groups.filter(group => group.visibility === "public");
export const universityGroups = groups.filter(group => group.category === "College");
export const DSAGroups = groups.filter(group => group.category === "Placement Preparation");
export const JEEGroups = groups.filter(group => group.category.includes("JEE"));
export const highAttendanceGroups = groups.filter(group => group.attendanceAvg >= 80);
export const rankedGroups = groups.slice().sort((a, b) => a.rank - b.rank);

export default groups;
