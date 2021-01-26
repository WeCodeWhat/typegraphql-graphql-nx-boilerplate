import React from 'react';
import {
  FlexBox,
  FlexDirection,
  FlexJustify,
  AlignItem,
} from '../FlexBox/FlexBox';
import { Grid, List } from '@material-ui/core';
import ChatBubble from '../ChatBubble/ChatBubble';
const moment = require('moment');

interface Props {}

export const ChatArea: React.FC<Props> = () => {
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
        <div>Python 😯 5 members</div>
      </FlexBox>
      <FlexBox style={{ padding: '20px 50px', height: '100%' }}>
        <Grid item xs={9}>
          <List
            style={{
              height: '70vh',
              overflowY: 'auto',
            }}
          >
            <ChatBubble
              key="1"
              message="Hello World"
              date={`${moment(new Date().toISOString()).format(
                'DD-MM-YYYY'
              )} at ${moment(new Date().toISOString()).format('hh:mm')}`}
            />
            <ChatBubble
              me={true}
              key="1"
              message={
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              }
              date={`${moment(new Date().toISOString()).format(
                'DD-MM-YYYY'
              )} at ${moment(new Date().toISOString()).format('hh:mm')}`}
            />
          </List>
        </Grid>
      </FlexBox>
      <FlexBox style={{ backgroundColor: 'white', height: '100px' }}>
        World
      </FlexBox>
    </FlexBox>
  );
};
