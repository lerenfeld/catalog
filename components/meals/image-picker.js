"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import classes from "./image-picker.module.css";

export default function ImagePicker({ label, name, onFilesChange }) {
  const [pickedImages, setPickedImages] = useState([]);
  const [files, setFiles] = useState([]);
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);

    if (selectedFiles.length === 0) {
      setPickedImages([]);
      return;
    }

    // Create an array of image URLs for preview
    const imagePreviews = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPickedImages(imagePreviews);

    // Pass the files to the parent component
    onFilesChange(selectedFiles);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <input
          className={classes.input}
          type='file'
          id={name}
          accept='image/png, image/jpeg'
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
          multiple={true}
        />
        <button
          className={classes.button}
          type='button'
          onClick={handlePickClick}
        >
          Pick Images
        </button>

        {files && files.length > 0 && <span>{files.length} תמונות נבחרו</span>}
      </div>

      <div className={classes.previews}>
        {pickedImages.map((src, index) => (
          <div className={classes.preview} key={index}>
            <Image
              src={src}
              alt={`Selected image ${index + 1}`}
              layout='fill'
              objectFit='cover'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
