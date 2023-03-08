import redisClient from '../utils/redis';
import DBClient from '../utils/db';

const getStatus = (req, res) => {
  const redis = redisClient.isAlive();
  const db = DBClient.isAlive();
  return res.send({
    redis,
    db,
  });
};

const getStats = async (req, res) => {
  const users = await DBClient.nbUsers();
  const files = await DBClient.nbFiles();
  return res.send({
    users,
    files,
  });
};

export {
  getStatus,
  getStats,
};
