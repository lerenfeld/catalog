import fs from "node:fs";
import { S3 } from "@aws-sdk/client-s3";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const s3 = new S3({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const db = sql("meals.db");

export async function getMeals() {
  const meals = db.prepare("SELECT * FROM meals").all();

  // Convert images field from JSON string to array of strings
  meals.forEach((meal) => {
    meal.images = JSON.parse(meal.images); // Assuming 'images' field is stored as JSON string
  });

  return meals;
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const imageFiles = [];

  for (const image of meal.images) {
    const extension = image.name.split(".").pop();
    const filenameParts = image.name.split(".");
    const pre_filename = filenameParts.slice(0, -1).join(".");

    const fileName = `${pre_filename}-${Date.now()}.${extension}`;

    const bufferedImage = await image.arrayBuffer();

    await s3.putObject({
      Bucket: "wrappbiz-general-bucket",
      Key: fileName,
      Body: Buffer.from(bufferedImage),
      ContentType: image.type,
    });

    imageFiles.push(fileName);
  }

  meal.images = JSON.stringify(imageFiles);

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, images, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @images,
      @slug
    )
  `
  ).run(meal);
}
