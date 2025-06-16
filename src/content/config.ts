import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const searchable = z.object({
  title: z.string(),
  description: z.string().optional(),
  autodescription: z.boolean().default(true),
  draft: z.boolean().default(false),
});

const about = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "./src/content/about" }),
  schema: ({ image }) =>
    searchable.extend({
      image: image().optional(),
      imageAlt: z.string().default(""),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    searchable.extend({
      date: z.date().optional(),
      image: image().optional(),
      imageAlt: z.string().default(""),
      categories: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional(),
      complexity: z.number().default(1),
      hideToc: z.boolean().default(false),
    }),
});

const home = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "./src/content/home" }),
  schema: ({ image }) =>
    z.object({
      image: image().optional(),
      imageAlt: z.string().default(""),
      title: z.string(),
      content: z.string(),
      buttons: z
        .array(
          z.object({
            label: z.string(),
            link: z.string(),
          })
        )
        .optional(),
    }),
});

const terms = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "./src/content/terms" }),
  schema: searchable,
});

// Add missing collections for other pages
const ressources = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "./src/content/ressources" }),
  schema: searchable,
});

const laMethodeAia = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "./src/content/la-methode-aia" }),
  schema: searchable,
});

// Export collections
export const collections = {
  about,
  blog,
  home,
  terms,
  ressources,
  "la-methode-aia": laMethodeAia,
};