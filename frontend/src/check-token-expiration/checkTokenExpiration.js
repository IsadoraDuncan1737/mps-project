// проверяем время жизни токена. false - вмер / не существует. true - пока жив

function checkTokenExpiration() {
  const token = sessionStorage.getItem('token');
  if (!token) {
    // console.log('Токена не существует');
    return false;
  } else {
    const tokenData = JSON.parse(atob(token.split('.')[1])); // получаем payload
    const tokenExpiration = tokenData.exp * 1000; // в миллисекунды
    if (tokenExpiration < Date.now()) {
      sessionStorage.removeItem('token');
      console.log('Токен истек');
      return false;
    } else return true;
  }
}

export default checkTokenExpiration;
