import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, AppState } from './store';

const usePinterestDispatch = () => useDispatch<AppDispatch>();
const usePinterestSelector: TypedUseSelectorHook<AppState> = useSelector;

export { usePinterestDispatch, usePinterestSelector };
