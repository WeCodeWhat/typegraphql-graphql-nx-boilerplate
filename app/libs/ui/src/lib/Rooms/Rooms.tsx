import { useQuery } from '@apollo/client';
import 'react-chat-elements/dist/main.css';
import React from 'react';
import { GET_ROOMS } from '../../core/room/getRooms';
import { ChatItem } from 'react-chat-elements';
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
        (data as any).getRooms.map((d: Room) => (
          <ChatItem
            avatar={
              'https://miro.medium.com/max/500/1*jABZh1fqdQOC9KIRMx-K4A.png'
            }
            alt={'GraphQL'}
            title={d.name}
            subtitle={'What are you doing?'}
            date={moment(d.createdAt).format('DD-MM-YYYY')}
            unread={0}
          />
        ))
      )}
    </div>
  );
};
