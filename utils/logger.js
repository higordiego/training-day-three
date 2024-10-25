
exports.logConnectionError = (retries, maxReties, err) => {
    console.log(`Connection attempt ${retries}/${maxReties} failed.`, err?.error)
  } 