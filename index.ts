const getDayFact = async () => {
  try {
    let formattedDate = `${new Date().getMonth() + 1}/${new Date().getDate()}/date`;
    const respone = await fetch(`http://numbersapi.com/${formattedDate}`);
    const data = await respone.text();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getRadomNumberFact = async () => {
  try {
    // Random number between 1 and 10000
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    const respone = await fetch(`http://numbersapi.com/${randomNumber}?notFound=floor`);
    const data = await respone.text();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const currendDate = new Date();
const day = currendDate.getDate();
let daySuffix;
if (day === 1 || day === 21 || day === 31) {
  daySuffix = "st";
} else if (day === 2 || day === 22) {
  daySuffix = "nd";
} else if (day === 3 || day === 23) {
  daySuffix = "rd";
} else {
  daySuffix = "th";
}

const updateReadme = async ({
  dayData,
  randomNumberData,
}: {
  dayData: string;
  randomNumberData: string;
}) => {
  try {
    const formattedDate = `${day}${daySuffix} ${currendDate.toLocaleString("default", {
      month: "long",
    })}`;

    let randomFact = `${randomNumberData}`;
    let dateFact = `${dayData}`;

    let readme = `
# A Noted Fact about the Date - ${formattedDate}

> **Fact:** ${dateFact}

> **Fact about a random number:** ${randomFact}

> This README is automatically updated with a fact about a day.
`;
    await Bun.write("README.md", readme);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const main = async () => {
  try {
    let dayData = await getDayFact();
    let randomNumberData = await getRadomNumberFact();
    await updateReadme({ dayData, randomNumberData });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

main();
