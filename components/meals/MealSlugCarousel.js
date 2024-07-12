"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import classes from "./MealSlugCarousel.module.css";
import Image from "next/image";

const MealSlugCarousel = ({ meal }) => {
  // Parse the images field if it's a JSON string
  let images;
  try {
    images = JSON.parse(meal.images);
  } catch (e) {
    console.error("Failed to parse images:", e);
    images = [];
  }

  console.log("Images:", images); // Debug log

  return (
    <div className={classes.carousel}>
      <p>Carousel Component</p> {/* Temporary text for debug */}
      {images.length > 0 ? (
        <>
          <div className={classes.carouselContainer}>
            <Carousel showArrows={true} showThumbs={false} dynamicHeight={true}>
              {images.map((image, index) => (
                <div key={index} className={classes.image}>
                  <Image
                    src={`https://wrappbiz-general-bucket.s3.eu-north-1.amazonaws.com/${image}`}
                    alt={meal.title}
                    layout='fill'
                    objectFit='cover'
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </>
      ) : (
        <p>No images to display</p>
      )}
    </div>
  );
};

export default MealSlugCarousel;
