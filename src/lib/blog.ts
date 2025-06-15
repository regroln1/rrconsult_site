// src/lib/blog.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// 📁 dossier où tu mets tes articles .md
const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export function getBlogEntries() {
  const files = fs.readdirSync(BLOG_DIR);

  return files.map((filename) => {
    const slug = filename.replace(".md", "");
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      ...data,
      slug,
    };
  });
}
