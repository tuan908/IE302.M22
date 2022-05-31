import { Create } from '@mui/icons-material';
import clsx from 'clsx';
import moment from 'moment';
import { FC } from 'react';
import { usePinterestDispatch, usePinterestSelector } from 'src/redux/hooks';
import fileService from 'src/service/file.service';
import { getMess } from 'src/util/message';
import useStyles from './Components';

interface Props {
  visible?: boolean;
  file?: {
    createdAt?: string;
    photoOfUser?: string;
    status?: string;
    updatedAt?: string;
    size?: string;
    _id?: string;
  };
}

const PinterestDetailPanel: FC<Props> = ({ visible, file }: Props) => {
  const dispatch = usePinterestDispatch();
  const user = usePinterestSelector((state) => state.userReducer.user);
  const { classes } = useStyles();
  const { root, title, userName, row, icon, textBox, rowMdf, button, rowDate } =
    classes;

  const handleClick = () => {
    document.getElementById('statusB')!.removeAttribute('disabled');
    document
      .getElementById('statusB')!
      .setAttribute('style', 'background-color: #f54c4c;');
    document
      .getElementById('btnSave')!
      .setAttribute('style', 'background-color: red;');
  };

  const handleButton = () => {
    var newStatus = document.getElementById('statusB')!.textContent;
    document
      .getElementById('statusB')!
      .setAttribute('style', 'background-color: #e03434;');
    document
      .getElementById('btnSave')!
      .setAttribute('style', 'background-color: #a80a0a;');
    document.getElementById('statusB')!.setAttribute('disabled', 'true');

    document.getElementById('statusB')!.textContent = newStatus;

    const payLoad = {
      status: newStatus,
      postID: file!._id,
    };

    fileService
      .updateFileById(payLoad)
      .then(() => dispatch(getMess('Uploaded', 'success')))
      .catch((err: any) => {
        console.log('Err: ', err);
      });
  };

  return (
    <div className={clsx(root, visible && user?._id && visible)}>
      <h1 className={title}>Status:</h1>
      {file?.photoOfUser === '' ? (
        <div className={userName}> {` ${user.firstName} ${user.lastName}`}</div>
      ) : (
        <div className={row}> {` ${file!?.photoOfUser}`}</div>
      )}
      <div className={rowDate}>{` ${moment(file!?.createdAt).format(
        'DD.MM.YYYY'
      )}`}</div>

      {file!?.status !== undefined && (
        <div className={icon}>
          <Create
            style={{ height: 20, width: 30, cursor: 'pointer' }}
            onClick={handleClick}
          />
        </div>
      )}

      {file!?.status !== undefined && (
        <>
          <textarea
            className={textBox}
            id="statusB"
            name="status"
            disabled
            defaultValue={file!?.status}
          />
        </>
      )}

      {file!?.updatedAt !== undefined && (
        <div className={rowMdf}>
          Last modified: {` ${moment(file!?.updatedAt).format('DD.MM.YYYY')}`}
        </div>
      )}

      {file!?.size !== undefined && (
        <div className={row}>Size: {file!?.size || 0}</div>
      )}

      <button className={button} id="btnSave" onClick={handleButton}>
        Save
      </button>
    </div>
  );
};

export default PinterestDetailPanel;
