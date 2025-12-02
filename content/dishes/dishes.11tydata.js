import { sentenceCase } from "change-case";

export default {
  tags: ["dish"],
  layout: "layout/dish.njk",
  image: "dish.png",
  favicon: "favicon.svg",

  permalink: function ({ page: { fileSlug }, draft }) {
    if (draft) return false;

    return `/${fileSlug}/`;
  },

  eleventyComputed: {
    country: function ({ page: { fileSlug }, country }) {
      return country || sentenceCase(fileSlug);
    },

    title: function ({ draft, country, dish }) {
      if (!draft && !dish) {
        throw new Error("Dish is not defined.");
      }
      return `${country} — ${dish}`;
    },

    formattedDate: function ({ page: { date } }) {
      const options = { day: "2-digit", month: "long", year: "numeric" };
      return date.toLocaleDateString("en-GB", options);
    },

    description: function ({ dish, country, page: { date } }) {
      return `${dish} from ${country} cooked on ${date.toLocaleDateString()}.`;
    },
  },
};
