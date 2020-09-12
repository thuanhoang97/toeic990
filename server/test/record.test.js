process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const request = require('supertest');
const Test = require('../models/test.model');
const Record = require('../models/record.model');
const User = require('../models/user.model');
const app = require('../server');
const db = require('../db');

let agent = null;
let server = null

describe('Record API', () => {
  let token = '';
  let testId = null;
  let userId = null;
  const baseAPI = '/api/records';

  before((done) => {
    db.connect(process.env.TEST_DB_URI).then(() => {
      server = app.listen(process.env.TEST_PORT, done);
      agent = request.agent(server);
    });
  });

  after((done) => {
    server.close(done);
  });

  before(async () => {
    await User.deleteMany({});
    await Test.deleteMany({});

    const { token: accountToken, account } = await createAccount('tester');
    token = accountToken;
    userId = account._id;
    testId = (await Test.create(rawTest))._id;
  });

  beforeEach(async () => {
    await Record.deleteMany({});
    await Test.deleteMany({});
  });

  describe('/GET records', () => {
    it('It should get authentication error', async () => {
      let res = await agent.get(baseAPI);
      res.status.should.be.eql(401);

      res = await agent.get(`${baseAPI}/5f50fb5485ae3f06903b8ce7`);
      res.status.should.be.eql(401);

      const { _id } = await Test.create(rawTest);
      res = await agent.post(baseAPI).send(createRawRecord(_id));
      res.status.should.be.eql(401);

      res = await agent.delete(`${baseAPI}/5f50fb5485ae3f06903b8ce7`);
      res.status.should.be.eql(401);
    });

    it('It should GET no records', async () => {
      const res = await agent.get(baseAPI).set({ Authorization: token });
      res.status.should.be.eql(200);
      res.body.should.be.a('array');
      res.body.length.should.be.eql(0);
    });

    it('It should GET 5 records', async () => {
      const rawRecords = createRawRecords(testId, userId, 5);
      await Record.insertMany(rawRecords);

      const res = await agent.get(baseAPI).set({ Authorization: token });
      res.status.should.be.eql(200);
      res.body.should.be.a('array');
      res.body.length.should.be.eql(5);
    });

    it('It shoud GET your records', async () => {
      const myRawRecords = createRawRecords(testId, userId, 2);
      await Record.insertMany(myRawRecords);

      const { account } = await createAccount('tester2');
      const otherRawRecords = createRawRecords(testId, account._id, 2);
      await Record.insertMany(otherRawRecords);

      const res = await agent
        .get(`${baseAPI}/?mine=true`)
        .set({ Authorization: token });
      res.status.should.be.eql(200);
      res.body.should.be.a('array');
      res.body.length.should.be.eql(2);
    });

    it('It shoud GET error not found', async () => {
      const recordId = '5f50fa3885ae3f06903b8ce3';
      const res = await agent
        .get(`${baseAPI}/${recordId}`)
        .set({ Authorization: token });
      res.status.should.be.eql(404);
    });

    it('It should GET specific record', async () => {
      const rawRecord = createRawRecord(testId, userId);
      const newRecord = await Record.create(rawRecord);

      const res = await agent
        .get(`${baseAPI}/${newRecord._id}`)
        .set({ Authorization: token });
      res.status.should.be.eql(200);
      res.body.should.be.a('object');
    });
  });

  describe('/POST records', () => {
    it('Create new record', async () => {
      const rawRecord = createRawRecord(testId, userId);

      const res = await agent
        .post(baseAPI)
        .set({ Authorization: token })
        .send(rawRecord);
      res.status.should.be.eql(201);

      const newRecord = res.body;
      const targetRecord = await Record.findById(newRecord._id);
      should.exist(targetRecord);
    });

    it('Create new record with not enough answers', async () => {
      const rawRecord = createRawRecord(testId, userId, {
        range: [0, 10],
        answers: new Array(9).fill(0),
      });

      const res = await agent
        .post(baseAPI)
        .set({ Authorization: token })
        .send(rawRecord);
      res.status.should.be.eql(400);
    });
  });

  describe('/DELETE records', () => {
    it('Delete record', async () => {
      const rawRecord = createRawRecord(testId, userId);
      const newRecord = await Record.create(rawRecord);

      const res = await agent
        .delete(`${baseAPI}/${newRecord._id}`)
        .set({ Authorization: token });
      res.status.should.be.eql(200);

      const record = await Record.findById(newRecord._id);
      should.not.exist(record);
    });

    it('Delete not exist record', async () => {
      const recordId = '5f50fa3885ae3f06903b8ce3';

      const res = await agent
        .delete(`${baseAPI}/${recordId}`)
        .set({ Authorization: token });
      res.status.should.be.eql(404);
      res.body.should.have.property('record');
    });

    it('Delete other reports', async () => {
      const { account } = await createAccount('tester3');
      const otherRawRecord = createRawRecord(testId, account._id);
      const otherRecord = await Record.create(otherRawRecord);

      const res = await agent
        .delete(`${baseAPI}/${otherRecord._id}`)
        .set({ Authorization: token });
      res.status.should.be.eql(404);

      const record = await Record.findById(otherRecord._id);
      should.exist(record);
    });
  });
});

const rawTest = {
  name: 'Test 1',
  answers: new Array(200).fill(0),
};

const createRawRecord = (test, submitBy, data) => {
  let { range, answers, timeUse } = data || {};
  if (timeUse === undefined) {
    timeUse = 120;
  }
  if (range === undefined) {
    range = [0, 10];
  }
  if (answers === undefined) {
    answers = new Array(range[1] - range[0]).fill(0);
  }

  return {
    test,
    submitBy,
    range,
    answers,
    timeUse,
  };
};

const createRawRecords = (test, submitBy, num, data) => {
  const records = [];
  for (let i = 0; i < num; i++) {
    records.push(createRawRecord(test, submitBy, data));
  }
  return records;
};

const createAccount = async (username) => {
  const rawAccount = {
    username,
    firstName: 'test',
    lastName: 'test',
    password: 'test123321',
    password2: 'test123321',
  };

  let res = await agent.post('/api/auth/register').send(rawAccount);
  const account = res.body;

  res = await agent.post('/api/auth/login').send({
    username: rawAccount.username,
    password: rawAccount.password,
  });
  const token = res.body.token;

  return {
    token,
    account,
  };
};
