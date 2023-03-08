import sha1 from 'sha1';
import { ObjectId } from 'mongodb';
import redisClient from '../utils/redis';
import db from '../utils/db';

const postNew = async (req, res) => {
  const { email, password } = req.body;
  let error = '';
  if (email == null) {
    error = 'Missing email';
    return res.status(400).send({ error });
  }
  if (password == null) {
    error = 'Missing password';
    return res.status(400).send({ error });
  }
  if (await db.users.findOne({ email }) != null) {
    error = 'Already exist';
    return res.status(400).send({ error });
  }
  const { _id } = (await db.users.insertOne({ email, password: sha1(password) })).ops[0];
  return res.status(201).send({ id: _id, email });
};

const getMe = async (req, res) => {
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

  const _id = new ObjectId(id);
  const { email } = (await db.users.findOne({ _id }));
  return res.status(200).send({ id, email });
};

export { postNew, getMe };
