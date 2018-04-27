import React, { Component } from "react";
import Cable from "actioncable";
import jwtDecoder from "jwt-decode";
import "./Chatroom.css";
import axios from 'axios';
import './Chatroom.css';
import moment from "moment";

class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChatMessage: "",
      chatLogs: [],
      concert: null,
      user: null,
      loading: false
    };
  }

  componentDidMount = async () => {
    const user = await jwtDecoder(this.props.token);

    await this.setState({
      concert: this.props.history.location.state,
      user,
      loading: true
    });

    await this.fetchHistoryMessages();

    await this.createSocket();

    this.setState({
      loading: false
    });
  };

  fetchHistoryMessages = () => {
    axios(
      {
        url: 'https://earbuddies1.herokuapp.com/messages.json',
        params: {
          event_id: this.state.concert.id
        }
      }
    )
      .then(res => {
        this.setState({
          chatLogs: res.data
        })
      })
  }

  createSocket = () => {
    const user_name = this.state.user.name;
    const concert = this.state.concert;
    const user_id = this.state.user.sub;

    let cable = Cable.createConsumer("wss://earbuddies1.herokuapp.com/cable");
    this.chats = cable.subscriptions.create(
      {
        channel: `MessagesChannel`,
        event_id: this.state.concert.id
      },
      {
        connected: () => {},
        received: data => {
          let chatLogs = this.state.chatLogs;
          chatLogs.push(data);
          this.setState({ chatLogs: chatLogs });
        },
        create: function(message) {
          this.perform("create", {
            content: message,
            user_id: user_id,
            event_id: concert.id,
            user_name: user_name,
            event_name: concert.name
          });
        }
      }
    );
  };

  renderChatLog() {
    console.log(this.state)
    return this.state.chatLogs.map((el, i) => {
      if(el.user_name === null){
        return(
          <li key={`chat_${i}`}>
            <span className="chat-message">{"Anonymous"}</span>
            <span className="chat-message">{el.content}</span>
            <span className="chat-created_at">{moment(el.created_at).format(
              "h:mm:ss a"
            )}</span>
          </li>
        );
      }
      else{
        return (
          <li key={`chat_${i}`}>
            <span className="chat-message">{el.user_name}</span>
            <span className="chat-message">{el.content}</span>
            <span className="chat-created_at">{moment(el.created_at).format(
              "h:mm:ss a"
            )}</span>
          </li>
        );
      }
    });
  }

  render() {
    if (this.state.loading) {
      return <h1>Initiating Chatroom...</h1>;
    }

    return (
      <div className="App">
        <div className="stage">
          <h1>Chat</h1>
          <div className="chatBox">
            <ul className="chat-logs">{this.renderChatLog()}</ul>
          </div>
          <input
            onKeyPress={e => this.handleChatInputKeyPress(e)}
            value={this.state.currentChatMessage}
            onChange={e => this.updateCurrentChatMessage(e)}
            type="text"
            placeholder="Enter your message..."
            className="chat-input"
            autoFocus
          />
          <button onClick={e => this.handleSendEvent(e)} className="send">
            Send
          </button>
        </div>
      </div>
    );
  }

  updateCurrentChatMessage(event) {
    this.setState({
      currentChatMessage: event.target.value
    });
  }

  handleChatInputKeyPress(event) {
    if (event.key === "Enter") {
      this.handleSendEvent(event);
    } //end if
  }

  handleSendEvent(event) {
    event.preventDefault();
    this.chats.create(this.state.currentChatMessage);
    this.setState({
      currentChatMessage: ""
    });
  }
}

export default Chatroom;
