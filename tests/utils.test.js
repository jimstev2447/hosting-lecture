const { formatSnack } = require('../utils');

describe('formatSnack()', () => {
  // --->

  //const formattedSnack = ['hobnobs', 100, 'a delicious biscuit', 1];

  test('should return an array of length 4', () => {
    const snack = {
      snack_name: 'hobnobs',
      price: 100,
      description: 'a delicious biscuit',
      category: 'biscuit',
    };
    const categories = [
      {
        category_id: 1,
        category_name: 'biscuit',
        category_description: 'aint biscuits brillaint',
      },
    ];
    expect(formatSnack(snack, categories)).toHaveLength(4);
  });
  test('the first 3 items recieved in the array should be the snack_name, price and description', () => {
    //arrange
    const snack = {
      snack_name: 'hobnobs',
      price: 100,
      description: 'a delicious biscuit',
      category: 'biscuit',
    };
    const categories = [
      {
        category_id: 1,
        category_name: 'biscuit',
        category_description: 'aint biscuits brillaint',
      },
    ];
    //act
    const formattedSnack = formatSnack(snack, categories);
    //assert
    expect(formattedSnack[0]).toBe(snack.snack_name);
    expect(formattedSnack[1]).toBe(snack.price);
    expect(formattedSnack[2]).toBe(snack.description);
  });
  test('the 4th item in the array should be the correct category_id', () => {
    //arrange
    const snack = {
      snack_name: 'hobnobs',
      price: 100,
      description: 'a delicious biscuit',
      category: 'biscuit',
    };
    const categories = [
      {
        category_id: 1,
        category_name: 'biscuit',
        category_description: 'aint biscuits brillaint',
      },
    ];
    //act
    const formattedSnack = formatSnack(snack, categories);
    //assert

    expect(formattedSnack[3]).toBe(1);
  });
  test('the 4th item in the array should be the correct category_id when there are mltiple options', () => {
    //arrange
    const snack = {
      snack_name: 'apple',
      price: 200,
      description: 'one a day',
      category: 'fruit',
    };
    const categories = [
      {
        category_id: 1,
        category_name: 'biscuit',
        category_description: 'aint biscuits brillaint',
      },
      {
        category_id: 4,
        category_name: 'fruit',
        category_description: 'get your 7 a day in!',
      },
    ];
    //act
    const formattedSnack = formatSnack(snack, categories);
    //assert

    expect(formattedSnack[3]).toBe(4);
  });
});
