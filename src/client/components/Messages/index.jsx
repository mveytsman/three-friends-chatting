import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button, Input } from '../Form';
import axios from 'axios';
import styles from './styles.css';

class Messages extends React.Component {
  constructor({ username }) {
    super();
    this.state = {
      messages: [],
      currentMessage: '',
      username
    }
  }
  componentDidMount() {
    // const allMessages = new Promise(resolve)
    this.getMessages();
    setTimeout(this.updateMessages, 1000);
    // add error handler eventually
  }

  componentDidUpdate(prevProps, prevState){
    if (this.state.messages !== prevState.messages) {
      const messageDiv = document.getElementById("allMessages");
      messageDiv.scrollTop = messageDiv.scrollHeight - messageDiv.clientHeight;
    }
  }

  getMessages = () => {
    axios.get('/api/messages')
      .then(response => {
        this.setState({
          messages: response.data
        })
      }).catch(err => {
        console.log(err);
      });
  }

  updateMessages = () => {
    axios.get('/api/latestMessages', {
      params: {
        messageCount: this.state.messages.length
      }
    })
      .then(response => {
        const messages = this.state.messages;
        this.setState({
          messages: messages.concat(response.data)
        })
      })
      .catch(err => {
        console.log(err);
      });
    setTimeout(this.updateMessages, 500);
  }

  handleSubmit = e => {
    e.preventDefault();
    const message = this.state.currentMessage;
    if (message !== '') {
      axios.post('/api/messages', {
        username: this.state.username,
        message
      }).catch(err => {
        console.log(err);
      })
    }

    this.setState({
      currentMessage: '',
    })
  }

  handleInputChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  render() {
    return (
      <div className={styles.flexContainer}>
        <div className={styles.wrapper}>
          <h1>Chatroom</h1>
          <ul className={styles.allMessages} id="allMessages">
            {this.state.messages && this.state.messages.map((message, i) => {
              if (i > this.state.messages.length - 8) {
                return <li className={styles.messageItem}>
                  <div className={styles.messageContent}>
                    <span className={styles.username}>{message.username}</span>
                    <div>
                      <span className={styles.messageText}>{message.message}</span>
                    </div>
                  </div>
                  <span className={styles.timestamp}>{message.timestamp.substr(11, 5)}</span>
                </li>
              }
            })}
          </ul>
          <form action="#" onSubmit={this.handleSubmit} className={styles.form}>
            <input type="text" placeholder="Enter a new message" autoComplete="off" value={this.state.currentMessage} onChange={this.handleInputChange} id="currentMessage" className={styles.input} />
            <button className={styles.button}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Messages;
