// src/data/blogs.ts
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  publishedAt: string;
  readTime?: string;
  category: "Research" | "Guides" | "Analysis";
}
export const blogs: BlogPost[] = [
  {
    slug: "how-ai-detects-crypto-scams",
    title: "How AI Detects Crypto Scams Before You Fall for Them",
    excerpt: "A deep dive into how machine learning models analyze on-chain data...",
    content: `But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?`,
    coverImage: "/blog/ai-scam-detection.jpg",
    publishedAt: "Jan 12, 2026",
    readTime: "6 min read",
    category: "Research",
  },
  {
    slug: "common-web3-scam-patterns",
    title: "The Most Common Web3 Scam Patterns You Should Know",
    excerpt: "From fake airdrops to rug pulls...",
    content: `But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?`,
    coverImage: "/blog/web3-scams.jpg",
    publishedAt: "Jan 5, 2026",
    readTime: "5 min read",
    category: "Guides",
  },
  {
    slug: "community-reporting-importance",
    title: "Why Community Reporting Is Critical for Web3 Safety",
    excerpt: "Decentralized safety relies on people...",
    content: `But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?`,
    coverImage: "/blog/community-reports.jpg",
    publishedAt: "Dec 28, 2025",
    readTime: "4 min read",
    category: "Analysis",
  },
  {
    slug: "token-verification-best-practices",
    title: "Token Verification: Best Practices for Staying Safe",
    excerpt: "Learn the steps to verify token legitimacy...",
    content: `But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?`,
    coverImage: "/blog/token-verification.jpg",
    publishedAt: "Dec 20, 2025",
    readTime: "5 min read",
    category: "Guides",
  },
];
