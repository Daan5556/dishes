import path from "path";
import fs from "fs";
import { sentenceCase } from "change-case";

export default {
  tags: ["dish"],
  layout: "layout/dish.njk",
  favicon: "favicon.svg",

  permalink: function ({ page: { fileSlug }, draft }) {
    if (draft) return false;

    return `/cooked/${fileSlug}/`;
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

    formattedMonth: function ({ page: { date } }) {
      const options = { month: "long", year: "numeric" };
      return date.toLocaleDateString("en-GB", options);
    },

    isoDate: function ({ page: { date } }) {
      return date.toISOString().split("T")[0];
    },

    description: function ({ dish, country, page: { date } }) {
      return `${dish} from ${country} cooked on ${date.toLocaleDateString()}.`;
    },

    image: ({ draft, page: { inputPath } }) => {
      if (draft) return;

      const dir = path.dirname(inputPath);
      const files = fs.readdirSync(dir);
      const image = files.find((file) =>
        /^dish\.(jpe?g|png|gif|webp|svg)$/i.test(file),
      );

      if (!image) throw new Error("No valid image provided!");
      return image;
    },

    dishNumber: function (data) {
      const { collections, page } = data;

      const dishes = collections.dish.sort((a, b) => a.date - b.date);

      const index = dishes.findIndex((d) => d.inputPath === page.inputPath);

      return index + 1; // Make it 1-based
    },
  },
};
