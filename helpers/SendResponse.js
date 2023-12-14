const SendResponse = (status, message, error, data) => {
  if (error !== null) {
    const response = {
      status: status,
      message: error.message,
      errors: error,
      data: null,
    };

    return response;
  }

  const res = {
    status: status,
    message: message,
    errors: error,
    data: data,
  };

  return res;
};

module.exports = SendResponse;
