import React from 'react';
import {
  FlexBox,
  FlexDirection,
  FlexJustify,
  AlignItem,
} from '../FlexBox/FlexBox';
import { Grid, List } from '@material-ui/core';
import { GET_ROOM } from '../../core/room/schema';
import ChatBubble from '../ChatBubble/ChatBubble';
import { Room } from '../../common/type';
import { useQuery } from '@apollo/client';
const moment = require('moment');

interface Props {}

export const ChatArea: React.FC<Props> = () => {
  const { loading, error, data } = useQuery<{ getRoom: Room }>(GET_ROOM, {
    variables: {
      id: 'cee6b3b3-7ca3-4b35-a068-c4c5644129f4',
    },
  });
  console.log(data);
  return (
    <FlexBox
      style={{ height: '100%' }}
      justify={FlexJustify.spaceBetween}
      direction={FlexDirection.column}
    >
      <FlexBox
        direction={FlexDirection.row}
        align={AlignItem.center}
        style={{ backgroundColor: 'white', height: '70px', width: '100%' }}
      >
        <div>
          {data?.getRoom?.name} 😯 {data?.getRoom?.members.length} members
        </div>
      </FlexBox>
      <FlexBox style={{ padding: '20px 0px', height: '100%' }}>
        <Grid item xs={12}>
          <List
            style={{
              height: '70vh',
              overflowY: 'auto',
            }}
          >
            {loading ? (
              <div>Loading...</div>
            ) : (
              data?.getRoom?.messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  message={message.message}
                  date={`${moment(message.createdAt).format(
                    'DD-MM-YYYY hh:mm'
                  )}`}
                  senderName={message.sender.name}
                  me={message.id === message.sender.id}
                />
              ))
            )}
          </List>
        </Grid>
      </FlexBox>
      <FlexBox style={{ backgroundColor: 'white', height: '100px' }}>
        World
      </FlexBox>
    </FlexBox>
  );
};
