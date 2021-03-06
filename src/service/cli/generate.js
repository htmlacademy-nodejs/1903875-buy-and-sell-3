"use strict";

const fs = require(`fs`);
const { getRandomInt, shuffle, getPictureFileName } = require(`./utils`);
const { ExitCode } = require(`../../constants`);
const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `При покупке с меня бесплатная доставка в черте города.`,
];

const CATEGORIES = [`Книги`, `Разное`, `Посуда`, `Игры`, `Животные`, `Журналы`];

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const OfferTypeKeys = Object.keys(OfferType);

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const generateOffers = (count) =>
  Array(count)
    .fill({})
    .map(() => ({
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      picture: getPictureFileName(PictureRestrict.MIN, PictureRestrict.MAX),
      description: shuffle(SENTENCES).slice(1, 5).join(` `),
      types:
        OfferType[OfferTypeKeys[getRandomInt(0, OfferTypeKeys.length - 1)]],
      sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
      category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    }));

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    if (count > 1000) {
      console.error(`Не больше 1000 объявлений`);
      process.exit(ExitCode.ERROR);
    }
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));
    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(ExitCode.ERROR);
      }
      console.info(`Operation success. File created.`);
      process.exit(ExitCode.SUCCESS);
    });
  },
};
