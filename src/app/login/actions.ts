// Função de login para autenticação
export async function login(username: string, password: string) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Login inválido');
  }

  // O accessToken agora está salvo em cookie HTTPOnly pelo backend
  return { success: true };
}
