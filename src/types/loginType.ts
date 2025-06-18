export type LoginType = {
  email: string;
  password: string;
};

export type UserProfile = {
  id: number;
  user_id: string;
  username: string;
  email: string;
  avatar_url: string;
  bio: string;
  createdAt: string;
};

export type SessionType = {
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  user: {};
};
