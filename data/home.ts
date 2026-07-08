type TextSegment = { text: string; accent?: boolean };

export const HOME = {
  hero: {
    title: "Дом бизнес-класса для ценителей роскоши",
  },
  about: {
    title: "О проекте",
    text1: [
      { text: "Уютное и безопасное пространство для счастливой, " },
      { text: "спокойной и размеренной жизни", accent: true },
    ] satisfies TextSegment[],
    text2: [
      {
        text: "Квартиры от 65 до 356 м² с чистовой отделкой,",
        accent: true,
      },
      {
        text: " балконами, лоджиями и террасами в собственной закрытой охраняемой территории.",
      },
    ] satisfies TextSegment[],
  },
  video: {
    label: "Видео о проекте",
  },
};
