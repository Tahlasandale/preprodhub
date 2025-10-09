// Common utilities for MaGazette
// Keep browser-compatible, no bundler.

window.Utils = (function () {
  function pad2(n) {
    return String(n).padStart(2, '0');
  }

  function formatTimeHMS(date) {
    const h = pad2(date.getHours());
    const m = pad2(date.getMinutes());
    const s = pad2(date.getSeconds());
    return `${h}:${m}:${s}`;
  }

  function isImageUrl(content) {
    return typeof content === 'string' && /^(https?:\/\/).+\.(jpg|jpeg|png|webp)$/i.test(content);
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result || '';
        const parts = String(result).split(',');
        resolve(parts.length > 1 ? parts[1] : '');
      };
      reader.onerror = (err) => reject(err);
    });
  }

  async function uploadToImgBB(file, apiKey) {
    const base64Image = await fileToBase64(file);
    const formData = new FormData();
    formData.append('image', base64Image);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Erreur upload ImgBB');
    const data = await response.json();
    if (!data.success) throw new Error('Erreur upload ImgBB');
    return data.data.url;
  }

  return {
    pad2,
    formatTimeHMS,
    isImageUrl,
    fileToBase64,
    uploadToImgBB,
  };
})();
