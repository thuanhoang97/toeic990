process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const request = require('supertest');
const Test = require('../models/test.model');
const app = require('../server');
const db = require('../db');

let agent = null;
let server = null

describe('Test API', () => {
  const baseAPI = '/api/tests';

  before((done) => {
    db.connect(process.env.TEST_DB_URI).then(() => {
      server = app.listen(process.env.TEST_PORT, done);
      agent = request.agent(server);
    });
  });

  after((done) => {
    server.close(done);
  });

  beforeEach(async () => {
    await Test.deleteMany({});
  });

  describe('/GET tests', () => {
    it('It should GET no tests', async () => {
      const res = await agent.get(baseAPI);
      res.status.should.be.eql(200);
      res.body.should.be.a('array');
      res.body.length.should.be.eql(0);
    });

    it('It should GET 5 tests', async () => {
      const rawTests = createRawTests(5);
      await Test.insertMany(rawTests);

      const res = await agent.get(baseAPI);
      res.status.should.be.eql(200);
      res.body.should.be.a('array');
      res.body.length.should.be.eql(5);
    });
  });

  describe('/POST tests', () => {
    it('Post not enough answers', async () => {
      const rawTest = createRawTest('Test 1', new Array(100).fill(0));

      const res = await agent.post(baseAPI).send(rawTest);
      res.status.should.be.eql(403);
    });

    it('POST create new test', async () => {
      const rawTest = createRawTest('Test 1');

      const res = await agent.post(baseAPI).send(rawTest);
      res.status.should.be.eql(201);
      res.body.answers.length.should.be.eql(200);
    });

    it('/POST duplicate test', async () => {
      const rawTest = createRawTest('Test 1');
      await Test.create(rawTest);

      const res = await agent.post(baseAPI).send(rawTest);
      res.status.should.be.eql(409);
    });
  });
});

const createRawTest = (name, answers) => {
  if (answers === undefined) {
    answers = new Array(200).fill(0);
  }
  return {
    name,
    answers,
  };
};

const createRawTests = (num) => {
  const tests = [];
  for (let i = 0; i < num; i++) {
    tests.push(createRawTest(`Test ${i}`));
  }
  return tests;
};
