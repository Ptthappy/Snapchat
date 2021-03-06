export const getTime = (time) => {
  const date = new Date(time)
  const minutes = date.getHours() > 12 ? (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ' PM' : 
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ' AM'
  const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
  return hours + ':' + minutes
}