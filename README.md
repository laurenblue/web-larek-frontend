## Проектная работа "Веб-ларек"

### Стек:

HTML, SCSS, TS, Webpack

### Структура проекта:

- `src/` — исходные файлы проекта
- `src/components/` — папка с JS компонентами
- `src/components/base/` — папка с базовым кодом

### Важные файлы:

- `src/pages/index.html` — HTML-файл главной страницы
- `src/types/index.ts` — файл с типами
- `src/index.ts` — точка входа приложения
- `src/scss/styles.scss` — корневой файл стилей
- `src/utils/constants.ts` — файл с константами
- `src/utils/utils.ts` — файл с утилитами

### Установка и запуск

Для установки и запуска проекта необходимо выполнить команды:

```bash
npm install
npm run start
```

или

```bash
yarn
yarn start
```

### Сборка

```bash
npm run build
```

или

```bash
yarn build
```

### Краткое описание

Данный проект является страницей интернет-магазина с товарами для веб-разработчиков. В магазине можно посмотреть каталог товаров, добавить их в корзину и оформить заказ, выбрав способ оплаты и указав контактные данные.

### Интерфейсы

## IPage

Представляет страницу со списком HTML-элементов.

- `itemList: HTMLElement[]` - Список HTML-элементов на странице.

## IProduct

Представляет продукт с различными атрибутами.

- `category: string` - Категория продукта.
- `title: string` - Название продукта.
- `description: string` - Описание продукта.
- `image: string` - URL изображения продукта.
- `price: number` - Цена продукта.

## IProductItem

Представляет элемент продукта, полученный с сервера.

- `id: string` - Идентификатор продукта.
- `description: string` - Описание продукта, появляется в модальном окне.
- `image: string` - URL изображения продукта.
- `title: string` - Название продукта.
- `category: string` - Категория продукта.
- `price: number` - Цена продукта.

## IAppState

Представляет состояние для работы с элементами страницы.

- `itemList: IProductItem[]` - Массив объектов товаров.
- `basket: string` - Содержит идентификаторы товаров в корзине.
- `preview: string | null` - Содержит идентификатор товара для просмотра.
- `order: IOrder | null` - Содержит информацию о заказе.
- `formErrors: FormErrors` - Содержит ошибки формы.

## IProductPreview

Представляет предварительный просмотр продукта.

- `text: string` - Текст для предварительного просмотра продукта.

## IProductBasket

Представляет продукт в корзине.

- `index: number` - Индекс продукта в корзине.
- `title: string` - Название продукта.
- `price: number` - Цена продукта.

## IActions

Представляет действия, связанные с элементом.

- `onClick: (event: MouseEvent) => void` - Обработчик события клика.

## IBasket

Представляет корзину покупок.

- `items: HTMLElement[]` - Список товаров в корзине.
- `total: number` - Общая стоимость товаров в корзине.

## IValidation

Представляет результаты валидации.

- `valid: boolean` - Указывает, прошла ли валидация.
- `errors: string[]` - Список ошибок валидации.

## FormErrors

Представляет ошибки в форме, где ключи - это названия полей.

- `Partial<Record<keyof IOrder, string>>` - Соответствие названий полей сообщениям об ошибках.

## IOrderForm

Представляет форму заказа.

- `payment?: string` - Способ оплаты.
- `address?: string` - Адрес доставки.
- `phone?: string` - Телефон клиента.
- `email?: string` - Электронная почта клиента.
- `total?: string | number` - Общая сумма заказа.

## IOrder

Представляет заказ, расширяя форму заказа.

- `items: string[]` - Список идентификаторов товаров в заказе.

## ISuccess

Представляет успешную операцию.

- `total: number` - Общая сумма.

## ISuccessActions

Представляет действия для успешной операции.

- `onClick: () => void` - Обработчик события клика.

## IModalData

Представляет данные для модального окна.

- `content: HTMLElement` - Содержимое модального окна.

## ApiListResponse<Type>

Представляет ответ от API со списком элементов.

- `total: number` - Общее количество элементов.
- `items: Type[]` - Список элементов.

## ISuccessfulForm

Представляет успешную отправку формы.

- `id: string` - Идентификатор отправки формы.

### Компоненты

#### AppState

Класс управления состоянием проекта (списка карточек, корзины, заказов и форм). Наследуется от класса `Model`.

**Методы:**

- `setCatalog(items: IProductItem[]): void` - Устанавливает список карточек товаров.
- `setPreview(item: IProductItem): void` - Устанавливает предпросмотр карточки товара.
- `addToBasket(item: IProductItem): void` - Добавляет товар в корзину.
- `get basketList(): IProductItem[]` - Возвращает список товаров в корзине.
- `get isBasketEmpty(): boolean` - Проверяет, пуста ли корзина.
- `set total(value: number): void` - Устанавливает общую сумму заказа.
- `getTotal(): number` - Возвращает общую сумму товаров в корзине.
- `removeFromBasket(item: IProductItem): void` - Удаляет товар из корзины.
- `clearBasket(): void` - Очищает корзину.
- `setOrderField(field: keyof IOrderForm, value: string): void` - Устанавливает значение поля в заказе.
- `setContactsField(field: keyof IOrderForm, value: string): void` - Устанавливает значение поля в контактной информации.
- `validateOrder(): boolean` - Проверяет валидность данных заказа.
- `validateContacts(): boolean` - Проверяет валидность контактных данных.
- `clearOrder(): void` - Очищает данные заказа.

#### WebLarekApi

Класс отправляет информацию на сервер и возвращает ответ сервера. Наследуется от класса `Api`.

**Конструктор:**

constructor(cdn: string, baseUrl: string, options?: RequestInit)

**Методы класса:**

- `getCatalog(): Promise<IProductItem[]>` - получение списка всех карточек с сервера.
- `getProductItem(id: string): Promise<IProductItem>` - получение данных карточки по айди.
- `orderCard(order: IOrder): Promise<IOrderResult>` - возврат данных по заказу.

#### Card

Компонент карточки с товаром. Наследуется от класса `Component`.

**Конструктор:**

constructor(protected blockName: string, container: HTMLElement, actions?: IProductActions)

Принимает контейнер, в который будет рендериться компонент.

**Методы класса:**

- `set id(value: string)` - Устанавливает айди карточки.
- `get id(): string` - Получает айди карточки.
- `set title(value: string)` - Устанавливает название карточки.
- `get title(): string` - Получает название карточки.
- `set image(value: string)` - Устанавливает изображение карточки.
- `set category(value: string)` - Устанавливает категорию карточки.
- `set inBasket(value: boolean)` - Устанавливает состояние "в корзине" для карточки.
- `set price(value: string)` - Устанавливает цену карточки.
- `set description(value: string | string[])` - Устанавливает описание карточки.

### Api

Компонент для выполнения запросов к АПИ.

**Конструктор:**

constructor(baseURL: string, options: RequestInit)

Принимает два параметра `baseURL` (string), хранит базовую ссылку, и `options` (RequestInit), хранит настройки запроса с дополнительными заголовками.

**Методы класса:**

- `protected handleResponse(response: Response): Promise<object>` - Обрабатывает ответ от сервера. Возвращает Promise с результатом в формате JSON, если ответ успешен. В случае ошибки возвращает отклоненный Promise с текстом ошибки или статусом ответа.
- `get(uri: string): Promise<object>` - Выполняет GET-запрос по указанному URI относительно `baseUrl`. Возвращает Promise с результатом ответа.
- `post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - Выполняет запрос к серверу методом POST, PUT или DELETE в зависимости от параметра `method`. Возвращает Promise с результатом ответа.

**Типы:**

- `ApiListResponse<Type>` - Тип, представляющий ответ от сервера с массивом объектов.

- `ApiPostMethods` - Тип, представляющий методы запроса POST, PUT или DELETE.

### Modal

Компонент модального окна. Наследуется от класса `Component`.

**Конструктор:**

constructor(container: HTMLElement, protected events: IEvents)

Принимает контейнер модального окна и объект событий.

**Методы класса:**

- `set content(value: HTMLElement)` - Устанавливает содержимое модального окна.
- `open()` - Открывает модальное окно.
- `order()` - Запускает событие открытия заказа.
- `orderContacts()` - Запускает событие открытия контактов для заказа.
- `close()` - Закрывает модальное окно.
- `render(data: IModalData): HTMLElement` - Рендерит модальное окно.

### Basket

Компонент корзины товаров. Наследует класс `Component`.

**Конструктор:**

constructor(container: HTMLElement, protected events: EventEmitter)

Принимает контейнер корзины и объект событий.

**Методы класса:**

- `set items(items: HTMLElement[])` - Устанавливает список товаров в корзине.
- `set selected(items: ProductItem[])` - Устанавливает выбранные товары в корзине и включает/отключает кнопку оформления заказа в зависимости от наличия выбранных товаров.
- `set total(total: string)` - Устанавливает общую стоимость товаров в корзине.

#### Page

Отображение главной страницы. Наследуется от класса `Component`.

**Конструктор:**

constructor(container: HTMLElement, events: IEvents)

**Методы класса:**

- `set counter(value: number | null)` - изменить счетчик товара в корзине на главной странице.
- `set catalog(items: HTMLElement[])` - вывести список карточек.
- `set locked(value: boolean)` - установка или снятие блока прокрутки страницы.

#### Form

Компонент формы. Наследуется от класса `Component`. Имеет двух наследников `Order` и `Contacts`.

**Конструктор:**

constructor(container: HTMLFormElement, events: IEvents)

Принимает контейнер формы и объект событий.

**Методы:**

- `set valid(value: boolean)` - устанавливает состояние валидности формы.
- `set errors(value: string)` - устанавливает текст ошибки валидации формы.
- `render(state: Partial<IFormState>)` - отображает компонент формы и принимает состояние формы, включая валидность и ошибки валидации.

#### OrderForm

Отображение модального окна заполнения адреса. Наследуется от класса `Form`.

**Конструктор:**

constructor(container: HTMLFormElement, events: IEvents)

**Методы:**

- `set payment(name: string)` - переключение между кнопками.
- `set address` - ввод адреса доставки.

#### ContactForm

Отображение модального окна заполнения почты и телефона. Наследуется от класса `Form`.

**Конструктор:**

constructor(container: HTMLFormElement, events: IEvents)

**Методы:**

- `set phone` - ввод телефона.
- `set email` - ввод почты.

#### SuccessForm

Отображение модального удачного заказа. Наследуется от класса `Component`.

**Конструктор:**

constructor(container: HTMLElement, actions: ISuccessActions)

**Методы:**

- `set total(value: number | string)` - Устанавливает текст в элементе.

### Базовый код

#### EventEmitter

Класс выполняет роль презентера в системе MVP.

**Методы:**

- `on<T extends object>(eventName: EventName, callback: (event: T) => void)` - принимает событие и колбек функцию, если событие нет создает его.
- `off(eventName: EventName, callback: Subscriber)` - принимает событие и колбек функцию, удаляет подписку на событие. Если подписки нет, удаляет событие.
- `emit<T extends object>(eventName: string, data?: T)` - принимает событие и данные, инициирует событие с данными.
- `onAll(callback: (event: EmitterEvent) => void)` - принимает колбек, подписывает на все событие.
- `offAll()` -

сбрасывает все обработчики.

- `trigger<T extends object>(eventName: string, context?: Partial<T>)` - принимает событие, возвращает функцию триггера генерирующий событие при вызове.

#### Component

Базовый компонент для работы с DOM элементами. От него наследуют все классы отображения. Получает тип в виде дженерика: `Component<T>`.

**Конструктор:**

protected constructor(protected readonly container: HTMLElement)

Принимает контейнер, в который будет рендериться компонент.

**Методы класса:**

- `toggleClass(element: HTMLElement, className: string, force?: boolean)` - переключение класса элемента (отображение модальных окон).
- `protected setText(element: HTMLElement, value: unknown)` - установка текстового содержимого элемента.
- `setDisabled(element: HTMLElement, state: boolean)` - установка состояния блокировки элемента (кнопок при валидации).
- `protected setHidden(element: HTMLElement)` - скрыть элемент.
- `protected setVisible(element: HTMLElement)` - показать элемент.
- `setImage(element: HTMLImageElement, src: string, alt?: string)` - установка изображения и альтернативного текста.
- `render(data?: Partial<T>): HTMLElement` - отображение компонента. Принимает данные в виде объекта типа T и возвращает корневой DOM-элемент.

### События

#### Карточка

- `items:changed` - изменение продуктов в каталоге
- `card:select` - выбор карточки
- `card:add` - добавление карточки в корзину
- `card:remove` - удаление карточки из корзины
- `preview:changed` - открытие окна карточки

#### Корзина

- `basket:changed` - изменение корзины
- `counter:changed` - изменение счетчика
- `basket:open` - открытие модального окна корзины

#### Формы заказа

- `order:open` - открытие модального окна адреса доставки
- `payment:toggle` - изменение способа оплаты
- `/^order\..*:change/` - изменение поля формы доставки
- `order:submit` - отправка формы доставки
- `contacts:submit` - отправка формы контактов
- `formErrors:change` - списки ошибок

#### Модальное окно

- `modal:open` - открытие модального окна
- `modal:close` - закрытие модального окна
