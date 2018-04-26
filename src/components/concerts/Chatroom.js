import React, { Component } from "react";
import Cable from "actioncable";
import jwtDecoder from "jwt-decode";
import "./Chatroom.css";
import axios from 'axios';
import './Chatroom.css';

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

  // componentWillMount = async () => {

  // }

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
    const user = this.state.user;
    const concert = this.state.concert;

    let cable = Cable.createConsumer("wss://earbuddies1.herokuapp.com/cable");
    this.chats = cable.subscriptions.create(
      {
        channel: `MessagesChannel`,
        event_id: this.state.concert.id
      },
      {
        connected: () => {},
        received: data => {
          console.log(data);
          let chatLogs = this.state.chatLogs;
          chatLogs.push(data);
          this.setState({ chatLogs: chatLogs });
        },
        create: function(message) {
          this.perform("create", {
            content: message,
            user_id: user.sub,
            event_id: concert.id,
            user_name: user.email,
            event_name: concert.name
          });
        }
      }
    );
  };

  renderChatLog() {
    return this.state.chatLogs.map((el, i) => {
      console.log(el);
      return (
        <li key={`chat_${i}`}>
          <span className="chat-message">{el.user_name}</span>
          <span className="chat-message">{el.content}</span>
          <span className="chat-created-at">{el.created_at}</span>


        </li>
      );
    });
  }

  render() {
    if (this.state.loading) {
      return <h1>Initiating Chatroom...</h1>;
    }
    console.log(this.state)
    console.log(this.props)

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
