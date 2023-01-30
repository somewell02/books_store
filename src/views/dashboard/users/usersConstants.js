export const tableInfo = {
  titles: [
    {
      id: "id",
      name: "ID",
      width: 28,
    },
    {
      id: "name",
      name: "ФИО",
      width: 20,
    },
    {
      id: "roleDisplay",
      name: "Тип доступа",
      width: 15,
    },
    {
      id: "email",
      name: "E-mail пользователя",
      width: 20,
    },
    {
      id: "phone",
      name: "Телефон",
      width: 17,
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
