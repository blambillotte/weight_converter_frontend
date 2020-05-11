const FRACTIONS = [
  {
    label: "3/4",
    value: 0.75,
  },
  {
    label: "1/2",
    value: 0.5,
  },
  {
    label: "1/3",
    value: 0.3333,
  },
  {
    label: "1/4",
    value: 0.25,
  },
  {
    label: "1/8",
    value: 0.125,
  },
];

const decimalToFraction = (decimal) => {
  const roundedDecimal = decimal.toPrecision(2);
  const retVal = FRACTIONS.reduce(
    (acc, fraction) => {
      if (acc.remainder > fraction.value) return acc;
      const remainder = acc.remainder - fraction.value;
      const fractionLabel = fraction.label;
      return { remainder, fraction: fractionLabel };
    },
    { remainder: roundedDecimal, fraction: "" }
  );
  return retVal;
};

export const displayCups = ({ measurementLabel, amount }) => {
  if (measurementLabel !== "cup") return console.log("invalid input");

  const amtFloat = parseFloat(amount);
  const wholeNum = Math.floor(amtFloat);
  const remainder = amtFloat - wholeNum;

  if (remainder === 0) return `${amtFloat} ${measurementLabel}`;

  const fraction = decimalToFraction(remainder);

  console.log(fraction);
};
