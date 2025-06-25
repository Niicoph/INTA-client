export default function emptyChart(): SVGSVGElement {
  const svgNS = 'http://www.w3.org/2000/svg';
  const width = 1000;
  const height = 500;
  const cx = width / 2;
  const cy = height / 2;

  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', String(width));
  svg.setAttribute('height', String(height));
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('xmlns', svgNS);

  // Fondo
  const rect = document.createElementNS(svgNS, 'rect');
  rect.setAttribute('x', '0');
  rect.setAttribute('y', '0');
  rect.setAttribute('rx', '24');
  rect.setAttribute('ry', '24');
  rect.setAttribute('width', String(width));
  rect.setAttribute('height', String(height));
  rect.setAttribute('fill', '#f4f4f5');
  rect.setAttribute('stroke', '#d4d4d8');
  rect.setAttribute('stroke-dasharray', '6,4');
  rect.setAttribute('stroke-width', '2');
  svg.appendChild(rect);

  // Ícono (colocado arriba del centro)
  const icon = document.createElementNS(svgNS, 'path');
  icon.setAttribute('d', 'M12 9v2m0 4h.01M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z');
  icon.setAttribute('fill', 'none');
  icon.setAttribute('stroke', '#71717A');
  icon.setAttribute('stroke-width', '3');
  icon.setAttribute('stroke-linecap', 'round');
  icon.setAttribute('stroke-linejoin', 'round');

  const iconWidth = 24 * 3; // porque scale(3)
  const iconHeight = 24 * 3;
  icon.setAttribute('transform', `translate(${cx - iconWidth / 2}, ${cy - iconHeight}) scale(3)`);
  svg.appendChild(icon);

  // Texto (colocado debajo del centro)
  const text = document.createElementNS(svgNS, 'text');
  text.setAttribute('x', String(cx));
  text.setAttribute('y', String(cy + 50));
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('fill', '#71717A');
  text.setAttribute('font-size', '28');
  text.setAttribute('font-family', 'Arial, sans-serif');
  text.textContent = 'No hay conjuntos para mostrar.';
  svg.appendChild(text);

  return svg;
}