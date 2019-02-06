import cors from 'cors';
import { Router } from 'express';
import { catchErrors, handleNotFound } from './utils/errors';
import usersHandler from './controllers/users';

const router = Router();

// Example path for `/api/users`
router.get('/users', cors(), catchErrors(usersHandler));

router.get('/messages', cors(), catchErrors(messagesHandler));

router.get('/latestMessages', cors(), catchErrors(latestMessagesHandler));

router.post('/messages', cors(), catchErrors(postMessageHandler));

// Handle calls to non-existent API paths
router.use('*', handleNotFound);

// TODO: maybe move this to its own file?

const messages = [
  { message: 'Hey everyone!', username: 'Max', timestamp: new Date() },
  { message: 'Hi friends! 👋', username: 'Emma', timestamp: new Date() },
  { message: 'Hello! 🤗', username: 'Ana', timestamp: new Date() },
];

function messagesHandler(req, res) {
  res.json(messages);
}

function postMessageHandler(req, res) {
  const username = req.body.username || 'Anonymous';
  messages.push({
    message: req.body.message,
    username,
    timestamp: new Date(),
  });
  res.json({ success: true });
}

function latestMessagesHandler(req, res) {
  const clientMessageCount = req.query.messageCount;
  let newMessages;

  if (clientMessageCount < messages.length) {
    newMessages = messages.slice(clientMessageCount);
  } else {
    newMessages = [];
  }
  // console.log(newMessages, clientMessageCount);
  res.json(newMessages);
}

export default router;
