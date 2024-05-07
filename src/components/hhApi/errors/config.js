/* eslint-disable max-len */

const {
  HHResumesViewLimitExceededError,
  HHResumesQuotaExceededError,
  HHResumesCantViewContactsError,
  HHOauthBadAuthorizationError,
  HHOauthTokenRevokedError,
  HHInvalidRequestPasswordInvalidatedError,
  HHInvalidGrantTokenWasRevokedError,
  HHInvalidGrantCodeWasRevokedError,
  HHInvalidGrantTokenDeactivatedError,
  HHNegotiationsTopicNotFoundError,
  HHInvalidRequestForSuggestionsError
} = require('../../../domain/errors');

module.exports = [
  // Неверный User-Agent
  {
    ctx: {
      status: 400,
      type: 'bad_user_agent',
      value: 'unset'
    },
    description: 'Заголовок User-Agent не передан'
  },
  {
    ctx: {
      status: 400,
      type: 'bad_user_agent',
      value: 'blacklisted'
    },
    description: 'Значение User-Agent в чёрном списке'
  },
  // Описание ошибок при получении/обновлении токенов
  {
    ctx: {
      status: 400,
      error: 'invalid_request',
      'error_description': 'account not found'
    },
    description: 'Неправильная пара client_id и client_secret'
  },
  {
    ctx: {
      status: 400,
      error: 'invalid_request',
      'error_description': 'account is locked'
    },
    description: 'Пользовательский аккаунт заблокирован'
  },
  {
    ctx: {
      status: 400,
      error: 'invalid_request',
      'error_description': 'password invalidated'
    },
    description: 'Пароль от пользовательского аккаунта устарел',
    factory: ({status, error}) => new HHInvalidRequestPasswordInvalidatedError(
      'Пароль от пользовательского аккаунта устарел',
      {status, 'error_description': error}
    )
  },
  {
    ctx: {
      status: 400,
      error: 'invalid_request',
      'error_description': 'login not verified'
    },
    description: 'Пользовательский аккаунт не подтвержден'
  },
  {
    ctx: {
      status: 400,
      error: 'invalid_request',
      'error_description': 'bad redirect url'
    },
    description: 'Передан неправильный redirect_url'
  },
  {
    ctx: {
      status: 400,
      error: 'invalid_request',
      'error_description': 'token is empty'
    },
    description: 'Не передан refresh_token'
  },
  {
    ctx: {
      status: 400,
      error: 'invalid_request',
      'error_description': 'token not found'
    },
    description: 'Передан не правильный refresh_token'
  },
  {
    ctx: {
      status: 400,
      error: 'invalid_request',
      'error_description': 'code not found'
    },
    description: 'Переданный authorization_code не найден'
  },
  {
    ctx: {
      status: 400,
      error: 'invalid_client',
      'error_description': 'client_id'
    },
    description: 'Client id не найден'
  },
  {
    ctx: {
      status: 400,
      error: 'invalid_client',
      'error_description': 'client_secret'
    },
    description: 'Передан неправильный client_secret'
  },
  {
    ctx: {
      status: 400,
      error: 'invalid_grant',
      'error_description': 'token has already been refreshed'
    },
    description: 'Повторное использование refresh токена'
  },
  {
    ctx: {
      status: 400,
      error: 'invalid_grant',
      'error_description': 'token not expired'
    },
    description: 'Access токен еще не истек'
  },
  {
    ctx: {
      status: 400,
      error: 'invalid_grant',
      'error_description': 'token was revoked'
    },
    description: 'Токен был отозван',
    factory: ({status, error}) => new HHInvalidGrantTokenWasRevokedError(
      'Токен был отозван',
      {status, 'error_description': error}
    )
  },
  {
    ctx: {
      status: 400,
      error: 'invalid_grant',
      'error_description': 'bad token'
    },
    description: 'Передано неправильное значение токена'
  },
  {
    ctx: {
      status: 400,
      error: 'invalid_grant',
      'error_description': 'code has already been used'
    },
    description: 'Authorization_code уже был использован'
  },
  {
    ctx: {
      status: 400,
      error: 'invalid_grant',
      'error_description': 'code expired'
    },
    description: 'Authorization_code истек'
  },
  {
    ctx: {
      status: 400,
      error: 'invalid_grant',
      'error_description': 'code was revoke'
    },
    description: 'Authorization_code был отозван',
    factory: ({status, error}) => new HHInvalidGrantCodeWasRevokedError(
      'authorization_code был отозван',
      {status, 'error_description': error}
    )
  },
  {
    ctx: {
      status: 400,
      error: 'invalid_grant',
      'error_description': 'token deactivated'
    },
    description: 'Токен был деактивирован',
    factory: ({status, error}) => new HHInvalidGrantTokenDeactivatedError(
      'Токен был деактивирован',
      {status, 'error_description': error}
    )
  },
  {
    ctx: {
      status: 400,
      error: 'unsupported_grant_type',
      'error_description': 'unsupported grant_type'
    },
    description: 'Неправильное значение в поле grant_type'
  },
  {
    ctx: {
      status: 403,
      error: 'forbidden',
      'error_description': 'app token refresh too early'
    },
    description: 'Token приложения запрашивается чаще чем раз в пять минут'
  },
  // Ошибки использования авторизации
  {
    ctx: {
      status: 403,
      type: 'oauth',
      value: 'bad_authorization'
    },
    description: 'Токен авторизации не существует или не валидный',
    factory: ({type, status}) => new HHOauthBadAuthorizationError(
      'Токен авторизации не существует или не валидный',
      {type, status}
    )
  },
  {
    ctx: {
      status: 403,
      type: 'oauth',
      value: 'token_expired'
    },
    description: 'Время жизни access_token завершилось'
  },
  {
    ctx: {
      status: 403,
      type: 'oauth',
      value: 'token_revoked'
    },
    description: 'Токен отозван пользователем',
    factory: ({type, status}) => new HHOauthTokenRevokedError(
      'Токен отозван пользователем',
      {type, status}
    )
  },
  {
    ctx: {
      status: 403,
      type: 'oauth',
      value: 'application_not_found'
    },
    description: 'Ваше приложение было удалено'
  },
  {
    ctx: {
      status: 403,
      type: 'oauth',
      value: 'user_auth_expected'
    },
    description: 'Выполняется запрос с авторизацией приложения, для выполнения которого необходима авторизация пользователя'
  },
  // Ошибки доступа к платному методу
  {
    ctx: {
      status: 403,
      type: 'api_access_payment',
      value: 'action_must_be_payed'
    },
    description: 'Запрос платного метода при отсутствии оплаченного доступа'
  },
  // Сохраненные поиски резюме
  {
    ctx: {
      status: 404,
      type: 'saved_searches',
      value: 'saved_search_not_found'
    },
    description: 'Автопоиск не был найден или не принадлежит текущему пользователю'
  },
  {
    ctx: {
      status: 404,
      type: 'saved_searches',
      value: 'manager_not_found'
    },
    description: 'Несуществующий manager_id'
  },
  // Переписка (отклики/приглашения)
  {
    ctx: {
      status: 400,
      type: 'negotiations',
      value: 'vacancy_not_found'
    },
    description: 'Вакансия не найдена'
  },
  {
    ctx: {
      status: 403,
      type: 'negotiations',
      value: 'invalid_vacancy'
    },
    description: 'Вакансия из отклика/приглашения была архивирована либо скрыта'
  },
  {
    ctx: {
      status: 400,
      type: 'negotiations',
      value: 'resume_not_found'
    },
    description: 'Резюме из отклика/приглашения было скрыто, либо удалено, либо не найдено'
  },
  {
    ctx: {
      status: 403,
      type: 'negotiations',
      value: 'resume_not_found'
    },
    description: 'Резюме из отклика/приглашения было скрыто, либо удалено, либо не найдено'
  },
  {
    ctx: {
      status: 403,
      type: 'negotiations',
      value: 'already_applied'
    },
    description: 'Уже есть отклик/приглашение на указанную связку resume_id+vacancy_id'
  },
  {
    ctx: {
      status: 403,
      type: 'negotiations',
      value: 'test_required'
    },
    description: 'Для отклика необходимо пройти тест (в данный момент, отклик на такие вакансии через API недоступен)'
  },
  {
    ctx: {
      status: 403,
      type: 'negotiations',
      value: 'resume_visibility_conflict'
    },
    description: 'Невозможно откликнуться на анонимную вакансию резюме с видимостью "белый список"'
  },
  {
    ctx: {
      status: 403,
      type: 'negotiations',
      value: 'edit_forbidden'
    },
    description: 'Редактирование сообщения недоступно'
  },
  {
    ctx: {
      status: 403,
      type: 'negotiations',
      value: 'application_denied'
    },
    description: 'Общая ошибка запрета отклика в случае, когда дополнительная информация недоступна'
  },
  {
    ctx: {
      status: 403,
      type: 'negotiations',
      value: 'limit_exceeded'
    },
    description: 'Превышен лимит количества откликов/приглашений'
  },
  {
    ctx: {
      status: 400,
      type: 'negotiations',
      value: 'limit_exceeded'
    },
    description: 'Превышен лимит количества откликов/приглашений'
  },
  {
    ctx: {
      status: 403,
      type: 'negotiations',
      value: 'wrong_state'
    },
    description: 'Действие по отклику/приглашению в данном статусе невозможно'
  },
  {
    ctx: {
      status: 403,
      type: 'negotiations',
      value: 'empty_message'
    },
    description: 'Передан пустой текст письма'
  },
  {
    ctx: {
      status: 403,
      type: 'negotiations',
      value: 'too_long_message'
    },
    description: 'Передан слишком длинный текст письма'
  },
  {
    ctx: {
      status: 403,
      type: 'negotiations',
      value: 'address_not_found'
    },
    description: 'Переданный к действию по адрес не существует, либо принадлежит другому работодателю'
  },
  {
    ctx: {
      status: 403,
      type: 'negotiations',
      value: 'not_enough_purchased_services'
    },
    description: 'Не хватает оплаченных услуг, обычно доступа к базе резюме'
  },
  {
    ctx: {
      status: 403,
      type: 'negotiations',
      value: 'in_a_row_limit'
    },
    description: 'Превышено количество последовательных сообщений в переписке'
  },
  {
    ctx: {
      status: 403,
      type: 'negotiations',
      value: 'overall_limit'
    },
    description: 'Превышен лимит сообщений'
  },
  {
    ctx: {
      status: 403,
      type: 'negotiations',
      value: 'no_invitation'
    },
    description: 'Переписка недоступна, так как в отклике ещё не было приглашения'
  },
  {
    ctx: {
      status: 403,
      type: 'negotiations',
      value: 'message_cannot_be_empty'
    },
    description: 'Сообщение в переписке не может быть пустым'
  },
  {
    ctx: {
      status: 403,
      type: 'negotiations',
      value: 'disabled_by_employer'
    },
    description: 'Возможность переписки по отклику отключена работодателем'
  },
  {
    ctx: {
      status: 403,
      type: 'negotiations',
      value: 'resume_deleted'
    },
    description: 'Отправить сообщение невозможно, так как резюме, с которым совершался отклик, удалено или скрыто'
  },
  {
    ctx: {
      status: 403,
      type: 'negotiations',
      value: 'archived'
    },
    description: 'Отправить сообщение невозможно, так как вакансия, на которую совершался отклик, заархивирована'
  },
  {
    ctx: {
      status: 403,
      type: 'negotiations',
      value: 'chat_archived'
    },
    description: 'Действие по отклику/приглашению невозможно, так как отклик/приглашение заархивировано'
  },
  {
    ctx: {
      status: 404,
      type: 'negotiations',
      value: 'topic_not_found'
    },
    description: 'Отклик не существует',
    factory: ({status, type}) => new HHNegotiationsTopicNotFoundError(
      'Отклик не существует',
      {status, type}
    )
  },
  // Публикация и редактирование вакансий
  {
    ctx: {
      status: 400,
      type: 'bad_json_data'
    },
    description: 'Ошибка в поле вакансии'
  },
  {
    ctx: {
      status: 403,
      type: 'vacancies',
      value: 'not_enough_purchased_services'
    },
    description: 'Купленных услуг для публикации или обновления данного типа вакансии не достаточно'
  },
  {
    ctx: {
      status: 403,
      type: 'vacancies',
      value: 'quota_exceeded'
    },
    description: 'Квота менеджера на публикацию данного типа вакансии закончилась'
  },
  {
    ctx: {
      status: 403,
      type: 'vacancies',
      value: 'duplicate'
    },
    description: 'Аналогичная вакансия уже опубликована'
  },
  {
    ctx: {
      status: 403,
      type: 'vacancies',
      value: 'creation_forbidden'
    },
    description: 'Публикация вакансий недоступна текущему менеджеру'
  },
  {
    ctx: {
      status: 403,
      type: 'vacancies',
      value: 'unavailable_for_archived'
    },
    description: 'Редактирование недоступно для архивной вакансии'
  },
  {
    ctx: {
      status: 403,
      type: 'vacancies',
      value: 'conflict_changes'
    },
    description: 'Конфликтные изменения данных вакансии'
  },
  // Продление вакансии
  {
    ctx: {
      status: 403,
      type: 'vacancies',
      value: 'not_enough_purchased_services'
    },
    description: 'Купленных услуг для продления данного типа вакансии не достаточно'
  },
  {
    ctx: {
      status: 403,
      type: 'vacancies',
      value: 'quota_exceeded'
    },
    description: 'Квота менеджера на публикацию данного типа вакансии закончилась'
  },
  {
    ctx: {
      status: 403,
      type: 'vacancies',
      value: 'prolongation_forbidden'
    },
    description: 'Продление вакансий недоступно текущему менеджеру'
  },
  {
    ctx: {
      status: 403,
      type: 'vacancies',
      value: 'unavailable_for_archived'
    },
    description: 'Продление недоступно для архивной вакансии'
  },
  {
    ctx: {
      status: 403,
      type: 'vacancies',
      value: 'too_early'
    },
    description: 'Продление раньше времени'
  },
  // Менеджеры работодателя
  {
    ctx: {
      status: 400,
      type: 'managers'
    },
    description: 'Ошибка в поле'
  },
  {
    ctx: {
      status: 403,
      type: 'managers',
      value: 'email',
      reason: 'already_exist'
    },
    description: 'Менеджер с такой почтой уже существует'
  },
  {
    ctx: {
      status: 403,
      type: 'managers',
      reason: 'creation_limit_exceeded'
    },
    description: 'Достигнут лимит на создание менеджеров'
  },
  {
    ctx: {
      status: 403,
      type: 'managers',
      reason: 'not_editable'
    },
    description: 'Поле недоступно для редактирования'
  },
  // Работа с резюме
  {
    ctx: {
      status: 400,
      type: 'bad_argument',
      value: 'with_contact'
    },
    description: 'Не правильное значение поля with_contact'
  },
  {
    ctx: {
      status: 400,
      type: 'resumes',
      value: 'total_limit_exceeded'
    },
    description: 'Превышено допустимое количество резюме (актуально только для соискателей)'
  },
  {
    ctx: {
      status: 429,
      type: 'resumes',
      value: 'view_limit_exceeded'
    },
    description: 'превышен лимит просмотров резюме в сутки (актуально только для работодателей)',
    factory: ({type, status}) => new HHResumesViewLimitExceededError(
      'Превышен лимит просмотров резюме в сутки',
      {type, status}
    )
  },
  {
    ctx: {
      status: 403,
      type: 'resumes',
      value: 'quota_exceeded'
    },
    description: 'превышена квота просмотров резюме установленная менеджеру (актуально только для работодателей)',
    factory: ({type, status}) => new HHResumesQuotaExceededError(
      'Превышена квота просмотров резюме установленная менеджеру',
      {type, status}
    )
  },
  {
    ctx: {
      status: 403,
      type: 'resumes',
      value: 'no_available_service'
    },
    description: 'Не хватает услуг для просмотра резюме'
  },
  {
    ctx: {
      status: 403,
      type: 'resumes',
      value: 'cant_view_contacts'
    },
    description: 'нет прав на просмотр контактов',
    factory: ({type, status}) => new HHResumesCantViewContactsError(
      'Нет прав на просмотр контактов',
      {type, status}
    )
  },
  {
    ctx: {
      status: 400,
      type: 'bad_argument',
      value: 'text'
    },
    description: 'Текстовое значение должно быть больше 2 символов',
    factory: ({type, status}) => new HHInvalidRequestForSuggestionsError(
      'Введены недопустимые символы',
      {type, status}
    )
  },
  // Рабочие аккаунты менеджера
  {
    ctx: {
      status: 403,
      type: 'manager_extra_accounts',
      value: 'manager_extra_account_not_found'
    },
    description: 'В заголовке передан некорректный id аккаунта'
  },
  {
    ctx: {
      status: 403,
      type: 'manager_accounts',
      value: 'used_manager_account_forbidden'
    },
    description: 'Рабочий аккаунт заблокирован'
  }
];