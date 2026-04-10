import React, { useState } from "react";
import Footer from '../Component/Footer.jsx'
import "./Blog.css";

export const categories = [
  "All Blog Post",
  "AI",
  "How to",
  "Prompts",
  "Tools",
  "Uncategorized",
];

export const cardsData = [
  {
    id: 1,
    title: "30+ Best ChatGPT Prompts For Lawyers (2025)",
    category: "Prompts",
    image: "https://iskills.com/wp-content/uploads/2024/04/legal-form-prompt-1024x661-1.webp",
    date: "Oct 29, 2025",
    readTime: "10 min read",
  },
  {
    id: 2,
    title: "25 chatgpt prompts fr copying to boost yur skills",
    category: "Tools",
    image: "https://iskills.com/wp-content/uploads/2024/04/chatgpt-prompts.webp",
    date: "Oct 20, 2025",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Taskade Review 2025 - features pricing, pros and cons",
    category: "AI",
    image: "https://iskills.com/wp-content/uploads/2024/04/Taskades.webp",
    date: "Oct 16, 2025",
    readTime: "5 min read",
  },
  {
    id: 4,
    title: "30+ Best ChatGPT Prompts For Lawyers (2025)",
    category: "Prompts",
    image: "https://iskills.com/wp-content/uploads/2024/04/yousaytoo-review.webp",
    date: "Oct 29, 2025",
    readTime: "10 min read",
  },
  {
    id: 5,
    title: "25 chatgpt prompts fr copying to boost yur skills",
    category: "Tools",
    image: "https://iskills.com/wp-content/uploads/2024/04/chatgpt-prompts.webp",
    date: "Oct 20, 2025",
    readTime: "8 min read",
  },
  {
    id: 6,
    title: "Taskade Review 2025 - features pricing, pros and cons",
    category: "AI",
    image: "https://iskills.com/wp-content/uploads/2024/04/wpaibot-1.webp",
    date: "Oct 16, 2025",
    readTime: "5 min read",
  },
  {
    id: 7,
    title: "30+ Best ChatGPT Prompts For Lawyers (2025)",
    category: "Prompts",
    image: "https://iskills.com/wp-content/uploads/2024/04/vistasocial.webp",
    date: "Oct 29, 2025",
    readTime: "10 min read",
  },
  {
    id: 8,
    title: "25 chatgpt prompts fr copying to boost yur skills",
    category: "Tools",
    image: "https://iskills.com/wp-content/uploads/2024/04/video-candy.webp",
    date: "Oct 20, 2025",
    readTime: "8 min read",
  },
  {
    id: 9,
    title: "Taskade Review 2025 - features pricing, pros and cons",
    category: "AI",
    image: "https://iskills.com/wp-content/uploads/2024/04/Deep-Swap-1024x341-1.webp",
    date: "Oct 16, 2025",
    readTime: "5 min read",
  },
  {
    id: 10,
    title: "Taskade Review 2025 - features pricing, pros and cons",
    category: "AI",
    image: "https://iskills.com/wp-content/uploads/2024/04/doubleclick-1.webp",
    date: "Oct 16, 2025",
    readTime: "5 min read",
  },
  {
    id: 11,
    title: "Taskade Review 2025 - features pricing, pros and cons",
    category: "AI",
    image: "https://iskills.com/wp-content/uploads/2024/04/7-Cheap-Domain-Name-Registrars-1536x864-1.webp",
    date: "Oct 16, 2025",
    readTime: "5 min read",
  },
  {
    id: 12,
    title: "Taskade Review 2025 - features pricing, pros and cons",
    category: "AI",
    image: "https://iskills.com/wp-content/uploads/2024/04/shopify-vs-wordpress.webp",
    date: "Oct 16, 2025",
    readTime: "5 min read",
  },
  {
    id: 13,
    title: "30+ Best ChatGPT Prompts For Lawyers (2025)",
    category: "Prompts",
    image: "https://iskills.com/wp-content/uploads/2024/04/review-peopleperhour-1536x865-1.webp",
    date: "Oct 29, 2025",
    readTime: "10 min read",
  },
  {
    id: 14,
    title: "25 chatgpt prompts fr copying to boost yur skills",
    category: "Tools",
    image: "https://iskills.com/wp-content/uploads/2024/04/alternate-to-99designs-1536x865-1.webp",
    date: "Oct 20, 2025",
    readTime: "8 min read",
  },
  {
    id: 15,
    title: "Taskade Review 2025 - features pricing, pros and cons",
    category: "AI",
    image: "https://iskills.com/wp-content/uploads/2024/04/storya.webp",
    date: "Oct 16, 2025",
    readTime: "5 min read",
  },
  {
    id: 16,
    title: "30+ Best ChatGPT Prompts For Lawyers (2025)",
    category: "Prompts",
    image: "https://iskills.com/wp-content/uploads/2024/04/yousaytoo-review.webp",
    date: "Oct 29, 2025",
    readTime: "10 min read",
  },
  {
    id: 17,
    title: "25 chatgpt prompts fr copying to boost yur skills",
    category: "Tools",
    image: "https://iskills.com/wp-content/uploads/2024/04/ubersuggest-1.webp",
    date: "Oct 20, 2025",
    readTime: "8 min read",
  },
  {
    id: 18,
    title: "Taskade Review 2025 - features pricing, pros and cons",
    category: "AI",
    image: "https://iskills.com/wp-content/uploads/2024/04/Logolivery.webp",
    date: "Oct 16, 2025",
    readTime: "5 min read",
  },
  {
    id: 19,
    title: "30+ Best ChatGPT Prompts For Lawyers (2025)",
    category: "Prompts",
    image: "https://iskills.com/wp-content/uploads/2024/04/loyae-reviews.webp",
    date: "Oct 29, 2025",
    readTime: "10 min read",
  },
  {
    id: 20,
    title: "25 chatgpt prompts fr copying to boost yur skills",
    category: "Tools",
    image: "https://iskills.com/wp-content/uploads/2024/04/generate-content-ideas.webp",
    date: "Oct 20, 2025",
    readTime: "8 min read",
  },
  {
    id: 21,
    title: "Taskade Review 2025 - features pricing, pros and cons",
    category: "AI",
    image: "https://iskills.com/wp-content/uploads/2024/04/durable-review.webp",
    date: "Oct 16, 2025",
    readTime: "5 min read",
  },
  {
    id: 22,
    title: "Taskade Review 2025 - features pricing, pros and cons",
    category: "AI",
    image: "https://iskills.com/wp-content/uploads/2024/04/munch-ai.webp",
    date: "Oct 16, 2025",
    readTime: "5 min read",
  },
  {
    id: 23,
    title: "Taskade Review 2025 - features pricing, pros and cons",
    category: "AI",
    image: "https://iskills.com/wp-content/uploads/2024/04/cheap.webp",
    date: "Oct 16, 2025",
    readTime: "5 min read",
  },
  {
    id: 24,
    title: "Taskade Review 2025 - features pricing, pros and cons",
    category: "AI",
    image: "https://iskills.com/wp-content/uploads/2024/04/free-domains-1024x661-1.webp",
    date: "Oct 16, 2025",
    readTime: "5 min read",
  },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All Blog Post");

  const filteredCards =
    activeCategory === "All Blog Post"
      ? cardsData
      : cardsData.filter((card) => card.category === activeCategory);



  return (
    <div className="tools-wrapper">

      <div className="seo-header">

        <h1 className="heading">Blog</h1>

        <p className="sub">
          Dive into the iSkills Blog: Your go-to resource for the latest insights, tips, and trends in digital marketing.
          From in-depth articles on SEO and eCommerce to practical guides on video animation and content strategy, our blog is designed to keep you informed and ahead in the ever-evolving world of digital marketing. Explore our posts to gain valuable knowledge that can propel your career forward.
        </p>

        <div className="search-bar">
          <span className="icon">🔍︎</span>
          <input type="text" placeholder="Search your query!" />
        </div>

      </div>

      <div className="container">
        <div className="buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              className={cat === activeCategory ? "active" : ""}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="cards-gridd">
          {filteredCards.map((card) => (
            <div className="carrd" key={card.id}>
              <img src={card.image} alt={card.title} />

              <h3>{card.title}</h3>
              <p>{card.desc}</p>

              <div className="metaa">
                <span>{card.date}</span>
                <span>{card.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

    </div>
  );
};

export default Blog;
