export const MEASURE_AMOUNT_OPTIONS = [
  {
    label: "1/8",
    value: 0.125,
  },
  {
    label: "1/4",
    value: 0.25,
  },
  {
    label: "1/3",
    value: 0.3333,
  },
  {
    label: "1/2",
    value: 0.5,
  },
  {
    label: "3/4",
    value: 0.75,
  },
  {
    label: "1",
    value: 1,
  },
  {
    label: "1 1/4",
    value: 1.25,
  },
  {
    label: "1 1/2",
    value: 1.5,
  },
  {
    label: "1 3/4",
    value: 1.75,
  },
  {
    label: "2",
    value: 2,
  },
  {
    label: "2 1/4",
    value: 2.25,
  },
  {
    label: "2 1/2",
    value: 2.5,
  },
  {
    label: "2 3/4",
    value: 2.75,
  },
  {
    label: "3",
    value: 3,
  },
  {
    label: "3 1/4",
    value: 3.25,
  },
  {
    label: "3 1/2",
    value: 3.5,
  },
  {
    label: "3 3/4",
    value: 3.75,
  },
  {
    label: "4",
    value: 4,
  },
];

export const getConversionById = (conversions, id) => {
  if (!Array.isArray(conversions)) return null;

  return conversions.find((conversion) => conversion.id === parseInt(id));
};

export const getMeasureAmountDisplayByValue = (value) => {
  const obj = MEASURE_AMOUNT_OPTIONS.find((option) => option.value === parseFloat(value));
  if (!!obj) return obj.label;
  else return 1;
};

export const gramsToOunces = (grams) => {
  const value = parseFloat(grams) / 28.34952;
  return value.toFixed(2);
};
