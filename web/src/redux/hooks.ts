import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, PinterestRootAppState } from './store';

const usePinterestDispatch = () => useDispatch<AppDispatch>();
const usePinterestSelector: TypedUseSelectorHook<PinterestRootAppState> =
  useSelector;

const PinterestReduxHooks = {
  usePinterestDispatch,
  usePinterestSelector,
};

export default PinterestReduxHooks;
