import { useQuery } from '@apollo/client';
import 'react-chat-elements/dist/main.css';
import React from 'react';
import { GET_ROOMS } from '../../core/room/schema';
import { MeetingList } from 'react-chat-elements';
import { Room } from '../../common/type';
const moment = require('moment');

export const Rooms: React.FC<{}> = () => {
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
          <MeetingList
            className="meeting-list"
            dataSource={[
              {
                id: d.id,
                subject: d.name,
                date: Date.parse(d.createdAt),
                avatars: [
                  {
                    src:
                      'https://miro.medium.com/max/500/1*jABZh1fqdQOC9KIRMx-K4A.png',
                  },
                ],
              },
            ]}
          />
        ))
      )}
    </div>
  );
};
