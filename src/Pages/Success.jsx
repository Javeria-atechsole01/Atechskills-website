import React, { useState } from "react";
import Card from "./Card";
import Footer from '../Component/Footer.jsx'
import "./Success.css";
import "./Card.css";

export const categories = [
  "All Female story",
  "Female success story",
  "iVAM success story",
  "Male success story",
];


export const successData = [
  {
    id: 1,
    name: "Ehsan Muhammad",
    image: "https://iskills.com/wp-content/uploads/2025/01/471397752_10232388191354785_9045356442666962479_n.jpg",
    skill: "Blogging",
    batch: "-",
    earnings: "$8000",
    monthly: "-",
    category: "male"
  },
  {
    id: 2,
    name: "Hamza Jehangir",
    image: "https://iskills.com/wp-content/uploads/2025/01/53d40229-09e9-437b-860b-d533db32d89f.jpeg",
    skill: "Freelancing",
    batch: "6",
    earnings: "2 Crore + PKR",
    monthly: "$3000",
    category: "male"
  },
  {
    id: 3,
    name: "Nafia Memon",
    image: "https://iskills.com/wp-content/uploads/2025/01/Female-9.webp",
    skill: "Blogging",
    batch: "5",
    earnings: "3 Million + PKR",
    monthly: "50K + PKR",
    category: "female"
  },
  {
    id: 4,
    name: "M.Umair",
    image: "https://iskills.com/wp-content/uploads/2025/01/Male-19.webp",
    skill: "Freelancing",
    batch: "6",
    earnings: "2 Crore + PKR",
    monthly: "$3000",
    category: "male"
  },
  {
    id: 5,
    name: "Waris khan",
    image: "https://iskills.com/wp-content/uploads/2025/01/371329106_1961332287566976_2215364139155296949_n.jpg",
    skill: "Freelancing",
    batch: "7",
    earnings: "$10,000",
    monthly: "65k + pkr",
    category: "male"
  },
  {
    id: 6,
    name: "Faheem nawaz",
    image: "https://iskills.com/wp-content/uploads/2025/01/452111615_7737077256418333_5383719043811813134_n.jpg",
    skill: "SEO Bloging & Freelancing",
    batch: "5",
    earnings: "$20000",
    monthly: "$600",
    category: "iVAM"
  },
  {
    id: 7,
    name: "Tarun Kasipandian",
    image: "https://iskills.com/wp-content/uploads/2025/01/Male-19.webp",
    skill: "SEO service",
    batch: "-",
    earnings: "$20000",
    monthly: "$3000",
    category: "male"
  },
  {
    id: 8,
    name: "Parvez Hussain",
    image: "https://iskills.com/wp-content/uploads/2025/01/461167583_1609709172913101_6305154027503655057_n.jpg",
    skill: "-",
    batch: "-",
    earnings: "-",
    monthly: "-",
    category: "iVAM"
  },
  {
    id: 9,
    name: "Iqra Marium",
    image: "https://iskills.com/wp-content/uploads/2025/01/Female-8.webp",
    skill: "Freelancing",
    batch: "-",
    earnings: "-",
    monthly: "$10000",
    category: "female"
  },
  {
    id: 10,
    name: "Shamama Tul Umber",
    image: "https://iskills.com/wp-content/uploads/2024/12/Shamama-tul-Umber.webp",
    skill: "SEO bloggig",
    batch: "8",
    earnings: "$60000",
    monthly: "$5000",
    category: "female"
  },
  {
    id: 11,
    name: "Syeda Hafsa Ishaq",
    image: "https://iskills.com/wp-content/uploads/2024/04/Hafsa.webp",
    skill: "SEO & Dropshing",
    batch: "5",
    earnings: "$million PKR",
    monthly: "500,000 PKR",
    category: "female"
  },
  {
    id: 12,
    name: "Arsalan Javed",
    image: "https://iskills.com/wp-content/uploads/2024/10/Screenshot-2024-10-16-153606.webp",
    skill: "Video animation",
    batch: "iVAM 3",
    earnings: "PKR 250K PM",
    category: "ivam"
  },
  {
    id: 13,
    name: "Maham Chaudary",
    image: "https://iskills.com/wp-content/uploads/2024/10/Screenshot-2024-10-16-164946.webp",
    skill: "Video animation",
    batch: "iVAM 3",
    earnings: "PKR 100K+ PM",
    category: "ivam"
  },
  {
    id: 14,
    name: "Syeda Hafsa Ishaq",
    image: "https://iskills.com/wp-content/uploads/2024/04/Hafsa.webp",
    skill: "SEO & Dropshing",
    batch: "5",
    earnings: "$%million PKR",
    monthly: "500,000 PKR",
    category: "ivam"
  },
  {
    id: 15,
    name: "Syeda Hafsa Ishaq",
    image: "https://iskills.com/wp-content/uploads/2024/10/Screenshot-2024-10-16-151154.webp",
    skill: "iVAM",
    batch: "2",
    earnings: "$60K",
    category: "ivam"
  },
  {
    id: 16,
    name: "Ayesha Umer",
    image: "https://iskills.com/wp-content/uploads/2024/10/Screenshot-2024-10-16-144918.webp",
    skill: "iVAM",
    batch: "2",
    earnings: "500K PKR",
    category: "ivam"
  },
];

const Success = () => {
  const [filter, setFilter] = useState("all");

  const filteredCards =
    filter === "all"
      ? successData
      : successData.filter((item) => item.category === filter);

  return (
    <div className="wrapper">

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

      <div className="button-row">

        <button
          onClick={() => setFilter("all")}
          className={`bton ${filter === "all" ? "active" : ""}`}
        >
          All Success Story
        </button>

        <button
          onClick={() => setFilter("female")}
          className={`bton ${filter === "female" ? "active" : ""}`}
        >
          Female Success Story
        </button>

        <button
          onClick={() => setFilter("ivam")}
          className={`bton ${filter === "ivam" ? "active" : ""}`}
        >
          iVAM Success Story
        </button>

        <button
          onClick={() => setFilter("male")}
          className={`bton ${filter === "male" ? "active" : ""}`}
        >
          Male Success Story
        </button>
      </div>

      <div className="cardd-grid">
        {filteredCards.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div><br />


      <h1>Submit your success story</h1><br />
      <p className="subb">have you completed any course from iSkills?
        <br />Submit your success story now.</p>
      <button className="contact-btnn">Submit Your Story</button>

      <Footer />

    </div>
  );
};

export default Success;
