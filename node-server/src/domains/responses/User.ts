interface User {
  id: number;
  username: string;
  email: string;
  uncompletedGames: number | null;
}

export default User;
