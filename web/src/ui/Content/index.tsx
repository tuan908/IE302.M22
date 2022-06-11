import { PixabayPhoto } from 'src/api';
import Pin from '../Pin';

interface Props {
  items: PixabayPhoto[];
}

const PinterestContent = ({ items }: Props) => {
  return (
    <>
      {items!?.map(({ ...rest }, index) => (
        <Pin {...rest} key={index} />
      ))}
    </>
  );
};

export default PinterestContent;
