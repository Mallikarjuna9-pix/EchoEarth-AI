/**
 * Client-side image optimizer to drastically accelerate analysis
 * Compresses and resizes high-resolution photos (e.g. 10MB phone snapshots)
 * down to crisp ~120KB JPEG payloads for near-instant transmission to the AI model.
 */
export async function optimizeImageForAnalysis(
  fileOrDataUrl: File | string,
  maxWidth = 1024,
  maxHeight = 1024,
  quality = 0.82
): Promise<{ dataUrl: string; mimeType: string }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        let { width, height } = img;
        if (!width || !height) {
          width = 600;
          height = 600;
        }

        // Scale down keeping aspect ratio
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          if (typeof fileOrDataUrl === "string") {
            resolve({ dataUrl: fileOrDataUrl, mimeType: "image/jpeg" });
          } else {
            const reader = new FileReader();
            reader.onload = (e) =>
              resolve({ dataUrl: e.target?.result as string, mimeType: "image/jpeg" });
            reader.readAsDataURL(fileOrDataUrl);
          }
          return;
        }

        // Fill white background for transparency conversion
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        const optimizedDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve({ dataUrl: optimizedDataUrl, mimeType: "image/jpeg" });
      } catch (canvasErr) {
        // In case of canvas security tainted exception
        if (typeof fileOrDataUrl === "string") {
          resolve({ dataUrl: fileOrDataUrl, mimeType: "image/jpeg" });
        } else {
          const reader = new FileReader();
          reader.onload = (e) =>
            resolve({ dataUrl: e.target?.result as string, mimeType: "image/jpeg" });
          reader.readAsDataURL(fileOrDataUrl);
        }
      }
    };

    img.onerror = () => {
      // Graceful fallback to raw string or file reader
      if (typeof fileOrDataUrl === "string") {
        resolve({ dataUrl: fileOrDataUrl, mimeType: "image/jpeg" });
      } else {
        const reader = new FileReader();
        reader.onload = (e) =>
          resolve({ dataUrl: e.target?.result as string, mimeType: "image/jpeg" });
        reader.readAsDataURL(fileOrDataUrl);
      }
    };

    if (typeof fileOrDataUrl === "string") {
      img.src = fileOrDataUrl;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = () => {
        resolve({ dataUrl: "", mimeType: "image/jpeg" });
      };
      reader.readAsDataURL(fileOrDataUrl);
    }
  });
}
