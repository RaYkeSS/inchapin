import type { Route } from "next";

import { NAV_ROUTES } from "~/config/routes";

import { APARTMENTS } from "~/data/apartments";

type NavItem = { label: string; href: Route };
type ApartmentOption = { value: string; label: string; href: Route };

const NAV: NavItem[] = [
  { label: "Главная", href: NAV_ROUTES.home },
  { label: "О нас", href: NAV_ROUTES.about },
  { label: "Квартиры", href: NAV_ROUTES.apartments },
  { label: "Контакты", href: NAV_ROUTES.contacts },
  { label: "Ui Kit", href: NAV_ROUTES.uiKit },
];

const APARTMENT_OPTIONS: ApartmentOption[] = APARTMENTS.map((apt) => ({
  value: apt.slug,
  label: apt.label,
  href: apt.href,
}));

export const UI = {
  menu: {
    title: "Меню",
    burgerLabel: "Меню",
    nav: NAV,
  },
  header: {
    selectPlaceholder: "Выбрать квартиру",
    selectAriaLabel: "Выбрать квартиру",
    apartments: APARTMENT_OPTIONS,
    ctaButton: "Заказать звонок",
  },
  form: {
    modalTitle: "ЗАКАЗАТЬ ЗВОНОК",
    fields: {
      name: { label: "Ваше имя" },
      phone: { label: "Телефон" },
      email: { label: "E-mail" },
    },
    submit: "Отправить",
    submitting: "Отправка...",
    success: "Заявка отправлена. Мы свяжемся с вами в ближайшее время.",
    acceptance: {
      prefix:
        "Нажимая на кнопку «Отправить», вы ознакомлены и подтверждаете согласие с",
      linkLabel: "политикой обработки персональных данных",
      href: "#",
    },
  },
  notFound: {
    code: "404",
    title: "Страница не найдена",
    description:
      "Похоже, такой страницы не существует или она была перемещена.",
    button: "На главную",
  },
};
