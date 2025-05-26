import { toPng } from 'html-to-image';

/**
 * Genera una imagen PNG desde un nodo HTML, con opciones optimizadas para exportar a PDF.
 * @param nodo - Elemento HTML del que se generará la imagen.
 * @returns Una URL de imagen PNG en formato Data URL.
 */
export async function mejorarImagenPDF(nodo: HTMLElement): Promise<string> {
  try {
    const dataUrl = await toPng(nodo, {
      quality: 1,
      backgroundColor: '#ffffff',
      canvasWidth: 1000,
      canvasHeight: 600,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
      },
    });

    return dataUrl;
  } catch (error) {
    console.error('Error al generar imagen desde nodo:', error);
    throw error;
  }
}
