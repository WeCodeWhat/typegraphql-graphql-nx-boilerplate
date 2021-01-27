export type Room = {
  id: string;
  name: string;
  createdAt: string;
  ownerId: string;
  messages: [Message];
  members: [User];
};

export type Message = {
  id: string;
  message: string;
  createdAt: string;
  sender: User;
};

export type User = {
  id: string;
  email: string;
  room: Room[];
  name: string;
};
