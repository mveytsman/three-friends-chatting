import { Router } from 'express';
import { catchErrors, handleNotFound } from './utils/errors';
import usersHandler from './controllers/users';

const router = Router();

// Example path for `/api/users`
router.get('/users', catchErrors(usersHandler));

router.get('/messages', catchErrors(messagesHandler));

router.get('/latestMessages', catchErrors(latestMessagesHandler));

router.post('/messages', catchErrors(postMessageHandler));

// Handle calls to non-existent API paths
router.use('*', handleNotFound);

// TODO: maybe move this to its own file?

const messages = [
  { message: 'hi friends!', username: 'Max', timestamp: new Date() },
];

function messagesHandler(req, res) {
  res.json(messages);
}

function postMessageHandler(req, res) {
  const username = req.body.username || 'anonymous';
  messages.push({
    message: req.body.message,
    username,
    timestamp: new Date(),
  });
  res.json({ success: true });
}

function latestMessagesHandler(req, res) {
  const clientMessageCount = req.body.messageCount;
  let newMessages;

  if (clientMessageCount < messages.length) {
    newMessages = messages.slice(clientMessageCount);
  } else {
    newMessages = [];
  }
  res.json(newMessages);
}

export default router;
