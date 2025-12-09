import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);

  eleventyConfig
    .addPassthroughCopy("**/favicon.svg", {
      mode: "html-relative",
    })
    .addPassthroughCopy("./content/feed/pretty-atom-feed.xsl");

  eleventyConfig.addCollection("publishedDishes", function (api) {
    return api.getFilteredByTag("dish").filter((item) => !item.data.draft);
  });

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    stylesheet: "feed/pretty-atom-feed.xsl",
    collection: {
      name: "publishedDishes",
      limit: 10, // 0 means no limit
    },
    metadata: {
      language: "en",
      title: "Dishes",
      subtitle: "Dishes cooked around the world.",
      base: "https://dishes.daaneggen.nl/",
      author: {
        name: "Daan",
      },
    },
  });
}

export const config = {
  dir: {
    input: "content",
    includes: "../_includes",
    data: "../_data",
    output: "_site",
  },
};
