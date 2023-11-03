export const setTableNumberCookie = (tableNumber: string) => {
  document.cookie = `tableNumber=${encodeURIComponent(tableNumber)}; path=/`
}

export const getTableNumberCookie = () => {
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=')
    if (cookieName.trim() === 'tableNumber') {
      return decodeURIComponent(cookieValue)
    }
  }
  return undefined
}
