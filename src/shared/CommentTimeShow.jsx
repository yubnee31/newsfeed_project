function CommentTimeShow(time) {
  const date_format = time.split(' ')[0];
  const time_format = time.split(' ')[1];

  let year = date_format.split('-')[0].slice(2);
  let month = date_format.split('-')[1];
  let date = date_format.split('-')[2];
  let hour =
    Number(time_format.split(':')[0]) < 13
      ? `오전 ${time_format.split(':')[0]}`
      : (String(Number(time_format.split(':')[0])) - 12).length === 1
      ? `오후 0${String(Number(time_format.split(':')[0]) - 12)}`
      : `오후 ${String(Number(time_format.split(':')[0]) - 12)}`;
  let minute = time_format.split(':')[1];
  let second = time_format.split(':')[2];

  return `${year}. ${month}. ${date} ${hour}:${minute}:${second}`;
}

export default CommentTimeShow;
