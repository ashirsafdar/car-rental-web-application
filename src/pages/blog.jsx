import React from "react";
import { FaClock } from "react-icons/fa";
import Footer from "../components/footer";
const heroVideo = new URL("../assets/Red_car_driving_mountain_road_20260914122708.mp4", import.meta.url).href;

const blogPosts = [
  {
    category: "Car Rental Guide",
    readTime: "5 min read",
    title: "How to Choose the Perfect Rental Car for Your Trip",
    description:
      "Find the right car for your needs, budget, and travel style. Here's a simple guide to help you make the best choice.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "Money Saving Tips",
    readTime: "4 min read",
    title: "10 Ways to Save Money on Your Next Car Rental",
    description:
      "From booking tricks to avoiding extra fees, learn how to get the best deals and save more on your car rental.",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "Travel & Road Trips",
    readTime: "6 min read",
    title: "Best Rental Cars for Family Trips",
    description:
      "Spacious, safe and comfortable — discover the best rental cars for your next family adventure.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "Travel & Road Trips",
    readTime: "5 min read",
    title: "The Ultimate Road Trip Checklist",
    description:
      "Don't forget anything! Use this checklist to make your road trip stress-free and well-prepared.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "Car Comparison",
    readTime: "5 min read",
    title: "SUV vs Sedan: Which Rental Car Is Right for You?",
    description:
      "Compare the pros and cons of SUVs and sedans to find the best fit for your needs and budget.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "Car Rental Guide",
    readTime: "4 min read",
    title: "Car Rental Insurance Explained: Do You Really Need It?",
    description:
      "Understand what car rental insurance covers, what it doesn't, and whether you really need it on your trip.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  },
];

const BlogCard = ({ post }) => (
  <article className="latest-blog-card">
    <div className="latest-blog-image-wrap">
      <img src={post.image} alt={post.title} className="latest-blog-image" />
    </div>

    <div className="latest-blog-content">
      <div className="latest-blog-meta">
        <span className="latest-blog-badge">{post.category}</span>
        <span className="latest-blog-time">
          <FaClock /> {post.readTime}
        </span>
      </div>

      <h3>{post.title}</h3>
      <p>{post.description}</p>
      <a href="#" className="latest-blog-link">
        Read More <span aria-hidden="true">→</span>
      </a>
    </div>
  </article>
);

const Blog = () => {
  return (
    <main className="blog-page">
      <section className="blog-hero-video" aria-label="Featured car travel video">
        <video
          className="blog-hero-video-player brightness-110"
          src={heroVideo}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          aria-label="Luxury car promotional video"
        />

        <div className="blog-hero-video-overlay" aria-hidden="true" />

        <div className="blog-hero-content">
          <span className="blog-hero-tag">OUR BLOG</span>
          <h1>
            Tips, Guides &
            <span className="blog-hero-line-break">Travel Inspiration</span>
          </h1>
          <p>
            Get the best car rental tips, travel guides, and expert advice to make your journey smoother,
            safer, and more enjoyable.
          </p>
        </div>
      </section>

      <section className="latest-blog-section" aria-label="Latest blog posts">
        <div className="latest-blog-shell">
          <div className="latest-blog-grid">
            {blogPosts.map((post) => (
              <BlogCard key={post.title} post={post} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Blog;