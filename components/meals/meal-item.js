"use client";

import Link from "next/link";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import classes from "./meal-item.module.css";
// import ReactImageGallery from "react-image-gallery";

export default function MealItem({
  title,
  slug,
  images = [],
  summary,
  creator,
}) {
  const imageBaseUrl =
    "https://wrappbiz-general-bucket.s3.eu-north-1.amazonaws.com/";

  // Ensure images is an array and not a string representation of an array
  if (!Array.isArray(images)) {
    return null; // Or handle accordingly if images is not an array
  }

  const galleryFormatImages = images.map((image) => {
    return {
      original: `${imageBaseUrl}${image}`,
      thumbnail: `${imageBaseUrl}${image}`,
    };
  });

  return (
    <article className={classes.meal}>
      <header>
        {/* <div>
          <ReactImageGallery items={galleryFormatImages} />
        </div> */}

        <div className={classes.carouselContainer}>
          <Carousel showArrows={true} showThumbs={false} dynamicHeight={true}>
            {images.map((image, index) => (
              <div key={index} className={classes.image}>
                <Image
                  src={`${imageBaseUrl}${image}`}
                  alt={title}
                  layout='fill'
                  objectFit='cover'
                />
              </div>
            ))}
          </Carousel>
        </div>

        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
