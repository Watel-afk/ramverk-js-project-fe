export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  username: string;
  sessionId: string;
};
