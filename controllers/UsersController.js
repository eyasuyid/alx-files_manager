import sha1 from 'sha1';
import db from '../utils/db';

const postNew = async (req, res) => {
  const { email, password } = req.body;
  let error = '';
  if (email == null) {
    error = 'Missing email';
    res.status(400).send({ error });
    return;
  }
  if (password == null) {
    error = 'Missing password';
    res.status(400).send({ error });
    return;
  }
  if (await db.users.findOne({ email }) != null) {
    error = 'Already exist';
    res.status(400).send({ error });
    return;
  }
  const { _id } = (await db.users.insertOne({ email, password: sha1(password) })).ops[0];
  res.status(201).send({ id: _id, email });
};

export default postNew;
