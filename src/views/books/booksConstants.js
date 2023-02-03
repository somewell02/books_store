export const sortInfo = {
  options: [
    { id: "default", title: "По умолчанию" },
    { id: "price:asc", title: "Стоимость (↑)" },
    { id: "price:desc", title: "Стоимость (↓)" },
    { id: "rating:asc", title: "Рейтинг (↑)" },
    { id: "rating:desc", title: "Рейтинг (↓)" },
  ],
};

export const filters = [
  {
    id: "theme",
    type: "checkbox",
    title: "Тематика",
    options: [],
    values: [],
  },
  {
    id: "author",
    type: "checkbox",
    title: "Автор",
    options: [],
    values: [],
  },
  {
    id: "binding",
    type: "checkbox",
    title: "Переплет",
    options: [],
    values: [],
  },
];

export const searchInfo = {
  fields: [
    { id: "author" },
    { id: "publishing" },
    { id: "theme" },
    { id: "title" },
  ],
};
