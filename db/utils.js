exports.createRefObj = (data, key, value) => {
  return data.reduce((ref, datum) => {
    ref[datum[key]] = datum[value];
    return ref;
  }, {});
};

exports.formatNorthcoders = (northcoders, snackRef) => {
  return northcoders.map(
    ({ first_name, nickname, loves_to_code, favourite_snack }) => {
      return [first_name, nickname, loves_to_code, snackRef[favourite_snack]];
    }
  );
};

exports.formatSnacksCategories = (snacks, snackRef, categoryRef) => {
  return snacks.reduce((snacksCategories, snack) => {
    snack.categories.forEach((category) => {
      snacksCategories.push([
        snackRef[snack.snack_name],
        categoryRef[category]
      ]);
    });
    return snacksCategories;
  }, []);
};
