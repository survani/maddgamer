export const sortArrayByCount = (arr) => {
  const count = {};
  for (let i = 0; i < arr.length; i++) {
    if (count[arr[i]]) {
      count[arr[i]]++;
    } else {
      count[arr[i]] = 1;
    }
  }

  const countArray = [];
  for (let key in count) {
    countArray.push({ value: key, count: count[key] });
  }

  countArray.sort((a, b) => {
    return b.count - a.count;
  });

  return countArray;
};
