const defaultMessage = {
  string: {
    url: () => ({ key: 'notUrl' }),
    required: () => ({ key: 'empty' }),
  },
  mixed: {
    notOneOf: () => ({ key: 'alreadyInList' }),
  },
};
export default defaultMessage;
