import { useQuery } from '@apollo/client';
import 'react-chat-elements/dist/main.css';
import React from 'react';
import { GET_ROOMS } from '../../core/room/getRooms';
import { ChatList } from 'react-chat-elements';
const moment = require('moment');

export const Rooms: React.FC<{}> = () => {
  type Room = {
    id: string;
    name: string;
    createdAt: string;
  };
  const { loading, error, data } = useQuery<Room[]>(GET_ROOMS);

  if (error) {
    console.log(error);
  }
  console.log(data);
  return (
    <div>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <ChatList
          className="chat-list"
          dataSource={(data as any).getRooms.map((d: Room) => ({
            avatar:
              'https://miro.medium.com/max/500/1*jABZh1fqdQOC9KIRMx-K4A.png',
            alt: 'GraphQL',
            title: d.name,
            subtitle: 'What are you doing?',
            date: Date.parse(d.createdAt),
            unread: 0,
          }))}
        />
      )}
    </div>
  );
};
