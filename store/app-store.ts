import type { Session } from '@/types/session';

const sessionState: Session = {
  isAuthenticated: false,
};

export const appStore = {
  getSession: (): Session => sessionState,
  setAuthenticated: (value: boolean) => {
    sessionState.isAuthenticated = value;
  },
};
