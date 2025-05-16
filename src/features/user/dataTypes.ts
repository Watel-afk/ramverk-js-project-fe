export type RegisterUserRequest = {
  username: string;
  password: string;
  confirmNewPassword: string;
};

export type AddBalanceRequest = {
  balanceToAdd: number;
};

export type UserResponse = {
  user: User;
};

export type User = {
  _id: string;
  username: string;
  balance: number;
};
