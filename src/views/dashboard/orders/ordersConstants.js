export const tableInfo = {
  titles: [
    {
      id: "id",
      name: "ID",
      width: 20,
    },
    {
      id: "statusDisplay",
      name: "Статус",
      width: 15,
    },
    {
      id: "createdDateDisplay",
      name: "Дата",
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
      width: 14,
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
