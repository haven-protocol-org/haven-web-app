export const generatePW = (length: number): string => {
  const pattern = /[a-zA-Z0-9_\-\+\.]/;

  const pwArray = Array.apply(null, Array(length));

  return pwArray
    .map(() => {
      let randomChar: string;

      while (true) {
        const randomByte = crypto.getRandomValues(new Uint8Array(1))[0];

        randomChar = String.fromCharCode(randomByte);

        if (pattern.test(randomChar)) {
          return randomChar;
        }
      }
    })
    .join("");
};
