/* A cafeteria table consists of a row of NNN seats, numbered from 111 to NNN from left to right. Social distancing guidelines require that every diner be seated such that KKK seats to their left and KKK seats to their right (or all the remaining seats to that side if there are fewer than KKK) remain empty.
There are currently MMM diners seated at the table, the iiith of whom is in seat SiS_iSi​. No two diners are sitting in the same seat, and the social distancing guidelines are satisfied.
Determine the maximum number of additional diners who can potentially sit at the table without social distancing guidelines being violated for any new or existing diners, assuming that the existing diners cannot move and that the additional diners will cooperate to maximize how many of them can sit down.
Please take care to write a solution which runs within the time limit. */

/*
N = 10
K = 1
M = 2
S = [2, 6]
*/

function getDinners(N, K, M, S) {
  S.sort((a, b) => a - b); // Sort ascending initial places
  let extraDinners = 0;
  let nextFreeSpot = 0;
  S.forEach(occupiedPos => {
    console.log(`Checking pos ${occupiedPos}`);
    const freeSeats = occupiedPos - K - 1 - nextFreeSpot;
    if (freeSeats > 0) {
      const newDinners = Math.ceil(freeSeats / (K + 1));
      console.log(`Dinners before ${occupiedPos} = ${newDinners}`);
      extraDinners += newDinners;
    }
    nextFreeSpot = occupiedPos + K + 1 - 1;
  });
  const lastPos = S[S.length - 1];
  const lastAvailable = N - lastPos - K;
  if (lastAvailable > 0) {
    const lastDinners = Math.ceil(lastAvailable / (K + 1));
    extraDinners += lastDinners;
    console.log(`Adding ${lastDinners}`);
  }
  console.log(`Total extra dinners ${extraDinners}`);
  return extraDinners;
}

getDinners(10, 1, 2, [2, 6]);
// getDinners(5, 1, 1, [1]);
// getDinners(5, 2, 1, [1]);
getDinners(15, 2, 3, [11, 6, 14]);