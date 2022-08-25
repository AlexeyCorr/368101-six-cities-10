import { NameSpace, AuthorizationStatus } from '../../utils/const';
import { State } from '../../types/state';
import { UserData } from '../../types/user-data';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserData = (state: State): UserData | null => state[NameSpace.User].userData;
export const getIsAuth = (state: State): boolean => state[NameSpace.User].isAuth;
