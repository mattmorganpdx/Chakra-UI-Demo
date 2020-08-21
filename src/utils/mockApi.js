export const userLogin = async ({ email, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          console.log(`${email} ${password}`)
        if (email === 'test@test.com' && password === 'password') {
          resolve();
        } else {
          reject();
        }
      }, 3000);
    });
  };