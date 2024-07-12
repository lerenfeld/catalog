"use client";
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import classes from "./MealSlugCarousel2.module.css";

const MealSlugCarousel2 = ({ meal }) => {
  // Parse the images field if it's a JSON string
  let images;
  try {
    images = JSON.parse(meal.images);
  } catch (e) {
    console.error("Failed to parse images:", e);
    images = [];
  }

  console.log("Images:", images); // Debug log

  // Transform images to the format expected by react-image-gallery
  const galleryImages = images.map((image) => ({
    original: `https://wrappbiz-general-bucket.s3.eu-north-1.amazonaws.com/${image}`,
    thumbnail: `https://wrappbiz-general-bucket.s3.eu-north-1.amazonaws.com/${image}`,
    originalAlt: meal.title,
    thumbnailAlt: meal.title,
  }));

  return (
    <div className={classes.carousel}>
      {galleryImages.length > 0 ? (
        <ImageGallery
          items={galleryImages}
          showThumbnails={true}
          showFullscreenButton={true}
          showPlayButton={false}
          useBrowserFullscreen={true}
        />
      ) : (
        <p>No images to display</p>
      )}
    </div>
  );
};

export default MealSlugCarousel2;
