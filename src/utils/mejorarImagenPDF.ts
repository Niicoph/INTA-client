import domtoimage from 'dom-to-image-more';

export async function mejorarImadenPDF(
  nodo: HTMLElement,
  escala: number = 2,
): Promise<string> {
  const width = nodo.offsetWidth;
  const height = nodo.offsetHeight;

  try {
    const dataUrl = await domtoimage.toPng(nodo, {
      width: width * escala,
      height: height * escala,
      style: {
        transform: `scale(${escala})`,
        transformOrigin: 'top left',
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: '#ffffff',
      },
    //   filter: (node: any) => {
    //     if (!(node instanceof Element)) return true;
    //     const style = window.getComputedStyle(node);
    //     return (
    //       !style.color.includes('oklab') &&
    //       !style.backgroundColor.includes('oklab') &&
    //       !style.color.includes('oklch') &&
    //       !style.backgroundColor.includes('oklch')
    //     );
    //   },
    });

    return dataUrl;
  } catch (error) {
    console.error('Error al generar imagen desde nodo:', error);
    throw error;
  }
}