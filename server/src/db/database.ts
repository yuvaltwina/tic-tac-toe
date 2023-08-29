// type QueryResult = RowDataPacket[] | ResultSetHeader[];
// export const getSongs = async () => {
//   const [rows] = await pool.query<QueryResult>('SELECT * FROM songs');
//   return rows;
// };
// export const getSong = async (id: number) => {
//   const [rows] = await pool.query<QueryResult>(
//     'SELECT * FROM songs WHERE id = ?',
//     [id]
//   );
//   return rows[0];
// };
// export const createSong = async (
//   name: string,
//   length: number,
//   album_id: number
// ) => {
//   const [result] = (await pool.query(
//     `INSERT INTO songs (name,length,album_id)
//     VALUES(?,?,?)`,
//     [name, length, album_id]
//   )) as any;
//   const createdSong = await getSong(result?.insertId);
//   console.log(createdSong);
//   return createdSong;
// };
// need to handle errors
