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
      "A high-intensity 24-hour hackathon where teams collaborate to design, develop, and deploy innovative real-world solutions. Participants will brainstorm ideas, build functional prototypes, and present their projects to a panel of experts. This challenge tests problem-solving skills, coding efficiency, teamwork, and creativity under time pressure.",
    date: "2025-03-18",
    startTime: "09:00",
    endTime: "09:00",
    venue: "Block A Exhibition Hall",
    latitude: 11.2588,
    longitude: 75.7804,
    incharge: "Dr. Arun Kumar",
    department: "Computer Science",
    limit: 120,
    image: img13,
  },

  {
    id: 2,
    programName: "Tech Meetup",
    eventName: "Future of Web Technologies",
    description:
      "An expert-led technical meetup focusing on the future of web development. The session covers modern frontend frameworks, backend scalability, cloud deployment, and emerging trends such as AI-powered web applications. Participants will gain industry insights, real-world use cases, and opportunities to interact with experienced professionals.",
    date: "2025-04-05",
    startTime: "10:00",
    endTime: "13:00",
    venue: "Seminar Hall 1",
    latitude: 11.2595,
    longitude: 75.7812,
    incharge: "Ms. Sneha Raj",
    department: "Information Technology",
    limit: 80,
    image: img20,
  },

  {
    id: 3,
    programName: "Design Sprint",
    eventName: "UI/UX Design Workshop",
    description:
      "A hands-on UI/UX design workshop aimed at teaching user-centered design principles. Participants will learn wireframing, prototyping, usability testing, and visual design fundamentals. The workshop includes practical exercises, team activities, and expert feedback to help students create intuitive and engaging digital experiences.",
    date: "2025-04-20",
    startTime: "11:00",
    endTime: "16:00",
    venue: "Innovation Lab",
    latitude: 11.2579,
    longitude: 75.7798,
    incharge: "Mr. Rahul Menon",
    department: "Design & Media",
    limit: 60,
    image: img21,
  },

  {
    id: 4,
    programName: "Hackathon",
    eventName: "AI Model Building Contest",
    description:
      "A competitive event where participants design and train intelligent AI models to solve predefined problem statements. The contest focuses on data preprocessing, model selection, training optimization, and performance evaluation. Teams will present their solutions, demonstrating innovation, accuracy, and real-world applicability.",
    date: "2025-05-02",
    startTime: "09:30",
    endTime: "17:30",
    venue: "Computer Lab 2",
    latitude: 11.2601,
    longitude: 75.7825,
    incharge: "Mr. Faisal Khan",
    department: "Artificial Intelligence",
    limit: 50,
    image: img22,
  },

  {
    id: 5,
    programName: "Design Sprint",
    eventName: "Community Innovation Drive",
    description:
      "A collaborative innovation drive where students work together to identify and solve real-world community challenges. Participants will engage in research, ideation, and solution development focused on social impact. The event encourages creative thinking, teamwork, and socially responsible innovation.",
    date: "2025-05-15",
    startTime: "10:00",
    endTime: "14:00",
    venue: "City Park",
    latitude: 11.2590,
    longitude: 75.7819,
    incharge: "Ms. Anjali Varma",
    department: "Social Sciences",
    limit: 100,
    image: img11,
  },

  {
    id: 6,
    programName: "Hackathon",
    eventName: "AI Innovation Challenge",
    description:
      "A 24-hour hackathon focused on building AI-powered solutions for real-world problems. Participants will work on problem analysis, data modeling, algorithm design, and prototype implementation. The challenge emphasizes innovation, practical AI usage, and teamwork under time constraints.",
    date: "2025-06-05",
    startTime: "09:00",
    endTime: "09:00",
    venue: "Innovation Lab",
    latitude: 11.2585,
    longitude: 75.7802,
    incharge: "Mr. Rahul Menon",
    department: "Computer Science",
    limit: 80,
    image: img23,
  },

  {
    id: 7,
    programName: "Tech Meetup",
    eventName: "Web Development Bootcamp",
    description:
      "An intensive hands-on bootcamp covering modern web development technologies. Participants will learn frontend and backend concepts, build responsive applications, and explore best practices used in the industry. The bootcamp is designed for skill enhancement through practical implementation.",
    date: "2025-06-12",
    startTime: "10:00",
    endTime: "16:00",
    venue: "Seminar Hall 2",
    latitude: 11.2601,
    longitude: 75.7825,
    incharge: "Ms. Neha Thomas",
    department: "Information Technology",
    limit: 60,
    image: img13,
  },

  {
    id: 8,
    programName: "Design Sprint",
    eventName: "UI/UX Design Workshop",
    description:
      "A practical design workshop focused on user-centered design methodologies. Participants will learn design thinking, wireframing, prototyping, and usability testing. The session encourages creativity and provides real-world design challenges to enhance design skills.",
    date: "2025-06-20",
    startTime: "11:00",
    endTime: "15:00",
    venue: "Design Studio",
    latitude: 11.2579,
    longitude: 75.7796,
    incharge: "Mr. Arjun Nair",
    department: "Design",
    limit: 50,
    image: img13,
  },

  {
    id: 9,
    programName: "Hackathon",
    eventName: "Smart Campus Hack",
    description:
      "A hackathon dedicated to building smart solutions that enhance campus life. Participants will work on ideas related to sustainability, automation, security, and student experience. Teams will prototype innovative solutions that can be practically implemented within a campus environment.",
    date: "2025-07-01",
    startTime: "09:00",
    endTime: "18:00",
    venue: "Main Auditorium",
    latitude: 11.2612,
    longitude: 75.7831,
    incharge: "Dr. Suresh Kumar",
    department: "Engineering",
    limit: 100,
    image: img14,
  },

  {
    id: 10,
    programName: "Tech Meetup",
    eventName: "Cyber Security Awareness Program",
    description:
      "An informative session aimed at spreading awareness about cyber security threats and digital safety practices. Topics include common cyber attacks, data protection, secure online behavior, and best practices for personal and organizational security. The program is suitable for beginners and professionals alike.",
    date: "2025-07-10",
    startTime: "14:00",
    endTime: "17:00",
    venue: "Conference Hall",
    latitude: 11.2594,
    longitude: 75.7810,
    incharge: "Ms. Priya Nandakumar",
    department: "Computer Applications",
    limit: 120,
    image: img16,
  }
];
