// @ts-check

import fs from "node:fs/promises";
import { kebabCase } from "change-case";

const dishTemplate = `---
dish:
date: 
draft: true
---

`;
async function parseCountries() {
  try {
    const data = await fs.readFile("./scripts/all.json", { encoding: "utf8" });
    const json = JSON.parse(data);
    const countries = {};

    json.forEach((e) => {
      let { name, region, alpha2Code } = e;

      region = region.toLowerCase();
      const countryCode = alpha2Code.toLowerCase();

      if (!(region in countries)) {
        countries[region] = [];
      }

      countries[region].push({ name, countryCode });
    });

    return countries;
  } catch (err) {
    console.error(err);
  }
}

function createFiles(countries) {
  const keys = Object.keys(countries);

  keys.forEach(async (key) => {
    if (!key) return;

    const path = `regions/${key}`;

    await fs.mkdir(path, { recursive: true });
    await fs.writeFile(
      `${path}/${key}.11tydata.js`,
      `export default {
  tags: ["${key}"] 
}`,
    );

    countries[key].forEach(async (country) => {
      const dirName = `${kebabCase(country.name)}`;
      const favicon = await fetchFlag(country.countryCode);

      await fs.mkdir(`${path}/${dirName}`, { recursive: true });
      await fs.writeFile(`${path}/${dirName}/index.md`, dishTemplate);
      await fs.writeFile(
        `${path}/${dirName}/favicon.svg`,
        Buffer.from(favicon),
      );
    });
  });
}

async function fetchFlag(countryCode) {
  const response = await fetch(
    `https://raw.githubusercontent.com/lipis/flag-icons/refs/heads/main/flags/4x3/${countryCode}.svg`,
  );

  return await response.arrayBuffer();
}

async function main() {
  const countries = await parseCountries();
  if (!countries) return;

  createFiles(countries);
}

main();
