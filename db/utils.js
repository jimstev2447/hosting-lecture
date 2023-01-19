exports.formatSnack = (snack, categories) => {
  const onlyGivenCategory = categories.filter((category) => {
    return category.category_name === snack.category;
  });
  return [
    snack.snack_name,
    snack.price,
    snack.description,
    onlyGivenCategory[0].category_id,
  ];
};
