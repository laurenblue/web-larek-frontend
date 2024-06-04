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

#### IProductItem

Интерфейс данных карточки, которые подтягиваются с сервера:

- `id: string` - айди товара
- `description?: string` - описание, появляется при открытии модального окна товара
- `image: string` - картинка товара
- `title: string` - название
- `category: string[]` - категория, к которой относится товар (софт-скил, хард-скил, кнопка, дополнительное, другое)
- `price: number` - цена

#### IAppState

Интерфейс состояния для работы с элементами страницы:

- `catalog: IProductItem[]` - массив объектов товаров
- `basket: string` - содержит айди товаров в корзине
- `preview: string | null` - содержит айди товара для просмотра
- `order: IOrder | null` - содержит информацию о заказе

#### IOrder

Интерфейс заказа:

- `items: string[]` - содержит информацию о заказе

#### Payment

Тип для указания способов оплаты: `'онлайн' | 'при получении'`

#### IOrderForm

Интерфейс формы заказа:

- `payment: Payment` - способ оплаты
- `address: string` - адрес доставки

#### IContactForm

Интерфейс формы заполнения контактов заказчика:

- `email: string` - электронная почта заказчика
- `phone: string` - его номер телефона

#### ISuccessfulOrder

Интерфейс сообщения об успешном оформлении заказа:

- `id: string` - айди заказа
- `total: number` - сумма заказа

#### IBasket

Интерфейс корзины покупок:

- `data: IProductItem[]` - данные содержимого корзины (товары)
- `price: number` - цена товаров в корзине

#### IBasketSum

Интерфейс счетчика суммы заказов в корзине:

- `sum: number` - сумма

### Компоненты

#### AppState

Класс управления состоянием проекта (списка карточек, корзины, заказов и форм). Наследуется от класса `Model`.

**Методы:**

- `setCatalog(catalog: IProductItem[]): void` - устанавливает список карточек.
- `setPreview(preview: string | null): void` - устанавливает предпросмотр карточек.

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

constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions)

Принимает контейнер, в который будет рендериться компонент.

**Методы класса:**

- `set id(value: string)` - метод, устанавливает айди карточки.
- `get id(): string` - получает айди карточки.
- `set title(value: string)` - устанавливает название карточки.
- `get title(): string` - получает название карточки.
- `set image(value: string)` - устанавливает изображение карточки.
- `set category(value: string)` - устанавливает категорию карточки.
- `set inBasket(value: boolean)` - устанавливает состояние "в корзине" для карточки.
- `set price(value: string)` - устанавливает цену карточки.
- `set description(value: string | string[])` - устанавливает описание карточки.

#### Api

Компонент для выполнения запросов к АПИ.

**Конструктор:**

constructor(baseURL: string, options: RequestInit)

Принимает два параметра `baseURL` (string), хранит базовую ссылку, и `options` (RequestInit), хранит настройки запроса с дополнительными заголовками.

**Методы класса:**

- `protected handleResponse(response: Response): Promise<object>` - Обрабатывает ответ от сервера. Возвращает Promise с результатом в формате JSON, если ответ успешен. В случае ошибки возвращает отклоненный Promise с текстом ошибки или статусом ответа.
- `get(uri: string): Promise<object>` - Выполняет GET-запрос по указанному URI относительно `baseUrl`. Возвращает Promise с результатом ответа.
- `post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - Выполняет запрос к серверу методом POST, PUT или DELETE в зависимости от параметра method.

#### Modal

Компонент модального окна. Наследуется от класса `Component`.

**Конструктор:**

constructor(container: HTMLElement, protected events: IEvents)

Принимает контейнер модального окна и объект событий.

**Методы класса:**

- `set content(value: HTMLElement)` - устанавливает содержимое модального окна.
- `open()` - открывает модальное окно.
- `order()` - запускает событие открытия заказа.
- `orderContacts()` - запускает событие открытия контактов для заказа.
- `close()` - закрывает модальное окно.
- `render(data: IModalData): HTMLElement` - рендерит модальное окно.

#### Basket

Компонент корзины товаров. Наследует класс `Component`.

**Конструктор:**

constructor(container: HTMLElement, protected events: EventEmitter)

Принимает контейнер корзины и объект событий.

**Методы класса:**

- `set items(items: HTMLElement[])` - устанавливает список товаров в корзине.
- `set selected(items: ProductItem[])` - устанавливает выбранные товары в корзине и включает/отключает кнопку оформления заказа в зависимости от наличия выбранных товаров.
- `set total(total: string)` - устанавливает общую стоимость товаров в корзине.

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

#### Order

Отображение модального окна заполнения адреса. Наследуется от класса `Form`.

**Конструктор:**

constructor(container: HTMLFormElement, events: IEvents)

**Методы:**

- `set payment(name: string)` - переключение между кнопками.
- `set address` - ввод адреса доставки.

#### Contacts

Отображение модального окна заполнения почты и телефона. Наследуется от класса `Form`.

**Конструктор:**

constructor(container: HTMLFormElement, events: IEvents)

**Методы:**

- `set phone` - ввод телефона.
- `set email` - ввод почты.

#### Success

Отображение модального удачного заказа. Наследуется от класса `Component`.

**Конструктор:**

constructor(container: HTMLElement, actions: ISuccessActions)

**Методы:**

- `set total` - устанавливает текст в элемент.

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
