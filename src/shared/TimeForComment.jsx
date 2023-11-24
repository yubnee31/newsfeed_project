function TimeForComment() {
  const today = new Date();
  let year = today.getFullYear();
  let month =
    String(today.getMonth() + 1).length === 1 ? `0${String(today.getMonth() + 1)}` : String(today.getMonth() + 1);
  let date = String(today.getDate()).length === 1 ? `0${String(today.getDate())}` : String(today.getDate());
  let hour = String(today.getHours()).length === 1 ? `0${String(today.getHours())}` : String(today.getHours());
  let minute = String(today.getMinutes()).length === 1 ? `0${String(today.getMinutes())}` : String(today.getMinutes());
  let second = String(today.getSeconds()).length === 1 ? `0${String(today.getSeconds())}` : String(today.getSeconds());

  return `${String(year)}-${month}-${date} ${hour}:${minute}:${second}`;
}

export default TimeForComment;
