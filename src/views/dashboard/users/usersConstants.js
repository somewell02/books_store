export const tableInfo = {
  titles: [
    {
      id: "id",
      name: "ID",
      width: 20,
    },
    {
      id: "name",
      name: "ФИО",
      width: 15,
    },
    {
      id: "email",
      name: "E-mail пользователя",
      width: 18,
    },
    {
      id: "phone",
      name: "Телефон",
      width: 18,
    },
  ],
  actions: [],
};

export const sortInfo = {
  options: [{ id: "default", title: "По умолчанию" }],
};

export const searchInfo = {
  fields: [{ id: "id" }, { id: "email" }, { id: "phone" }, { id: "name" }],
};
