# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## краткое описание

данный проект является страницей интернет-магазина с товарами для веб-разработчиков. в магазине можно посмотреть каталог товаров, добавить их в корзину и оформить заказ, перед этим выбрав способ оплаты и указав контактные данные.

## интерфейсы

IProductItem: интерфейс данных карточки, которые подтягиваются с сервера;
включает в себя
id: string - айди товара
description?: string - описание, появляется при открытии модального окна товара
image: string - картинка товара
title: string - название
category: string[] - категория, к которой относится товар (софт-скил, хард-скил, кнопка, дополнительное, другое)
price: number - цена

IAppState: интерфейс состояния для работы с элементами страницы;
catalog: IProductItem[] - массив объектов товаров
basket: string - содержит айди товаров в корзине
preview: string | null - содержит айди товара для просмотра
order: IOrder | null - содержит информацию о заказе

IOrder: интерфейс заказа;
items: string[] - содержит информацию о заказе

Payment: тип для указания способов оплаты 'онлайн' | 'при получении';

IOrderForm: интерфейс формы заказа;
payment: Payment - способ оплаты
address: string - адрес доставки

IContactForm: интерфейс формы заполнения контактов заказчика;
email: string - электронная почта заказчика
phone: string - его номер телефона

ISuccessfulOrder: интерфейс сообщения об успешном оформлении заказа;
id: string - айди заказа
total: number - сумма заказа

IBasket: интерфейс корзины покупок;
data: IProductItem[] - данные содержимого корзины (товары)
price: number - цена товаров в корзине

IBasketSum: интерфейс счетчика суммы заказов в корзине;
sum: number - сумма

## компоненты

Card - компонент карточки с товаром.

constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions): конструктор, принимает контейнер, в который будет рендериться компонент.
set id(value: string) - метод, устанавливает айди карточки.
get id(): string - получает айди карточки.
set title(value: string) - устанавливает название карточки.
get title(): string - получает название карточки.
set image(value: string) - устанавливает изображение карточки.
set category(value: string) - устанавливает категорию карточки.
set inBasket(value: boolean) - устанавливает состояние "в корзине" для карточки.
set price(value: string) - устанавливает цену карточки.
set description(value: string | string[]) - устанавливает описание карточки.

Modal - компонент модального окна.

constructor(container: HTMLElement, protected events: IEvents) - принимает контейнер модального окна и объект событий.
Методы:
set content(value: HTMLElement) - устанавливает содержимое модального окна.
open() - открывает модальное окно.
order() - запускает событие открытия заказа.
orderContacts() - запускает событие открытия контактов для заказа.
close() - закрывает модальное окно.
render(data: IModalData): HTMLElement - рендерит модальное окно.

Basket - компонент корзины товаров.

Конструктор:
constructor(container: HTMLElement, protected events: EventEmitter) - принимает контейнер корзины и объект событий.
Методы:
set items(items: HTMLElement[]) - устанавливает список товаров в корзине.
set selected(items: ProductItem[]) - устанавливает выбранные товары в корзине и включает/отключает кнопку оформления заказа в зависимости от наличия выбранных товаров.
set total(total: string) - устанавливает общую стоимость товаров в корзине.

Form - компонент формы.

Конструктор:
constructor(container: HTMLFormElement, events: IEvents) - принимает контейнер формы и объект событий.
Методы:
set valid(value: boolean) - устанавливает состояние валидности формы.
set errors(value: string) - устанавливает текст ошибки валидации формы.
render(state: Partial & IFormState) - отображает компонент формы и принимает состояние формы, включая валидность и ошибки валидации.

## базовый код

EventEmitter - класс выполняет роль презентера в системе MVP

Методы:
on<T extends object>(eventName: EventName, callback: (event: T) => void) - принимает событие и колбек функцию, если событие нет создает его.
off(eventName: EventName, callback: Subscriber) - принимает событие и колбек функцию, удаляет подписку на событие. Если подписки нет, удаляет событие.
emit<T extends object>(eventName: string, data?: T) - принимает событие и данные, инициирует событие с данными.
onAll(callback: (event: EmitterEvent) => void) - принимает колбек, подписывает на все событие.
offAll() - сбрасывает все обработчики.
trigger<T extends object>(eventName: string, context?: Partial<T>) - принимает событие, возвращает функцию триггера генерирующий событие при вызове.

Component - базовый компонент.

Методы класса:
protected constructor(protected readonly container: HTMLElement): конструктор класса, который принимает контейнер, в который будет рендериться компонент.
toggleClass(element: HTMLElement, className: string, force?: boolean): переключение класса элемента (отображение модальных окон).
protected setText(element: HTMLElement, value: unknown): установка текстового содержимого элемента.
setDisabled(element: HTMLElement, state: boolean): установка состояния блокировки элемента (кнопок при валидации).
protected setHidden(element: HTMLElement): скрыть элемент.
protected setVisible(element: HTMLElement): показать элемент.
setImage(element: HTMLImageElement, src: string, alt?: string): установка изображения и альтернативного текста.
render(data?: Partial<T>): HTMLElement - отображение компонента. Принимает данные в виде объекта типа T и возвращает корневой DOM-элемент.
