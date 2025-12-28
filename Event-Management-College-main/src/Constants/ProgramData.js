import Image1 from "../assets/image1.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";
import img12 from "../assets/img12.jpg"
import img13 from "../assets/img13.jpg"
import img14 from "../assets/img14.jpg"
import img15 from "../assets/img15.jpg"
import img16 from "../assets/img16.jpg"
import img17 from "../assets/img17.jpg"
import img18 from "../assets/img18.jpg"
import img19 from "../assets/img19.jpg"
import img20 from "../assets/img20.jpg"
import img21 from "../assets/img21.jpg"
import img22 from "../assets/img22.png"
import img23 from "../assets/img23.png"
import img24 from "../assets/img24.jpg"
import img11 from "../assets/img11.jpg"
import { FaCheckCircle, FaStar, FaBolt, FaLightbulb } from "react-icons/fa";
// export const Items = [
//   { 
//     id: 1,
//     Name: "Hackathon",
//     image: Image1,
//     Title: "india’s largest student hackathon",
//     Description:
//       "Hackathon 2025 is a 24-hour coding and innovation marathon where students collaborate to build powerful, scalable, and impactful solutions to real-world problems. Whether you're a developer, designer, analyst, or idea-driven innovator — this event is your chance to code, create, and compete. Join us to experience intense problem-solving, mentorship from experts, team collaboration, and a chance to bring your ideas to life!"
//   },
//   { 
//     id: 2,
//     Name: "Design Sprint",
//     image: Image2,
//     Title: "Campus Design Sprint – Turning Ideas Into Solutions",
//     Description:
//       "Design Sprint 2025 is a high-energy, fast-paced innovation challenge where students collaborate to solve real-world problems through design thinking. Over a span of 2 days, participants will ideate, prototype, test, and pitch their solutions to industry experts. This event is designed to foster creativity, teamwork, and rapid problem-solving—perfect for aspiring designers, developers, innovators, entrepreneurs, and tech enthusiasts."
//   },
//   { 
//     id: 3,
//     Name: "Tech Meetup",
//     image: Image3,
//     Title: "Campus Tech Meetup – Where Ideas Meet Technology",
//     Description:
//       "The Tech Meetup 2025 brings together developers, designers, tech enthusiasts, and innovators for an evening of learning, networking, and collaboration. This meetup features expert talks, live demos, panel discussions, and open networking sessions with industry professionals."
//   },
// ];

// export const Items = [
//   { 
//     id: 1,
//     Name: "Hackathon",
//     image: Image1,
//     Title: "india’s largest student hackathon",
//     programDate: "March 18, 2025",
//     programTime: "48 Hours",
//     Description:
//       "A high-energy 48-hour coding marathon where students build creative solutions and innovate with real-world challenges."
//   },
//   { 
//     id: 2,
//     Name: "Design Sprint",
//     image: Image2,
//     Title: "Campus Design Sprint – Turning Ideas Into Solutions",
//     programDate: "April 10, 2025",
//     programTime: "38 Hours",
//     Description:
//       "A fast-paced design challenge where teams ideate, prototype, and pitch solutions using real design-thinking methods."
//   },
//   { 
//     id: 3,
//     Name: "Tech Meetup",
//     image: Image3,
//     Title: "Campus Tech Meetup – Where Ideas Meet Technology",
//     programDate: "May 5, 2025",
//     programTime: "20 Hours",
//     Description:
//       "A tech gathering featuring expert talks, demos, and networking for students interested in innovation and technology."
//   },
// ];
// Import images

//PROGRAMS
export const Items = [
  { 
    id: 1,
    Name: "Hackathon",
    image: Image1,
    Title: "india’s largest student hackathon",
    programDate: "March 18, 2025",
    programTime: "48 Hours",
    Description:
      "A high-energy 48-hour coding marathon where students buildA fast-paced design challenge where teams ideate,teams ideate, prototype,A fast-paced design challenge where teams ideate, prototype, and pitch solutions usingteams ideate, prototype,A fast-paced design challenge where teams ideate, prototype, and pitch solutions using prototype, and pitch solutions using real design-thinking methodsA fast-paced design challenge where teams ideate, prototype, and pitch solutions using real design-thinking methods creative solutions and innovate with real-world challenges.",
    features: [
      { icon: FaBolt, name: "48-hour coding challenge" },
      { icon: FaCheckCircle, name: "Team collaboration" },
      { icon: FaLightbulb, name: "Mentorship from experts" },
      { icon: FaStar, name: "Real-world problem solving" }
    ]
  },

  { 
    id: 2,
    Name: "Design Sprint",
    image: Image2,
    Title: "Campus Design Sprint – Turning Ideas Into Solutions",
    programDate: "April 10, 2025",
    programTime: "38 Hours",
    Description:
      "A fast-paced design challenge where teams ideate, prototype,A fast-paced design challenge where teams teams ideate, prototype,A fast-paced design challenge where teams ideate, prototype, and pitch solutions usingteams ideate, prototype,A fast-paced design challenge where teams ideate, prototype, and pitch solutions usingideate, prototype, and pitch solutions using real design-thinking methodsA fast-paced design challenge where teams ideate, prototype, and pitch solutions using real design-thinking methods and pitch solutions using real design-thinking methods.",
    features: [
      { icon: FaLightbulb, name: "Design-thinking workflow" },
      { icon: FaCheckCircle, name: "Rapid prototyping" },
      { icon: FaStar, name: "User testing sessions" },
      { icon: FaBolt, name: "Pitching to experts" }
    ]
  },

  { 
    id: 3,
    Name: "Tech Meetup",
    image: Image3,
    Title: "Campus Tech Meetup – Where Ideas Meet Technology",
    programDate: "May 5, 2025",
    programTime: "20 Hours",
    Description:
      "A tech gathering featuring expert talks, demos,A fast-paced design challenge where teams ideate, prototype, and pitch solutions using real design-thinking methodsA fast-paced design challenge where teams ideate, prototype,teams ideate, prototype,A fast-paced design challenge where teams ideate, prototype, and pitch solutions usingteams ideate, prototype,A fast-paced design challenge where teams ideate, prototype, and pitch solutions using and pitch solutions using real design-thinking methods and networking for students interested in innovation and technology.",
    features: [
      { icon: FaCheckCircle, name: "Industry expert talks" },
      { icon: FaStar, name: "Live tech demos" },
      { icon: FaBolt, name: "Networking opportunities" },
      { icon: FaLightbulb, name: "Panel discussions" }
    ]
  },
];

//EVENTS
export const PROGRAMDATAS = [
  {
    id: 1,
    programName:"Hackathon",
    image: img15,
    status: "Sports",
    name: "Inter-College Football Match",
    description: "Department of Physical Education",
    venue: "College Ground",
    prize: "₹20,000 + Trophy",
    registered: "12 Teams",
    isRecommended: true
    
  },
  {
    id: 2,
    image: img12,
    programName:"Tech Meetup",
    status: "Sports",
    name: "Badminton Doubles Tournament",
    description: "Department of Sports & Recreation",
    venue: "Indoor Stadium",
    prize: "₹8,000",
    registered: "12 Players",
    isRecommended: true
  },
  {
    id: 3,
    image: img13,
    programName:"Design Sprint",
    status: "Academics",
    name: "Technical Quiz Competition",
    description: "Department of Information Technology",
    venue: "Seminar Hall 1",
    prize: "₹5,000",
    registered: "15 Participants",
    isRecommended: false
  },
  {
    id: 4,
    image: img14,
    status: "Sports",
    programName:"Hackathon",
    name: "Cricket Knockout Challenge",
    description: "Department of Physical Education",
    venue: "Main Cricket Ground",
    prize: "₹25,000 + Medals",
    registered: "12 Teams",
    isRecommended: true
  },
  {
    id: 5,
    image: img11,
    programName:"Design Sprint",
    status: "Social",
    name: "Community Clean-Up Drive",
    description: "Department of Social Sciences",
    venue: "City Park",
    prize: "Certificates",
    registered: "18 Volunteers",
    isRecommended: false
  },
  {
    id: 6,
    image: img16,
    programName:"Hackathon",
    status: "Academics",
    name: "Science Project Exhibition",
    description: "Department of Science & Research",
    venue: "Block A Exhibition Hall",
    prize: "₹10,000",
    registered: "12 Teams",
    isRecommended: true
  },
  {
    id: 7,
    image: img17,
    programName:"Design Sprint",
    status: "Sports",
    name: "Relay Running Championship",
    description: "Department of Physical Education",
    venue: "Athletic Track",
    prize: "₹7,000",
    registered: "20 Athletes",
    isRecommended: false
  },
  {
    id: 8,
    image: img18,
    programName:"Tech Meetup",
    status: "Sports",
    name: "Basketball 3v3 Tournament",
    description: "Department of Sports & Recreation",
    venue: "Basketball Court",
    prize: "₹12,000",
    registered: "12 Teams",
    isRecommended: true
  },
  {
    id: 9,
    image: img19,
    programName:"Tech Meetup",
    status: "Sports",
    name: "Table Tennis Singles",
    description: "Department of Physical Education",
    venue: "Indoor Sports Hall",
    prize: "₹5,000",
    registered: "12 Participants",
    isRecommended: false
  }
];


export const teacherDashboard_data = {
  "events": 12,
  "upcomingEvents": 3,
  "completedEvents": 9,
  "registrations": 240,
  "attendance": 180,
  "feedbackReceived": 95
};

export const adminDashboard_data = {
  "events": 12,
  "upcomingEvents": 3,
  "completedEvents": 9,
  "registrations": 240,
  "attendance": 180,
  "feedbackReceived": 95
};

export const PROGRAMS = [
  { id: 1, name: "Hackathon 2025" },
  { id: 2, name: "AI Workshop" },
  { id: 3, name: "Web Development Bootcamp" },
  { id: 4, name: "Cyber Security Seminar" },
  { id: 5, name: "Cloud Computing Training" },
];

///////////////////////////////////////////////////////////////////////////
export const EVENTDATAS = [
  {
    id: 1,
    programName: "Hackathon",
    eventName: "24 Hour Coding Challenge",
    description:
      "A high-intensity 24-hour hackathon where teams collaborate to design, develop, and deploy innovative real-world solutions.",
    date: "2025-03-18",
    startTime: "09:00",
    endTime: "09:00",
    venue: "Block A Exhibition Hall",
    latitude: 11.2588,
    longitude: 75.7804,
    incharge: "Dr. Arun Kumar",
    department: "Computer Science",
    limit: 120,

    // 🔹 Images (links)
    poster: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    priceImage: "https://images.unsplash.com/photo-1607082349566-187342175e2f",
    sponsorImages: [
      "https://images.unsplash.com/photo-1529612700005-e35377bf1415",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    ],

    // 🔹 Participation
    participationType: "team",
    membersPerTeamFromDepartment: 4,
    teamsPerDepartment: 5,

    overallIndividualLimit: "",
    departmentIndividualLimit: "",
  },

  {
    id: 2,
    programName: "Tech Meetup",
    eventName: "Future of Web Technologies",
    description:
      "An expert-led meetup focusing on modern frontend frameworks, backend scalability, and AI-powered web apps.",
    date: "2025-04-05",
    startTime: "10:00",
    endTime: "13:00",
    venue: "Seminar Hall 1",
    latitude: 11.2595,
    longitude: 75.7812,
    incharge: "Ms. Sneha Raj",
    department: "Information Technology",
    limit: 80,

    poster: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    priceImage: "https://images.unsplash.com/photo-1542744095-291d1f67b221",
    sponsorImages: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    ],

    participationType: "individual",
    overallIndividualLimit: 80,
    departmentIndividualLimit: 10,

    membersPerTeamFromDepartment: "",
    teamsPerDepartment: "",
  },

  {
    id: 3,
    programName: "Design Sprint",
    eventName: "UI/UX Design Workshop",
    description:
      "Hands-on workshop covering wireframing, prototyping, usability testing, and visual design fundamentals.",
    date: "2025-04-20",
    startTime: "11:00",
    endTime: "16:00",
    venue: "Innovation Lab",
    latitude: 11.2579,
    longitude: 75.7798,
    incharge: "Mr. Rahul Menon",
    department: "Design & Media",
    limit: 60,

    poster: "https://images.unsplash.com/photo-1559028012-d3cdbb3b1a41",
    priceImage: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    sponsorImages: [],

    participationType: "individual",
    overallIndividualLimit: 60,
    departmentIndividualLimit: 8,

    membersPerTeamFromDepartment: "",
    teamsPerDepartment: "",
  },

  {
    id: 4,
    programName: "Hackathon",
    eventName: "AI Model Building Contest",
    description:
      "Participants design and train AI models to solve real-world problems using data preprocessing and ML techniques.",
    date: "2025-05-02",
    startTime: "09:30",
    endTime: "17:30",
    venue: "Computer Lab 2",
    latitude: 11.2601,
    longitude: 75.7825,
    incharge: "Mr. Faisal Khan",
    department: "Artificial Intelligence",
    limit: 50,

    poster: "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
    priceImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    sponsorImages: [
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    ],

    participationType: "team",
    membersPerTeamFromDepartment: 3,
    teamsPerDepartment: 4,

    overallIndividualLimit: "",
    departmentIndividualLimit: "",
  },

  {
    id: 5,
    programName: "Design Sprint",
    eventName: "Community Innovation Drive",
    description:
      "Students collaborate to solve real-world community challenges with a focus on social impact.",
    date: "2025-05-15",
    startTime: "10:00",
    endTime: "14:00",
    venue: "City Park",
    latitude: 11.259,
    longitude: 75.7819,
    incharge: "Ms. Anjali Varma",
    department: "Social Sciences",
    limit: 100,

    poster: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
    priceImage: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0",
    sponsorImages: [],

    participationType: "individual",
    overallIndividualLimit: 100,
    departmentIndividualLimit: 15,

    membersPerTeamFromDepartment: "",
    teamsPerDepartment: "",
  },
  {
  id: 6,
  programName: "Tech Meetup",
  eventName: "Cloud Computing Essentials",
  description:
    "An introductory session on cloud computing concepts including IaaS, PaaS, SaaS, deployment models, and real-world cloud use cases.",
  date: "2025-06-08",
  startTime: "10:00",
  endTime: "13:00",
  venue: "Seminar Hall 3",
  latitude: 11.2583,
  longitude: 75.7809,
  incharge: "Mr. Vinod Krishnan",
  department: "Computer Applications",
  limit: 90,

  poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
  priceImage: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d1",
  sponsorImages: [
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  ],

  participationType: "individual",
  overallIndividualLimit: 90,
  departmentIndividualLimit: 12,

  membersPerTeamFromDepartment: "",
  teamsPerDepartment: "",
},

{
  id: 7,
  programName: "Hackathon",
  eventName: "Green Tech Hack",
  description:
    "A sustainability-focused hackathon where teams build innovative tech solutions addressing environmental challenges and climate change.",
  date: "2025-06-20",
  startTime: "09:00",
  endTime: "21:00",
  venue: "Main Auditorium",
  latitude: 11.2611,
  longitude: 75.7833,
  incharge: "Dr. Ramesh Iyer",
  department: "Engineering",
  limit: 100,

  poster: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  priceImage: "https://images.unsplash.com/photo-1515169067865-5387ec356754",
  sponsorImages: [
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  ],

  participationType: "team",
  membersPerTeamFromDepartment: 4,
  teamsPerDepartment: 5,

  overallIndividualLimit: "",
  departmentIndividualLimit: "",
},

{
  id: 8,
  programName: "Design Sprint",
  eventName: "Product Design Thinking Sprint",
  description:
    "An intensive design sprint focused on product ideation, user empathy, rapid prototyping, and validation with real users.",
  date: "2025-07-03",
  startTime: "10:30",
  endTime: "16:30",
  venue: "Design Studio",
  latitude: 11.2576,
  longitude: 75.7794,
  incharge: "Ms. Kavya Nair",
  department: "Design",
  limit: 50,

  poster: "https://images.unsplash.com/photo-1559028012-d3cdbb3b1a41",
  priceImage: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a",
  sponsorImages: [],

  participationType: "individual",
  overallIndividualLimit: 50,
  departmentIndividualLimit: 7,

  membersPerTeamFromDepartment: "",
  teamsPerDepartment: "",
},

{
  id: 9,
  programName: "Tech Meetup",
  eventName: "AI in Everyday Applications",
  description:
    "A talk on how artificial intelligence is transforming everyday applications such as recommendation systems, chatbots, and automation tools.",
  date: "2025-07-15",
  startTime: "14:00",
  endTime: "17:00",
  venue: "Conference Hall",
  latitude: 11.2599,
  longitude: 75.7815,
  incharge: "Ms. Priya Nandakumar",
  department: "Artificial Intelligence",
  limit: 120,

  poster: "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
  priceImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296",
  sponsorImages: [
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
  ],

  participationType: "individual",
  overallIndividualLimit: 120,
  departmentIndividualLimit: 15,

  membersPerTeamFromDepartment: "",
  teamsPerDepartment: "",
},

{
  id: 10,
  programName: "Hackathon",
  eventName: "Smart City Innovation Hack",
  description:
    "Teams build smart city solutions focusing on mobility, safety, energy optimization, and digital governance using modern technologies.",
  date: "2025-07-28",
  startTime: "09:00",
  endTime: "18:00",
  venue: "Innovation Lab",
  latitude: 11.2607,
  longitude: 75.7829,
  incharge: "Dr. Suresh Kumar",
  department: "Computer Science",
  limit: 120,

  poster: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  priceImage: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa",
  sponsorImages: [
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
  ],

  participationType: "team",
  membersPerTeamFromDepartment: 5,
  teamsPerDepartment: 4,

  overallIndividualLimit: "",
  departmentIndividualLimit: "",
}

];
