export class BrowserImage {
  imageUrl: string;
  imageBlob: Blob | null;
  oldImageUrl: string | null;
  urlCreator: typeof window.URL | typeof window.webkitURL;
  constructor() {
    this.imageUrl = "";
    this.imageBlob = null;
    this.oldImageUrl = null;
    this.urlCreator = window.URL || window.webkitURL;
  }
  async updateImage(image: string, type = "image/png") {
    if (this.oldImageUrl) {
      this.urlCreator.revokeObjectURL(this.oldImageUrl);
      this.oldImageUrl = null;
    }

    if (this.imageUrl) {
      this.oldImageUrl = this.imageUrl;
    }

    const imageBlob = await this.b64toBlob(image, type);
    const imageUrl = this.urlCreator.createObjectURL(imageBlob);
    this.imageUrl = imageUrl;
    this.imageBlob = imageBlob;
    return { url: imageUrl, blob: imageBlob };
  }
  async b64toBlob(base64: string, type = "application/octet-stream") {
    const res = await fetch(`data:${type};base64,${base64}`);
    return await res.blob();
  }
}
