import { FC, useCallback, useState } from 'react';

import useStyles from './ImageViewerMuiStyledComponent';
import { select } from 'd3-selection';
import { zoom as d3Zoom } from 'd3-zoom';

interface Props {
  file?: {
    link?: string;
    originalName?: string;
  };
}

const PinterestImageViewer: FC<Props> = ({ file }: Props) => {
  const { classes } = useStyles();
  const { container, image } = classes;
  const [imageUrl] = useState<string>('');
  const [svgTransform, setSvgTransform] = useState();
  const SVGContainer = useCallback((node) => {
    if (node) {
      const selection = select(node);

      const zoom = d3Zoom()
        .on('zoom', (event) => {
          const { transform } = event;
          const { height, width } = node.getBoundingClientRect();

          // Calculate maximum translation
          const maxX = -width * (transform.k - 1);
          const maxY = -height * (transform.k - 1);

          // Prevent from dragging image out of SVG
          transform.x = transform.x > 0 ? 0 : transform.x;
          transform.x = transform.x < maxX ? maxX : transform.x;
          transform.y = transform.y > 0 ? 0 : transform.y;
          transform.y = transform.y < maxY ? maxY : transform.y;

          setSvgTransform(transform);
        })
        .scaleExtent([1, 5]);

      selection.call(zoom);
    }
  }, []);

  if (!imageUrl) return null;

  return (
    <>
      <img src={imageUrl} alt={file!?.originalName} className={image} />
      <svg className={container} ref={SVGContainer}>
        <image
          height="100%"
          transform={svgTransform}
          width="100%"
          xlinkHref={imageUrl}
        />
      </svg>
    </>
  );
};

export default PinterestImageViewer;
