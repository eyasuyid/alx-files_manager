import redisClient from '../utils/redis';
import dbClient from '../utils/db';

const getStatus = (req, res) => {
  const redis = redisClient.isAlive();
  const db = dbClient.isAlive();
  res.send({
    redis,
    db
  });
}

const getStats = (req, res) => {
  const users = dbClient.nbUsers();
  const files = dbClient.nbFiles();
  res.send({
    users,
    files
  })
}

export {
  getStatus,
  getStats
};