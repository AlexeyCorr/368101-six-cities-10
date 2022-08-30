import { userProcess } from './user-process';
import { UserProcess } from '../../types/state';
import { AuthorizationStatus } from '../../utils/const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

describe('Reducer: user', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      isAuth: false,
      userData: null
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        isAuth: false,
        userData: null
      });
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" if checkAuthAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.fulfilled.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.Auth,
          isAuth: true
        });
    });
    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.rejected.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          isAuth: false,
          userData: null
        });
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" if loginAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: loginAction.fulfilled.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.Auth,
          isAuth: true,
        });
    });
    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess.reducer(state, { type: loginAction.rejected.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          isAuth: false,
          userData: null
        });
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: logoutAction.fulfilled.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          isAuth: false,
          userData: null
        });
    });
  });
});
