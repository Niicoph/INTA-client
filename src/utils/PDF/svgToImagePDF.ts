export default async function svgToDataURL(svgElement: SVGSVGElement, scaleFactor = 2): Promise<string> {
  const svgString = new XMLSerializer().serializeToString(svgElement);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.crossOrigin = 'anonymous';

  return new Promise((resolve, reject) => {
    img.onload = () => {
      const width = img.width * scaleFactor;
      const height = img.height * scaleFactor;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('No se pudo obtener el contexto 2D');

      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/png');

      URL.revokeObjectURL(url);
      resolve(dataUrl);
    };

    img.onerror = reject;
    img.src = url;
  });
}
