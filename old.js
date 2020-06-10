// const Equation = require('equations').default;

// const factorial = (n) => {
//   if (n === 0) {
//     return 1;
//   }
//   return n * factorial(n - 1);
// };

// client.on('message', (msg) => {
//   console.log(client.voice.broadcasts);
//   const msgContent = msg.content;

//   const flag = '!solve ';

//   if (msgContent.startsWith(flag)) {
//     const toSolve = msgContent.slice(flag.length, msgContent.length).trim();
//     try {
//       if (toSolve.includes('!')) {
//         throw new Error('Includes attempted factorial.');
//       }

//       const solved = Equation.solve(toSolve);

//       if (solved === Infinity) {
//         throw new Error('Solution too large.');
//       }

//       msg.reply(`${toSolve} = ${solved}`);
//     } catch (err) {
//       let errorMsg = `Could not solve the equation '${toSolve}'.`;

//       if (err.message.includes('factorial')) {
//         errorMsg = 'Factorials are not allowed.';
//       } else if (err.message.includes('too large')) {
//         errorMsg = 'Solution too large.';
//       }

//       console.log(errorMsg);
//       msg.reply(errorMsg);
//     }
//   }
// });
