const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {HHResumesViewLimitExceededError} = require('@ecosystem/errors');
const {assert} = chai;
const {createApiClient} = require('../helpers');

chai.use(chaiAsPromised);

describe('HH ApiClient', () => {

  describe('Работа с резюме', () => {

    it('Должна возвращаться ошибка, если превышен лимит просмотров резюме в сутки (10000 просмотров резюме в день) ', () => {
      const apiClient = createApiClient({
        'x-mock-response-id': '2133179-4dd7c198-96e0-4f1e-94df-20abc65413b1'
      });

      const response = apiClient.getResume('123', false);

      return assert.isRejected(response, {HHResumesViewLimitExceededError}, 'Превышен лимит просмотров резюме в сутки');
    }).timeout(30000);

    it('Должна возвращаться ошибка, если превышена квота просмотров резюме установленная менеджеру', () => {
      const apiClient = createApiClient({
        'x-mock-response-id': '2133179-d8f66550-0406-4983-9517-8b045193a451'
      });

      const response = apiClient.getResume('123', false);

      return assert.isRejected(response, {HHResumesViewLimitExceededError}, 'Превышена квота просмотров резюме установленная менеджеру');
    }).timeout(30000);

    it('Должна возвращаться ошибка, если у пользователя нет прав на просмотр резюме', () => {
      const apiClient = createApiClient({
        'x-mock-response-id': '2133179-adb60323-48cf-46f2-bd15-f435fc1d4e58'
      });

      const response = apiClient.getResume('123', false);

      return assert.isRejected(response, {HHResumesViewLimitExceededError}, 'Нет прав на просмотр контактов');
    }).timeout(30000);
  });

  describe('Ошибки использования авторизации', () => {
    it('Должна возвращаться ошибка, если токен авторизации не существует или не валидный', () => {
      const apiClient = createApiClient({
        'x-mock-response-id': '2133179-fbaddd16-9c39-4abc-aef0-f785f192cf60'
      })

      const response = apiClient.searchResume({test: 123});

      return assert.isRejected(response, {HHResumesViewLimitExceededError}, 'Токен авторизации не существует или не валидный');
    }).timeout(30000);

    it('Должна возвращаться ошибка, если токен отозван пользователем', () => {
      const apiClient = createApiClient({
        'x-mock-response-id': '2133179-fe395e6b-48a4-4443-a3e3-d68e52f9ba66'
      });

      const response = apiClient.searchResume({
        text: 'Python',
        area: 95
      });

      return assert.isRejected(response, {HHResumesViewLimitExceededError}, 'Токен отозван пользователем');
    }).timeout(30000);
  });

  describe('Ошибки при получениии/обновлении токенов', () => {
    it('Должна возвращаться ошибка, если пароль от пользовательского аккаунта устарел', () => {
      const apiClient = createApiClient({
        'x-mock-response-id': '2133179-e40ea8ad-11eb-4566-b1c3-ff572557d97e'
      });

      const response = apiClient.searchResume({
        text: 'Python',
        area: 95
      });

      return assert.isRejected(response, {HHResumesViewLimitExceededError}, 'Пароль от пользовательского аккаунта устарел');
    }).timeout(30000);

    it('Должна возвращаться ошибка, если токен был отозван', () => {
      const apiClient = createApiClient({
        'x-mock-response-id': '2133179-46c50cfa-33a8-480d-ba3b-45d96248cd11'
      });

      const response = apiClient.searchResume({
        text: 'Python',
        area: 95
      });

      return assert.isRejected(response, {HHResumesViewLimitExceededError}, 'Токен был отозван');
    }).timeout(30000);

    it('Должна возвращаться ошибка, если authorization_code был отозван', () => {
      const apiClient = createApiClient({
        'x-mock-response-id': '2133179-1f0056c7-4dc4-4b1f-a8fc-9b6892bce287'
      });

      const response = apiClient.searchResume({
        text: 'Python',
        area: 95
      });

      return assert.isRejected(response, {HHResumesViewLimitExceededError}, 'authorization_code был отозван');
    }).timeout(30000);

    it('Должна возвращаться ошибка, если токен был деактивирован', () => {
      const apiClient = createApiClient({
        'x-mock-response-id': '2133179-51686c1c-1e2f-4df7-9449-6324707d34d5'
      });

      const response = apiClient.searchResume({
        text: 'Python',
        area: 95
      });

      return assert.isRejected(response, {HHResumesViewLimitExceededError}, 'Токен был деактивирован');
    }).timeout(30000);
  });
});