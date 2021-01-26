import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Grid } from '@material-ui/core';
import './app.scss';
import { Rooms, FlexBox, FlexDirection, ChatArea, TextAlign } from '@app/ui';
// import { Picker } from 'emoji-mart';

export function App() {
  // const handleEmojiSelect = (e: Event) => {
  //   console.log(e);
  // };

  return (
    <Grid container spacing={0} style={{ minHeight: '100vh' }}>
      <Grid item={true} xs={12} lg={3}>
        <FlexBox direction={FlexDirection.column} style={{ padding: '20px' }}>
          <FlexBox>
            <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Rooms</div>
          </FlexBox>
          <div
            style={{
              height: '1px',
              backgroundColor: 'lightgray',
              margin: '15px 0px ',
            }}
          />
          <Rooms />
        </FlexBox>
      </Grid>
      <Grid
        item={true}
        xs={12}
        lg={9}
        style={{ backgroundColor: 'rgb(242, 242, 242)' }}
      >
        <ChatArea />
      </Grid>
    </Grid>
  );
}

export default App;
