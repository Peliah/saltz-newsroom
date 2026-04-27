type Session = {
  isAuthenticated: boolean;
};

const sessionState: Session = {
  isAuthenticated: false,
};

export const appStore = {
  getSession: (): Session => sessionState,
  setAuthenticated: (value: boolean) => {
    sessionState.isAuthenticated = value;
  },
};
