import { PlayArrow } from '@mui/icons-material';
import clsx from 'clsx';
import { FC } from 'react';
import Player from 'react-player';
import { PinterestFile } from '../Dialog/Content';
import useStyles from './VideoViewerMuiStyledComponent';

interface Props {
  url?: string;
  isFullScreen?: boolean;
  file?: PinterestFile;
}

const PinterestVideoViewer: FC<Props> = ({ isFullScreen, url }: Props) => {
  const { classes } = useStyles();
  return (
    <div
      className={clsx(classes.container, isFullScreen && classes.fullScreen)}
    >
      <Player playIcon={<PlayArrow />} src={url} />
    </div>
  );
};

export default PinterestVideoViewer;
