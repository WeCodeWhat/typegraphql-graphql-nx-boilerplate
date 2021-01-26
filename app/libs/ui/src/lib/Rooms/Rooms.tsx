import { useQuery } from '@apollo/client';
import { Typography, Divider } from '@material-ui/core';
import React from 'react';
import { GET_ROOMS } from '../../core/room/getRooms';
import { FlexBox, FlexDirection } from '../FlexBox/FlexBox';
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
          <FlexBox
            direction={FlexDirection.column}
            style={{
              marginBottom: '10px',
              border: '1px solid lightgray',
              padding: '5px 10px',
              borderRadius: '7px',
            }}
          >
            <Typography variant="subtitle1" color="initial">
              {d.name}
            </Typography>
            <Typography variant="caption" color="initial">
              {moment(d.createdAt).format('DD-MM-YYYY')}
            </Typography>
          </FlexBox>
        ))
      )}
    </div>
  );
};
