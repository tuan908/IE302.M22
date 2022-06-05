import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { PixabayPhoto } from 'src/api';
import ScrollToTop, { scrollToTop } from 'src/component/Button/ScrollTop';
import Pin from 'src/component/Pin';
import { ScrollTopWrapper } from '../Home/Component';
import { SearchWrapper } from './Component';

export default function Search() {
  const { state } = useLocation();
  const data = state as PixabayPhoto[];
  scrollToTop();
  return (
    <React.Fragment>
      <SearchWrapper>
        {data!?.map(({ ...rest }, index) => (
          <Pin {...rest} key={index} />
        ))}
      </SearchWrapper>
      <ScrollTopWrapper>
        <ScrollToTop />
      </ScrollTopWrapper>
    </React.Fragment>
  );
}
