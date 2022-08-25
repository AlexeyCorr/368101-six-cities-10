import { combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../utils/const';
import { offerData } from './offer-data/offer-data';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: offerData.reducer,
  [NameSpace.User]: userProcess.reducer,
});
