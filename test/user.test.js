const request = require('supertest');
const app = require('../index');
const { sequelize } = require('../models/index');
const { queryInterface } = sequelize;
const { GenerateToken } = require('../helpers/GenerateToken');
const { User } = require('../models/index');
const { getUsers, createUser } = require('../controllers/userControllers');
const userController = require('../controllers/userControllers');
// const jest = require('jest');

afterAll((done) => {
  queryInterface
  .bulkDelete('Users', null, {})
  .then(() => {
    done()
  })
  .catch((err) => {
    done(err)
  })
})


const userMockData = [
  {
    fullName: 'rino',
    email: 'rinotoharto@gmail.com'
  },
  {
    fullName: 'admin',
    email: 'admin@gmail.com'
  },
]

describe('user controller', () => {
  let mRes;
  let mNext;
  beforeEach(() => {
    mRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }
    mNext = jest.fn();
    jest.spyOn(User, 'findAll').mockResolvedValue(userMockData)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('get all user', async (done) => {
    await getUsers({}, mRes, mNext)
    expect(mRes.status).toBeCalledWith(200);
    done()
  });

  test.only('success create user', (done) => {
    const body = {
      fullName: 'dummy',
      email: 'dummy@gmail.com',
      password: 'password123',
      confirmParssword: 'password123'
    }
    jest.spyOn(User, 'findAll').mockResolvedValue(null)

    request(app)
    .post('/api/user/register')
    .send(body)
    .then((res) => {
      console.log(res, '<<< RESPONSE');
      expect(res.body.status).toEqual(201);
      expect(res.body).toHaveProperty('data');
      done();
    })
    .catch((err) => {
      done(err)
    })
  })
})