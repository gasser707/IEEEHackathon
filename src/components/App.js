import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import "./App.css";
import { connect } from "react-redux";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import CreateQuestions from './Questions/CreateQuestions';
import DisplayQuestions from "./Questions/DisplayQuestions";

const App = ({ currentUser, currentChannel, isPrivateChannel }) => (
  <Grid columns="equal" className="app" style={{ background: '#eee' }}>
    <Grid.Column>
      <SidePanel
        key={currentUser && currentUser.uid}
        currentUser={currentUser}
      />
    </Grid.Column>
    <Grid.Column width="6">
      <Segment>
        {currentUser.displayName==='Teacher'?<CreateQuestions/>: <DisplayQuestions/>}
      </Segment>
    </Grid.Column>

    <Grid.Column style={{ marginLeft: 115 }}>
      <Messages
        key={currentChannel && currentChannel.id}
        currentChannel={currentChannel}
        currentUser={currentUser}
        isPrivateChannel={isPrivateChannel}
      />
    </Grid.Column>
  </Grid>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  userPosts: state.channel.userPosts,
});

export default connect(mapStateToProps)(App);
