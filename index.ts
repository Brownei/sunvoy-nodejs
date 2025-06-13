const world = 'world';

function getRandomNonce() {
  const arrayBytes = new Uint8Array(32 / 2)
  crypto.getRandomValues(arrayBytes)
  return Array.from(arrayBytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

async function login(): Promise<Response | string> {
  const credentials = {
    nonce: "d8633b9ba9c891338816136de817baf0",
    username: "demo@example.org",
    password: "test"
  }

  try {
  const response = await fetch('https://challenge.sunvoy.com/login', {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(credentials),
    credentials: 'include'
  })

  return response 
  } catch (error) {
    console.log(error)
    return 'There is a Big error here'
  }
}

async function main(who: string = world) {
  const apiRes = await login()
  console.log(apiRes)
  return `Hello ${who}! `;
}

main();