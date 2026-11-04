import { getRandomImagesForSection } from "./randomImages";

export function getProgramsData() {
  const images = getRandomImagesForSection("programs", 3);
  
  return [
    {
      title: "Diaspora Mentorship Program",
      description:
        "Connect with experienced professionals and mentors from the diaspora community. Build networks and accelerate your career growth.",
      image: images[0],
      href: "/programs#mentorship",
    },
    {
      title: "Community Investment Initiative",
      description:
        "Participate in initiatives that drive economic development in Uganda. Invest in businesses and projects that create lasting impact.",
      image: images[1],
      href: "/programs#investment",
    },
    {
      title: "Annual Conference & Awards",
      description:
        "Join us for our annual gathering celebrating diaspora achievements, fostering collaboration, and recognizing excellence.",
      image: images[2],
      href: "/programs#conference",
    },
  ];
}

export function getBlogsData() {
  const images = getRandomImagesForSection("blog", 3);
  
  return [
    {
      title: "Success Story: From Diaspora to Home",
      description:
        "How a diaspora entrepreneur built a thriving business connecting communities across continents.",
      metadata: { date: "Nov 15, 2024", category: "Success Stories" },
      image: images[0],
      href: "/blog",
    },
    {
      title: "The Power of Diaspora Networks",
      description:
        "Exploring how diaspora networks create lasting impact and drive innovation in home countries.",
      metadata: { date: "Nov 10, 2024", category: "Insights" },
      image: images[1],
      href: "/blog",
    },
    {
      title: "Connecting Diaspora Communities",
      description:
        "An inside look at how UDAN is fostering meaningful connections between diaspora members.",
      metadata: { date: "Nov 5, 2024", category: "Community" },
      image: images[2],
      href: "/blog",
    },
  ];
}

export function getCollageImages() {
  return getRandomImagesForSection("collage", 8);
}

export function getWelcomePortrait() {
  return getRandomImagesForSection("lifestyle", 1)[0];
}

export function getWelcomeMessage() {
  return [
    "Dear Fellow Members and Friends in the Diaspora,",
    "It is with immense pleasure that I extend a warm welcome to you to the UDAN Diaspora platform. This community serves as a hub for connection, collaboration, and positive change among our vibrant diaspora.",
    "One of the core values that UDAN holds dear is unity. Together, we can achieve remarkable feats and create a lasting impact on the lives of people we serve. Our collective strength is our greatest asset.",
    "As we navigate this journey together, I am committed to fostering an atmosphere of inclusion and empowerment within our organization. Every member's voice is valued and essential to our shared success.",
  ];
}
