import {
  Button,
  ButtonBase,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import clsx from 'clsx';
import { FC, useMemo, useState } from 'react';
import setMessage from 'src/redux/action/message';
import { usePinterestDispatch } from 'src/redux/hooks';
import useStyles from './Component';

interface Props {
  item?: { _id: string };
}

const EmbeddedContent: FC<Props> = ({ item }: Props) => {
  const { classes } = useStyles();
  const dispatch = usePinterestDispatch();

  const [activeOption, setActiveOption] = useState<number>(0);
  const viewerUrl = `${window.origin}/${item!?._id}`;

  const embeddedScript = useMemo(() => {
    if (activeOption === 1) {
      const script = 'link';
      return script;
    }
    const iframeTitle = 'Pinterest';

    const iframeAttributes = [
      'width="100%"',
      'height="100%"',
      'border="0"',
      'frameborder="0"',
      'style="border: 0;"',
      'allowfullscreen',
      'mozallowfullscreen',
      'webkitallowfullscreen',
      'allow="vr;gyroscope;accelerometer"',
      `title="${iframeTitle}"`,
    ].join(' ');

    return `<iframe src="${viewerUrl}" ${iframeAttributes} />`;
  }, [activeOption, item!?._id, viewerUrl]);

  const handleCopyScript = async () => {
    await navigator.clipboard.writeText(embeddedScript);
    const action = setMessage('Link copied to your clipboard', 'success');
    dispatch(action);
  };
  return (
    <Grid container direction="column">
      <Grid container item spacing={2}>
        <Grid className={classes.embedOptionWrapper} item>
          <ButtonBase
            className={classes.embedOptionButton}
            disableRipple
            onClick={() => setActiveOption(0)}
          >
            <Paper
              className={clsx(
                classes.embedOption,
                activeOption === 0 && classes.embedOptionActive
              )}
            >
              <Typography variant="body2">
                Embed a Content Viewer directly on your page.
              </Typography>
            </Paper>
          </ButtonBase>
        </Grid>

        <Grid className={classes.embedOptionWrapper} item>
          <ButtonBase
            className={classes.embedOptionButton}
            disableRipple
            onClick={() => setActiveOption(1)}
          >
            <Paper
              className={clsx(
                classes.embedOption,
                activeOption === 1 && classes.embedOptionActive
              )}
            >
              <Typography variant="body2">
                Embed a Content Thumbnail that will open a Pinterest Viewer when
                clicked.
              </Typography>
            </Paper>
          </ButtonBase>
        </Grid>
        <Grid className={classes.textareaWrapper} item>
          <TextField
            classes={{
              root: classes.textFieldRoot,
            }}
            InputProps={{
              readOnly: true,
            }}
            multiline
            placeholder="Embed Script"
            value={embeddedScript}
            variant="outlined"
          />
          <Button
            classes={{}}
            className={classes.linkButton}
            color="primary"
            disableElevation
            disableRipple
            onClick={() => handleCopyScript()}
          >
            Copy Embed Script
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EmbeddedContent;
