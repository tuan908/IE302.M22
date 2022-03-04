import {
  Grid,
  Tooltip,
  IconButton,
  Typography,
  Dialog,
  Paper,
} from '@mui/material';
import clsx from 'clsx';
import { isEmpty } from 'lodash';
import { FC, useState, useEffect } from 'react';
import PinterestReduxHooks from 'src/redux/hooks';
import { hideViewer } from 'src/redux/action/viewer';
import PinterestVideoViewer from '../../VideoViewer';
import useStyles from './DialogMuiStyledComponent';
import { FileServices } from 'src/service/file.services';
import Loading from 'src/component/Loading';
import {
  ChevronLeft,
  Code,
  Delete,
  GetApp,
  InfoOutlined,
  Close,
} from '@mui/icons-material';
import EmbeddedDialog from '../EmbeddedDialog';
import PinterestDetail from 'src/pages/Detail';

interface Props {}

export interface PinterestFile {
  _id?: string;
  originalName?: string;
  createdAt?: string;
  photoOfUser?: string;
  status?: string;
  updatedAt?: string;
  size?: string;
}

const { usePinterestDispatch, usePinterestSelector } = PinterestReduxHooks;

const PinterestDialogContent: FC<Props> = ({}: Props) => {
  const dispatch = usePinterestDispatch();
  const viewerState = usePinterestSelector((state) => state.viewerReducer);
  const { classes } = useStyles();
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [deleteConfirmOpened, setDeleteConfirmOpened] = useState(false);
  const [embedDialogOpened, setEmbedDialogOpened] = useState(false);
  const [isLoading] = useState(false);
  const [file, setFile] = useState<PinterestFile>();
  const [_, setApiError] = useState();

  useEffect(() => {
    if (viewerState.fileId) {
      FileServices.getFileById(viewerState.fileId)
        .then((res) => {
          setFile(res[0]);
        })
        .catch((err) => setApiError(err.message));
    }
  }, []);

  const isContentPublic = true;

  const fileNotFound = false;
  const isFullScreenViewer = false;

  const downloadLink = () => {};

  const loadingComponent = isLoading ? (
    <div className={classes.loadingWrapper}>
      <Loading />
    </div>
  ) : null;

  return (
    <>
      <Grid
        className={clsx(
          classes.toolbar,
          detailsVisible && classes.toolbarWithDetails
        )}
        container
        wrap="nowrap"
      >
        {/* Xử lý nút đóng hình ảnh */}
        {!isFullScreenViewer && (
          <Grid item>
            <Tooltip title="Close">
              <IconButton
                className={classes.icon}
                onClick={() => dispatch(hideViewer())}
              >
                <ChevronLeft style={{ height: 30, width: 30 }} />
              </IconButton>
            </Tooltip>
          </Grid>
        )}

        {/* Tên của file (hình ảnh) */}
        <Grid alignItems="center" className={classes.nameItem} container item>
          <Typography className={classes.fileName} variant="h6">
            {file!?.originalName || ''}
          </Typography>
        </Grid>

        {/* Sao chép dưới dạng thẻ */}
        {isContentPublic && (
          <Grid item>
            <Tooltip title="Embedded">
              <IconButton
                className={classes.icon}
                onClick={() => setEmbedDialogOpened(true)}
              >
                <Code style={{ height: 30, width: 30 }} />
              </IconButton>
            </Tooltip>
          </Grid>
        )}

        {/* Copy-Link */}

        {!isFullScreenViewer && (
          <Grid item>
            <Tooltip title="Delete">
              <IconButton
                className={classes.icon}
                onClick={() => setDeleteConfirmOpened(true)}
              >
                <Delete style={{ height: 30, width: 30 }} />
              </IconButton>
            </Tooltip>
          </Grid>
        )}

        <Grid item>
          <Tooltip title="Download">
            <IconButton className={classes.icon} onClick={downloadLink}>
              <GetApp style={{ height: 30, width: 30 }} />
            </IconButton>
          </Tooltip>
        </Grid>
        {!fileNotFound && (
          <Grid item>
            <Tooltip title="Details">
              <IconButton
                className={classes.icon}
                onClick={() => setDetailsVisible(!detailsVisible)}
              >
                <InfoOutlined style={{ height: 30, width: 30 }} />
              </IconButton>
            </Tooltip>
          </Grid>
        )}
        {!isFullScreenViewer && (
          <Grid item>
            <Tooltip title="Close">
              <IconButton
                className={classes.icon}
                onClick={() => dispatch(hideViewer())}
              >
                <Close style={{ height: 30, width: 30 }} />
              </IconButton>
            </Tooltip>
          </Grid>
        )}

        <EmbeddedDialog
          item={!isEmpty(file) ? file : ''}
          onClose={() => setEmbedDialogOpened(false)}
          open={embedDialogOpened}
        />

        <Dialog
          onClose={() => setDeleteConfirmOpened(false)}
          open={deleteConfirmOpened}
          title="Are you sure?"
        >
          <p>
            {
              "After deleting a file, you won't be able to preview or access it."
            }
          </p>
        </Dialog>
        {loadingComponent}
      </Grid>
      <PinterestDetail file={file} visible={detailsVisible} />
      <Paper
        className={clsx(
          classes.paper,
          isFullScreenViewer && classes.fullScreenViewerContainer
        )}
        elevation={24}
      >
        <PinterestVideoViewer
          file={file}
          //    detailsVisible = {detailsVisible}
          //    onLoad = {onLoad}
        />
      </Paper>
    </>
  );
};

export default PinterestDialogContent;
