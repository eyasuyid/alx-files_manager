import sha1 from 'sha1';
import { v4 } from 'uuid';
import redisClient from '../utils/redis';
import db from '../utils/db';

const getConnect = async (req, res) => {
  const authHeader = req.headers.authorization.split(' ')[1];
  const auth = Buffer.from(authHeader, 'base64').toString('ascii');
  const [email, password] = auth.split(':');
  const error = 'Unauthorized';

  const user = await db.users.findOne({ email });
  const hashPassword = sha1(password);

  if (user == null || hashPassword !== user.password) {
    return res.status(401).send({ error });
  }

  const token = v4();
  const key = `auth_${token}`;
  const id = user._id.toString();
  redisClient.set(key, id, 86400);
  return res.status(200).send({ token });
};

const getDisconnect = async (req, res) => {
  const error = 'Unauthorized';
  const token = req.headers['x-token'];
  if (token == null) {
    return res.status(401).send({ error });
  }
  const key = `auth_${token}`;
  const id = await redisClient.get(key);
  if (id == null) {
    return res.status(401).send({ error });
  }
  redisClient.del(key);
  return res.status(204).send();
};

export { getConnect, getDisconnect };
