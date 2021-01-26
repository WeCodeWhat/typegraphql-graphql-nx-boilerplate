import {
  Avatar,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import {
  AlignItem,
  FlexBox,
  FlexDirection,
  FlexJustify,
} from '../FlexBox/FlexBox';

interface Props {
  key: string;
  message: string;
  date: string;
  align: string;
  style: CSSProperties;
  senderName: string;
  me: boolean;
}

const ChatBubble: React.FC<Partial<Props>> = (args) => {
  return (
    <ListItem key={args.key} alignItems="flex-start">
      {args.me ? (
        <React.Fragment>
          <Grid
            container
            style={{
              marginLeft: '380px',
              borderRadius: '8px',
              color: 'black',
            }}
          >
            <Grid item xs={12}>
              <FlexBox
                style={{
                  padding: '0px 5px',
                }}
                direction={FlexDirection.row}
                justify={FlexJustify.spaceBetween}
                align={AlignItem.center}
              >
                <div style={{ fontSize: '11px' }}>Chung Quan Tin</div>
                <div style={{ fontSize: '11px' }}>{args.date}</div>
              </FlexBox>
            </Grid>
            <Grid item xs={12}>
              <ListItemText
                primary={args.message}
                style={{
                  backgroundColor: 'white',
                  padding: '10px 15px',
                  borderRadius: '8px',
                }}
              ></ListItemText>
            </Grid>
          </Grid>
          <ListItemAvatar>
            <FlexBox direction={FlexDirection.column} align={AlignItem.center}>
              <Avatar
                alt="Remy Sharp"
                src="https://miro.medium.com/max/500/1*jABZh1fqdQOC9KIRMx-K4A.png"
              />
            </FlexBox>
          </ListItemAvatar>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ListItemAvatar>
            <FlexBox direction={FlexDirection.column} align={AlignItem.center}>
              <Avatar
                alt="Remy Sharp"
                src="https://miro.medium.com/max/500/1*jABZh1fqdQOC9KIRMx-K4A.png"
              />
            </FlexBox>
          </ListItemAvatar>
          <Grid
            container
            style={{
              maxWidth: '300px',
              borderRadius: '8px',
              color: 'black',
            }}
          >
            <Grid item xs={12}>
              <FlexBox
                style={{
                  padding: '0px 5px',
                }}
                direction={FlexDirection.row}
                justify={FlexJustify.spaceBetween}
                align={AlignItem.center}
              >
                <div style={{ fontSize: '11px' }}>{args.date}</div>
                <div style={{ fontSize: '11px' }}>Chung Quan Tin</div>
              </FlexBox>
            </Grid>
            <Grid item xs={12}>
              <ListItemText
                primary={args.message}
                style={{
                  backgroundColor: 'white',
                  padding: '10px 15px',
                  borderRadius: '8px',
                }}
              ></ListItemText>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </ListItem>
  );
};

export default ChatBubble;
