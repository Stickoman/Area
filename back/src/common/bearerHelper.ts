
function getBearerHeader(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export {getBearerHeader};
