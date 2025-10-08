
export async function login(
  username: string,
  password: string,
  setLoggedIn: (val: boolean) => void,
  setDataLocal: (data: any) => void
) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  setDataLocal(data.user);

  if (data.success) {
    setLoggedIn(true);
  } else {
    setLoggedIn(false);
    alert('Přihlášení se nezdařilo. Zkontrolujte uživatelské jméno a heslo.');
  }
}

export async function fetchData(
  userId: number,
  setDataLocal: (data: any) => void
) {
  const response = await fetch('/api/data', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId: userId }),
  });
  const data = await response.json();
  setDataLocal(data);
}