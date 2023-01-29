export const tableInfo = {
  titles: [
    {
      id: "id",
      name: "ID",
      width: 25,
    },
    {
      id: "status",
      name: "Статус",
      width: 15,
    },
    {
      id: "userEmail",
      name: "E-mail пользователя",
      width: 18,
    },
    {
      id: "userPhone",
      name: "Телефон",
      width: 18,
    },
    {
      id: "totalPrice",
      name: "Итоговая стоимость",
      width: 10,
      type: "price",
      unit: "₽",
    },
  ],
  actions: ["delete"],
};

export const sortInfo = {
  options: [
    { id: "default", title: "По умолчанию" },
    { id: "totalPrice:asc", title: "Итоговая стоимость (↑)" },
    { id: "totalPrice:desc", title: "Итоговая стоимость (↓)" },
  ],
};

export const searchInfo = {
  fields: [{ id: "id" }, { id: "userEmail" }, { id: "userPhone" }],
};
