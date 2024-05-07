const axios = require('axios');
const {RuntimeError} = require('../../domain/exceptions');
const querystring = require('querystring');

class ApiClient {
  /** @type {TokenStoreInterface} */
  tokenStore;

  headers;

  baseUrl;

  timeout;

  /** @type {AxiosResponseInterceptor} */
  responseInterceptor;

  constructor({timeout, baseUrl, tokenStore, headers, responseInterceptor}) {
    this.timeout = timeout;
    this.baseUrl = baseUrl;
    this.tokenStore = tokenStore;
    this.headers = headers;
    this.responseInterceptor = responseInterceptor;
  }

  async searchResume(params) {
    const httpClient = await this.makeHttpClient();
    const response = await httpClient.get('/resumes', {params});

    return response.data;
  }

  async getResume(resumeId, withContacts, responseId) {
    const resume = await this.getResumeById(resumeId, responseId);

    if (!withContacts || resume['can_view_full_info']) {
      return resume;
    }

    const resumeWithContactsUrl = resume.actions?.get_with_contact?.url;

    if (!resumeWithContactsUrl) {
      throw new RuntimeError('cannot show resume contacts');
    }

    const httpClient = await this.makeHttpClient();
    const response = await httpClient.get(resumeWithContactsUrl);

    return response.data;
  }

  async getResumeById(resumeId, responseId) {
    const httpClient = await this.makeHttpClient();
    const params = {'with_job_search_status': true};

    if (responseId) {
      params['topic_id'] = responseId;
    }

    const response = await httpClient.get(`/resumes/${resumeId}`, {params});

    return response.data;
  }

  async makeHttpClient(token) {
    if (!token) {
      token = await this.tokenStore.get();
    }

    if (!token) {
      throw new RuntimeError('auth token not exists');
    }

    const client = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout,
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token.accessToken}`
      },
      paramsSerializer: (params) => querystring.stringify(params)
    });

    client.interceptors.response.use(
      this.responseInterceptor.onFulfilled.bind(this.responseInterceptor),
      this.responseInterceptor.onRejected.bind(this.responseInterceptor)
    );

    return client;
  }

  async getDictionaries() {
    const response = await axios.get('https://api.hh.ru/dictionaries', {timeout: this.timeout});

    return response.data;
  }

  async getAreas(areaId) {
    const urlParts = [
      'https://api.hh.ru/areas',
      areaId
    ];

    const url = urlParts.filter(Boolean).join('/');
    const response = await axios(url, {timeout: this.timeout});

    return response.data;
  }

  async getLanguages() {
    const response = await axios('https://api.hh.ru/languages', {timeout: this.timeout});

    return response.data;
  }

  async getProfessionalRoles() {
    const response = await axios('https://api.hh.ru/professional_roles', {timeout: this.timeout});

    return response.data;
  }

  async getSuggest({suggest, text}) {
    const httpClient = await this.makeHttpClient();
    const query = new URLSearchParams();

    query.set('text', text);

    const requestUrl = `/suggests/${suggest}?${query.toString()}`;
    const response = await httpClient.get(requestUrl);

    return response.data;
  }

  async me() {
    const client = await this.makeHttpClient();
    const response = await client.get('/me');

    return response.data;
  }

  async getAddresses() {
    const httpClient = await this.makeHttpClient();
    const {employer} = await this.me();
    const addresses = [];

    const pages = await this.getPages(httpClient, employer);

    if (!pages) {
      return [];
    }

    for await (const page of [...Array(pages).keys()]) {
      const response =
        await httpClient.get(`/employers/${employer.id}/addresses`, {params: {page}});

      addresses.push(...response.data.items);
    }

    return addresses;
  }

  async getPages(httpClient, employer) {
    const response = await httpClient.get(`/employers/${employer.id}/addresses`);

    return response.data.pages;
  }

  async getManagers() {
    const httpClient = await this.makeHttpClient();
    const {employer} = await this.me();
    const response = await httpClient.get(`/employers/${employer.id}/managers`);

    return response.data;
  }

  async getAvailablePublicationTypes() {
    const httpClient = await this.makeHttpClient();
    const {employer} = await this.me();
    const requestUrl =
      `/employers/${employer.id}/managers/${employer['manager_id']}/vacancies/available_types`;

    const response = await httpClient.get(requestUrl);

    return response.data;
  }

  async getResumeComments({ownerId, page, perPage}) {
    const httpClient = await this.makeHttpClient();
    const query = new URLSearchParams();

    query.set('page', page);
    query.set('per_page', perPage);
    query.set('order_by', 'creation_time_desc');

    const requestUrl = `/applicant_comments/${ownerId}?${query.toString()}`;
    const response = await httpClient.get(requestUrl);

    return response.data;
  }

  async postVacancy(requestBody) {
    const httpClient = await this.makeHttpClient();
    const requestUrl = `/vacancies?ignore_duplicates=true&with_professional_roles=true`;

    const response = await httpClient.post(requestUrl, requestBody);

    return response.data;
  }

  async archiveVacancy(vacancyId) {
    const httpClient = await this.makeHttpClient();
    const {employer} = await this.me();
    const requestUrl = `/employers/${employer.id}/vacancies/archived/${vacancyId}`;

    const response = await httpClient.put(requestUrl);

    return response.data;
  }

  async getVacancy(vacancyId) {
    const token = await this.tokenStore.get();
    const httpClient = await this.makeHttpClient(token);
    const requestUrl = `/vacancies/${vacancyId}`;
    const response = await httpClient.get(requestUrl);

    return response.data;
  }

  async getNegotiations({vacancyId, page, perPage}) {
    const token = await this.tokenStore.get();
    const httpClient = await this.makeHttpClient(token);
    const query = new URLSearchParams();

    query.set('status', 'active');
    query.set('vacancy_id', vacancyId);
    query.set('page', page);
    query.set('per_page', perPage);

    const response = await httpClient.get(`/negotiations/response?${query.toString()}`);

    return response.data;
  }

  async getResponse({responseId}) {
    const httpClient = await this.makeHttpClient();
    const requestUrl = `negotiations/${responseId}`;

    const response = await httpClient.get(requestUrl);

    return response.data;
  }

  async invite({responseId, message, sms}) {
    const httpClient = await this.makeHttpClient();
    const parameters = [];

    if (message) {
      parameters.push(`message=${message}`);
    }

    if (sms) {
      parameters.push(`send_sms=${true}&sms=${sms}`);
    }

    const url = encodeURI(`negotiations/interview/${responseId}?${parameters.join('&')}`);
    const response = await httpClient.put(url);

    return response.data;
  }

  async discard({responseId, mail, sms}) {
    const httpClient = await this.makeHttpClient();
    const parameters = [];

    if (mail) {
      parameters.push(`message=${mail}`);
    }

    if (sms) {
      parameters.push(`send_sms=${true}&sms=${sms}`);
    }

    const url = encodeURI(`negotiations/discard_by_employer/${responseId}?${parameters.join('&')}`);
    const response = await httpClient.put(url);

    return response.data;
  }

  async getMessageTemplateByParams({responseId, templatesType}) {
    const httpClient = await this.makeHttpClient();
    const requestUrl = `message_templates/${templatesType}`;
    const params = {'topic_id': responseId};

    const response = await httpClient.get(requestUrl, {params});

    return response.data;
  }

  async getBrandedTemplates() {
    const httpClient = await this.makeHttpClient();
    const {employer} = await this.me();
    const requestUrl = `/employers/${employer.id}/vacancy_branded_templates`;

    const response = await httpClient.get(requestUrl);

    return response.data;
  }

  async getResumePDF(url, config) {
    const httpClient = await this.makeHttpClient();
    const response = await httpClient.get(url, config);

    return response.data;
  }

  async sendInviteForVacancy({status, resumeId, vacancyId, message, addressId}) {
    const httpClient = await this.makeHttpClient();
    const command = new URLSearchParams();

    command.set('resume_id', resumeId);
    command.set('vacancy_id', vacancyId);

    if (message) {
      command.set('message', message);
    }

    if (addressId) {
      command.set('address_id', addressId);
    }

    const url = `negotiations/${status}/?${command.toString()}`;
    const response = await httpClient.post(url);

    return response.data;
  }

  async getCollection({collectionType, vacancyId, page, perPage}) {
    const token = await this.tokenStore.get();
    const httpClient = await this.makeHttpClient(token);
    const query = new URLSearchParams();

    query.set('vacancy_id', vacancyId);
    query.set('page', page);
    query.set('per_page', perPage);

    const url = encodeURI(`/negotiations/${collectionType}?${query.toString()}`);
    const response = await httpClient.get(url);

    return response.data;
  }

  async getResumeDayLimit() {
    const httpClient = await this.makeHttpClient();
    const {employer, manager} = await this.me();
    const url = `employers/${employer.id}/managers/${manager.id}/limits/resume`;
    const response = await httpClient.get(url);

    return response.data;
  }

  async getSkills(ids) {
    const httpClient = await this.makeHttpClient();
    const query = new URLSearchParams();

    ids.forEach((id) => query.append('id', id));

    const url = `skills/?${query.toString()}`;
    const response = await httpClient.get(url);

    return response.data;
  }
}

module.exports = {ApiClient};