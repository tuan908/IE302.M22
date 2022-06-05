import { Dialog } from '@mui/material';
import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { PinterestFile } from '../Content';

interface Props {
  open?: boolean;
  onClose?: () => void;
  item?: PinterestFile;
}

const useStyles = makeStyles()(() => ({
  paper: { maxWidth: 500, with: '100%' },
}));

const EmbeddedDialog: React.FC<Props> = ({ open, onClose }: Props) => {
  const { classes } = useStyles();
  return (
    <Dialog
      classes={{ paper: classes.paper }}
      open={open!}
      onClose={onClose}
    ></Dialog>
  );
};

export default EmbeddedDialog;
