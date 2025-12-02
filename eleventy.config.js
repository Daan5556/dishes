import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);

  eleventyConfig.addPassthroughCopy("**/favicon.svg", {
    mode: "html-relative",
  });

  eleventyConfig.addCollection("publishedDishes", function (api) {
    return api.getFilteredByTag("dish").filter((item) => !item.data.draft);
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
