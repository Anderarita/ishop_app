import {create} from 'zustand';
import {User} from '../../../domein/entities/user';
import {AuthStatus} from '../../../infrastructure/types/AuthStatus';
import {authLogin, getRefreshToken} from '../../../actions/auth/auth';
import {StorageAdapter} from '../../../config/adapter/storage-adapter';

export interface AuthState {
  Token?: string | undefined;
  RefreshToken?: string | undefined;
  TokenExpiration: string | undefined;
  user: User | undefined;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<boolean>;
  renewSession: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  Token: undefined,
  RefreshToken: undefined,
  TokenExpiration: undefined,
  user: undefined,
  status: 'checking',
  login: async (email: string, password: string) => {
    const result = await authLogin(email, password);
    if (!result) {
      await StorageAdapter.clear();
      set({
        status: 'unauthenticated',
        Token: undefined,
        user: undefined,
        RefreshToken: undefined,
        TokenExpiration: undefined,
      });
      return false;
    }
    //TODO: Add to local storage
    await StorageAdapter.setItem('token', result.token);
    await StorageAdapter.setItem('refreshtoken', result.resfreshToken);
    await StorageAdapter.setItem('user', JSON.stringify(result.user));

    set({
      status: 'authenticated',
      Token: result.token,
      user: result.user,
      RefreshToken: result.resfreshToken,
      TokenExpiration: result.tokenExpiration.toString(),
    });
    return true;
  },
  renewSession: async () => {
    const result = await getRefreshToken();
    if (!result) {
      await StorageAdapter.clear();
      set({
        status: 'unauthenticated',
        Token: undefined,
        user: undefined,
        RefreshToken: undefined,
        TokenExpiration: undefined,
      });
      return;
    }
    await StorageAdapter.setItem('token',  result!.token);
    await StorageAdapter.setItem('refreshtoken', result!.resfreshToken);
    await StorageAdapter.setItem('user', JSON.stringify(result!.user));

    set({
      status: 'authenticated',
      Token: result!.token,
      user: result!.user,
      RefreshToken: result!.resfreshToken,
      TokenExpiration: result!.tokenExpiration.toString(),
    });
  },
  logout: async () => {
    await StorageAdapter.clear();
    set({
      status: 'unauthenticated',
      Token: undefined,
      user: undefined,
      RefreshToken: undefined,
      TokenExpiration: undefined,
    });
  },
}));
