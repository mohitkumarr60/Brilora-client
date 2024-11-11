import { HoverEffect } from "../../components/Hero/categories-card";

export const categories = [
  {
    title: "Robotics & AI",
    category: "Robotics",
    description:
      "Explore the future with advanced robotics and artificial intelligence",
    link: "../../courses?page=1&category=Robotics%20%26%20AI",
  },
  {
    title: "Coding",
    category: "Coding",
    description: "Unlock the power of programming and digital creation",
    link: "../../courses?page=1&category=Coding",
  },
  {
    title: "STEM",
    category: "Stem",
    description:
      "Discover the wonders of science, technology, engineering, and mathematics",
    link: "../../courses?page=1&category=STEM",
  },
  {
    title: "Drone",
    category: "Drone",
    description: "Soar into the skies with innovative drone technology",
    link: "../../courses?page=1&category=Drone",
  },
];

function CategoriesCard() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={categories} />
    </div>
  );
}

export default CategoriesCard;
