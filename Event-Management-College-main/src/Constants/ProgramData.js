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
import img11 from "../assets/img11.jpg"

export const Items = [
  { 
    id: 1,
    Name: "Hackathon",
    image: Image1,
    Title: "india’s largest student hackathon",
    Description:
      "Hackathon 2025 is a 24-hour coding and innovation marathon where students collaborate to build powerful, scalable, and impactful solutions to real-world problems. Whether you're a developer, designer, analyst, or idea-driven innovator — this event is your chance to code, create, and compete. Join us to experience intense problem-solving, mentorship from experts, team collaboration, and a chance to bring your ideas to life!"
  },
  { 
    id: 2,
    Name: "Design Sprint",
    image: Image2,
    Title: "Campus Design Sprint – Turning Ideas Into Solutions",
    Description:
      "Design Sprint 2025 is a high-energy, fast-paced innovation challenge where students collaborate to solve real-world problems through design thinking. Over a span of 2 days, participants will ideate, prototype, test, and pitch their solutions to industry experts. This event is designed to foster creativity, teamwork, and rapid problem-solving—perfect for aspiring designers, developers, innovators, entrepreneurs, and tech enthusiasts."
  },
  { 
    id: 3,
    Name: "Tech Meetup",
    image: Image3,
    Title: "Campus Tech Meetup – Where Ideas Meet Technology",
    Description:
      "The Tech Meetup 2025 brings together developers, designers, tech enthusiasts, and innovators for an evening of learning, networking, and collaboration. This meetup features expert talks, live demos, panel discussions, and open networking sessions with industry professionals."
  },
];


export const PROGRAMDATAS = [
  {
    id: 1,
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