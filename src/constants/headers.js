export const getAuthorizationHeader = () => {
  const jwt = localStorage.getItem("jwt");
  return { Authorization: `Bearer ${jwt}` };
};
