import fs from "fs";
import { readdir } from "node:fs/promises";

export default async function () {
  const path = "content/dishes/";
  const dishesDir = await readdir(path);

  return dishesDir
    .filter((entry) => {
      const stats = fs.statSync(`${path}/${entry}`);

      return !stats.isFile();
    })
    .sort();
}
