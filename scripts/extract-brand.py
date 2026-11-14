"""Faithfully extract PDF vector paths; no font substitution or logo redrawing."""
from pathlib import Path
import pymupdf as fitz

doc = fitz.open('Vigilix_Brand_Identity_Guidelines.pdf')
paths = doc[4].get_drawings()
out = Path('public/brand')
out.mkdir(parents=True, exist_ok=True)

def color(value):
    return 'none' if value is None else '#' + ''.join(f'{round(c * 255):02x}' for c in value)

def export(name, indices, square=False):
    elements, points = [], []
    for i in indices:
        shape, commands, last = paths[i], [], None
        for item in shape['items']:
            kind = item[0]
            if kind not in ('l', 'c'):
                raise ValueError(f'Unexpected path command: {kind}')
            start = item[1]
            if last != start:
                if last is not None and shape['fill'] is not None:
                    commands.append('Z')
                commands.append(f'M{start.x:.4f},{start.y:.4f}')
            if kind == 'l':
                end = item[2]
                commands.append(f'L{end.x:.4f},{end.y:.4f}')
            else:
                a, b, end = item[2:]
                commands.append(f'C{a.x:.4f},{a.y:.4f} {b.x:.4f},{b.y:.4f} {end.x:.4f},{end.y:.4f}')
            last = end
            points.extend(item[1:])
        if shape['closePath'] or shape['fill'] is not None:
            commands.append('Z')
        elements.append(f'<path d="{" ".join(commands)}" fill="{color(shape["fill"])}" stroke="{color(shape["color"])}" stroke-width="{shape["width"] or 0}" fill-rule="{"evenodd" if shape["even_odd"] else "nonzero"}"/>')
    x0, y0 = min(p.x for p in points), min(p.y for p in points)
    x1, y1 = max(p.x for p in points), max(p.y for p in points)
    width, height = x1-x0, y1-y0
    if square:
        side = max(width, height) * 1.3
        x0 -= (side-width)/2
        y0 -= (side-height)/2
        width = height = side
    background = f'<rect x="{x0:.4f}" y="{y0:.4f}" width="{width:.4f}" height="{height:.4f}" fill="#0B0D12"/>' if name == 'favicon.svg' else ''
    content = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0:.4f} {y0:.4f} {width:.4f} {height:.4f}">' + background + ''.join(elements) + '</svg>'
    (out/name).write_text(content)
    print(name, round(width/height, 3))

export('logo-dark.svg', range(14,19))
export('logo-light.svg', range(5,10))
export('logo-mono.svg', range(19,24))
export('monogram.svg', [14,15], True)
export('favicon.svg', [14,15], True)
