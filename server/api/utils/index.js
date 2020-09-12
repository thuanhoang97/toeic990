exports.handleError = (res, errCode, err) => {
  res.status(errCode);
  res.json({ error: err.message });
};
