# Application Planning, React Router, React Router data loading, Redux, Redux Toolkit, Thunks, Tailwind CSS

## Screenshots

![Sccht](./completed/src/assets/appscreenshots.png)

## Table of contents

- [Application planning](#application-planning)
- [Guidelines](#how-do-you-plan-and-build-a-professional-react-application)
- [Planning Pizza and co](#how-to-apply-these-guidelines-to-our-application)
- [Application Building](#application-planning)

## Application Planning

### _How do you plan and build a professional react application?_

The overarching goal with this application is to **allow users to order pizzas and get them delivered** to their home.

We'll assume the **backend API** is already built, so our job is to build the **frontend**.

From earlier lessons, we learnt that to build a react app we should always :

1. Break the UI into **components**
2. Build a **static** version (no state yet)
3. Think about **state management + data flow**

This works well for small applications. However we need to expand this idea for a large application. Here are the steps we will follow :

1. Gather the application **requirements and features**
2. Based on the information from the first step, **divide the application into pages**:

   - Think about the overall and page-level UI
   - Break the desired UI into components
   - Design and build the static version

3. Divide the application features into **categories**

   - Think about **state management + data flow**

4. Decide which **libraries** to use

### _How to apply these guidelines to our application?_

**Step 1** : gathering the business requirements

**what does the business expect from the application?** :

- A very simple application where users can **order pizzas from a menu**
- This application does not require any authentication, no users accounts and no login : **users just input their names before using the app**
- The pizza menu can change, so it **should be loaded from an API** (this part is already done!)
- Users can add multiple pizzas to a **cart** before ordering
- Ordering requires the user's **name, address and phone number**
- if possible the **GPS location** should be provided to make delivery easier
- Users can **mark their order as priority for an additionnal 20% of the price**
- Orders are made by sending a POST request with the order data(user data + selected pizzas) to the API
- Payments are made on delivery, **no payment processing** is necessary
- Once an order is placed, each **order will get an unique ID** that should be displayed so the **user can look up their order based on the ID**
- Users should be able to mark their order as priority **even after it has been placed**

**Step 2 and 3** : dividing the application into pages and features categories

From the first step we understand that we can divide the **features into four categories** :

1. Features related to the **USER**
2. Features related to the **MENU**
3. Features related to the **CART**
4. Features related to the **ORDER**

From the first step we also understand that we can divide the **application into four pages** :

1. **HOMEPAGE** where users can enter their name to place an order : `/`
2. **PIZZA MENU** where users can see the list of pizzas: `/menu`
3. **CART** where users can add or remove pizza to the cart : `/cart`
4. **PLACE A NEW ORDER** where users can place their order: `/order/new`
5. **LOOKING UP A NEW ORDER** where users can look up an order: `/order/:orderID`

**Step 3 and 4** : state management and technologies choices

Based on our four features categories, we can divide the state into four slices(state domains):

1. **USER**
2. **MENU**
3. **CART**
4. **ORDER**

The way we will manage each slice will depend on the **type of state** :

- User will be **global UI** state because the user information will need to be accesible to all the components in the tree and the data are not fetched from an API.
- Menu will be **global remote state** because the list of pizzas will be fetched from an API
- Cart will be **global UI state** state because the cart information will need to be accesible to all the components in the tree and the data are not fetched from an API.
- Order will be **global remote state** because the order will be posted to an API and also fetched from an API.

As far as technology decisions :

- for routing we will use **React Router**
- for styling we will use **Tailwind CSS**
- for global remote state we will use **React Router**. This allows us to implement a so called **render as you fetch** approach instead of **fetch on render**
- for global UI state we will use **Redux**

## Application Building

### Folders structure

The traditional structure works great for smaller projects.

Below is a sample of what a traditional structure may look like:
![traditional-folder-structure](./completed/assets/traditional-folder-structure.png)

Unfortunately, as your project grows the traditional structure falls apart. Over time code becomes harder to find, the project is harder to maintain, and there is a lot of scrolling around the project to change code for a single feature. This is where the concept of **feature folders** come in handy.

This structure gives stronger guidelines to organizing projects into several folders with each folder representing a single feature.

If you’re interested in reading more about best practices to structure and organize a React application, I recommend this [article](https://profy.dev/article/react-folder-structure#prototype-group-by-file-types).

Let's reorganize our folders structure :

![folder-structure](./completed/assets/folders-s.png)

- In the **src/** folder we created a folder called **features/**.
- We created a folder for each feature category : **user/**, **menu/**, **cart/** and **order/**
- For reusable components (buttons, inputs etc..) : **ui/**
- For API interactions : **api/**
- For reusable helper functions(number or currerncy manipulation, dates etc...) : **utils/**

To speed up the process, we've already created some components and pre-written the code for the helpers functions and API interactions.
We've also moved them into their appropriate folders.

### React router with data loading (V6.4+)

#### Implementing Routes

Let's install react router by running this command :

```sh
npm i react-router-dom
```

In **app.jsx**, we can start by importing `createBrowserRouter()` function from `react-router-dom`

```jsx
import { createBrowserRouter } from 'react-router-dom'
```

As the [documentation](https://reactrouter.com/en/main/routers/create-browser-router) suggests `createBrowserRouter()` takes an array of Route objects with nested routes on the children property.
We can use `createBrowserRouter()` like so:

```jsx
createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/menu',
    element: <Menu />,
  },
])
```

To use it, we can first save the result of calling `createBrowserRouter()` in a variable called `router` :

```jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/menu',
    element: <Menu />,
  },
])
```

and then inside the **App** component, we can use the router like so:

```jsx
function App() {
  return <RouterProvider router={router} />
}
```

if we open up the browser, we should be able to navigate between the pages.

To recap, in the new React Router v6, if we want to use the new powerful apis like `data loaders`, `data actions` or `data fetchers` we need to create a new router using the syntax above (specifying an array of objects where each object represent a route) and we pass that router as a prop to the `<ReactRouterProvider/>` component.

#### Building the app layout

The idea is to create a layout that would work on both small and large screens.
The `<Header/>` will always be visible

- Still in the **UI** folder we'll create a file called **Header.jsx** and add this in the file:

```jsx
function Header() {
  return (
    <header>
      <Link to="/">Fast React Pizza Co.</Link>
      <p>Username</p>
    </header>
  )
}

export default Header
```

- In the **UI** folder, we'll create a file called **AppLayout.jsx**, import the `<Header/>` and `<CartOverview/>` components and add this inside :

```jsx
function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <h1>Content</h1>
      </main>

      <CartOverview />
    </div>
  )
}
```

_How can we connect the `<AppLayout />` with all others components?_

The idea is that we want all other routes to be **nested** inside `<AppLayout/>`.

In the `<App/>` component, we want to add this :

```jsx
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
      },
    ],
  },
])
```

We created a route for `<AppLayout>` with only one property `children` whose value is an array of all other routes. We nested all other routes inside `<AppLayout/>`
If we open up the browser we should see something like this :

![router link](./completed/assets/link-router.png)

_the `<Outlet/>` component_

To render the nested routes content inside the parent route, we need to use the `<Outlet/>` component from `react-router-dom`. We can modify the `<AppLayout>` component like this :

```jsx
import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  )
}
```

With this in place we should be able to navigate between our routes like so :

![routes](<./completed/assets/ezgif.com-video-to-gif(1).gif>)

#### Fetching data with react router loader

The idea is to have a function somewhere in our code that fetches data from an API. We then provide that loader function to one of our routes and that route will get the data on first render.

Let's try and implement this, starting with the menu data. We can achieve this by following these 3 steps :

1. Create a loader function
2. Provide the loader to a route
3. Access the data

- Inside `<Menu/>` component, let's create a loader function:

```jsx
export async function loader() {
  const menu = await getMenu()
  return menu
}
```

The loader is just a wrapper around the `getMenu()` function which is available inside the **api** folder.

- Inside the `<App/>` component, let's provide the loader to the `<Menu/>` route:

```jsx
import Menu, { loader as MenuLoader } from './features/menu/Menu'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      ...
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
      },
    ...
    ]
  },
])
```

Notice how we've imported the loader using an alias. This is because we want to avoid name collision with other loaders.

Also in the menu route object we added another property called `loader` and passed in `menuLoader` as the value.

- To access the data, we can use a custom hook called `useLoaderData` from `react-router-dom`. Inside `<Menu/>` component we can add this:

```jsx
function Menu() {
  const menu = useLoaderData()
  return <h1>Menu</h1>
}
```

Under the hood, a new `fetch` request is fired off automatically as soon as we access the `<Menu/>` component in the browser. This is the so called `fetch-as-render` strategy. The difference between this approach and the `fetch-on-render` approach using `useEffect()` is that with `useEffect()`, we render the component first and then when the component is fully rendered we then fetch the data from the server (`data loading waterfalls`). With the `fetch-as-render` strategy, the `rendering` and the `fetching` happen at the same time

With this in place, we've successfully connected the loader with the `<Menu/>` component. All we need to do is to create a list with the data received from the server.

```jsx
function Menu() {
  const menu = useLoaderData()

  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  )
}
```

if we open up the browser we should be able to see the list like so :

![List](./completed/assets/list-pizza.gif)

#### Displaying a loading indicator

The `useNavigation()` hook from `react-router-dom` gives returns an object with a property called `state`.
The `state` property could either be `loading` or `idle` or `submitting`. We will use that information to display the loading indicator.

In the `<App>` component we can add this :

```jsx
function AppLayout() {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'
  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  )
}
```

- We called `useNavigation()` and saved it in the constant navigation
- Created the constant loading and saved the state
- Imported a component called `<Loader/>` that we created in in the **UI** folder
- conditionnally render `<Loader/>` if isLoading is true.

#### Handling errors with Error element

In the App component we can add this :

```jsx
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      ...
    ],
  },
])
```

- We've imported the `<Error/>` component from **UI** folder.
- Passed the the `<Error/>` component as a value of errorElement property.

if we try and navigate to a page that doesn't exist, we should get a page like this :

![error](./completed/assets/error.png)

We can access the error object and subsequently the error message by using the `useRouteError()` hook like this :

```jsx
function Error() {
  const navigate = useNavigate()
  const error = useRouteError()

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  )
}
```

- we created the constant error to save the error object
- we rendered the error message in the return statement

if we try and create an artificial loading error, we should be able to see a message like this :

![error](./completed/assets/loading-error.png)

Because we want the `<Error/>` component to appear within the layout, we would modify the `<App/>` component like so:

```jsx
const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
     {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
    }
      ...
    ],
  },
])
```

#### Fetching orders

The idea is to be able to read the order's id and display all the data about it on the order page. The first thing we need to do is to implement a way to search for an order. Essentialy, we want a search field in the header so that we can access the search functionality everywhere in our application.

In the **features/orders** folder, we will create a component called **SearchOrder** and add this inside :

```jsx
function SearchOrder() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query) return
    navigate(`order/${query}`)
    setQuery('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
      />
    </form>
  )
}
```

- We've created a state variable `query` to capture the user's input
- Inside the submit handler we used the `useNavigate()` hook to navigate programmatically to the order's page

Now using the `getOrder()` function in the **apiRestaurant** file, we can fetch the order just like we did in for the `<Menu>` component using `fetch-as-render` strategy.

_How can we read the id from the link and pass it to our loader function?_

We cannot use the `useParams()` hook because we can only use it in a component.
Thankfully the react router team thought of this scenario. The loader function can receive an object from which we can extract the params object. Our id parameter is defined like so `path: '/order/:orderId'`, so we can read the id using the `orderId` property :

```jsx
export async function loader({ params }) {
  const order = await getOrder(params.orderId)
  return order
}
```

As we did in the `<Menu/>` component, we can use the `useLoaderData()` hook to access the data :

```jsx
function Order() {
  const order = useLoaderData()
  return ...
}
```

And now we can connect the `loader()` function to the route like so in the `<App/>` component like so :

```jsx
const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      ...,
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
      },
    ],
  },
])
```

We've also added the error element in case there's any problem while fetching the order.

If we open up the browser and try to search the order id `CQE92U` we should be able to navigate the order's page and see all the data about that order :

![orderID](./completed/assets/searchorder.gif)

#### Writing data with React router `Actions`

[The react router docs](https://reactrouter.com/en/main/route/action) define actions as the "writes" to route loader "reads". In other words, actions allow us to make `POST`, `PUT`, `DELETE` etc.. requests. They provide a way for apps to perform data mutations.

_How to create an order using actions?_

In the `<CreateOrder/>` component, we can add this :

```jsx
//CreateOrder.jsx
function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <button>Order now</button>
        </div>
      </Form>
    </div>
  )
}

export async function action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  console.log(data)
  return null
}

//App.jsx
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
     ...,
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
      },

    ],
  },
])
```

- We imported the `<Form/>` component from `react-router-dom` and wrapped our inputs inside.

- Used the method prop and pass it the value `POST` to make a post request

- Created an action that will intercept the "create order" request as soon as the form is submitted. The action function accept an object from which we can extract the `request` object that contains the form data.

- To connect the action function in the `<CreateOrder/>` component to the route in the `<App/>` component, we've imported the `action()` function and pass it action property of the `createOrder` route. With this in place, whenever there will be a new form submission on this path `order/new` then the action will be executed

if we open the browser and submit the form, we should see the form data printed in the console:

![orderID](./completed/assets/searchorder.gif)

Notice how :

- We did not have to create a submit handler
- We did not have to create a state variable for each of input fiedl
- we did not have to create a loading state

Next up, we also want to get access to the cart data in the `action()` function. For now, we're going to use an hidden `<input/>` field so that the data will be sent during the form submission. Later on we will use `redux` to manage the state cart appropriately.
In the `<CreateOrder/>` component, we can add this :

```jsx
function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST">
        ...
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button>Order now</button>
        </div>
      </Form>
    </div>
  )
}

...

export async function action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  }
  console.log(order)
  createOrder(order)
  return null
}
```

- We added an input field with type `hidden` and value `cart` transformed into string because the the value prop expects a string as an a value.
- In the action function, we created an order object which will serve as container for the data we getting from the form.
- With this in place, we have the data in a shape that's much easier to manage but more importanty in a data type that's expected by the `createOrder()` function call.
- As soon as the order is created, we also want to redirect the user to the new order's page. This why we used the function `redirect()` from `rect-router-dom` and passed in the path to the order's page.

if we open the browser and create an order, we should be redirected to the order's page with all the information about the order :

![orderID](./completed/assets/neworderredirect.gif)

To recap :

- Using the react router `<Form>` component, we were able to capture the data submitted by the user
- The data is then intercepted by the action function which performs a post request to create a new order but it is also connected to the `CreateOrder` component in its route definition.
- As soon as the user clicks on the `order now` button, the action function is executed, the user gets redirected to the new order's page populated with the data submitted using the form.

#### Error handling in form actions

The first thing we want to do is to disable the `order now` button when the user clicks on it. Once again we will use the The `useNavigation()` hook from `react-router-dom` to check if the application is in a "_submitting_" state. We will use that information to disable the button.

In the `CreateOrder.jsx` component, let's add the following :

```jsx
function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    ...
    <button disabled={isSubmitting}>{isSubmitting ? 'Placing order...' : 'Order now'}</button>
  )
}
```

- `useNavigation()` returns an object with the current navigation, defaulting to an "idle" navigation when no navigation is in progress.

- the state property can have three values : `"idle" | "loading" | "submitting"`. In our case, we're checking if the state navigation is in "submitting" state, if it's `true`, we saved the boolean value in the variable `isSubmitting`

- In the return statement, we used the `disabled` attribute on the `button` element to disable the button if `isSubmitting` has a truthy value. Also, the text content will switch between "placing order..." and "Order now" depending on the value of `isSubmitting`.

Let's make a test in the browser:

![test-disable-button](./completed/assets/testing-place-order.gif)

_How to handle errors during form submission?_

For example, with the current form, it's possible to submit a text as a phone number. How do we prevent this from happening?
We can modify our `action` function as following :

```jsx
export async function action({ request }) {
 ...
  const errors = {}
  if (!isValidPhone(order.phone))
    errors.phone = 'Please enter a valid phone. We might need it to contact you'
  if (Object.keys.length > 0) return errors

  // if everything is ok, create new order and redirect
  ...
}
```

- We created an `errors` object to store any errors that could occur during the form submission
- We used the pre-defined `isValidPhone()` (can be found [here](https://uibakery.io/regex-library/phone-number)) which is a function that expects a phone number as an argument and returns true or false if the phone number is valid using regular expression.
- In our example, we're checking if the phone number is not valid and if that is the case, we are adding a new property `phone` to the `errors` object and assigned to it the message 'Please enter a valid phone. We might need it to contact you'
- On the next line, if the length of the object is greater than zero, which means that we have at least one error, then we will return the `errors` object.

The goal here is to be able read the `errors` object from the `CreateOrder` component. To accomplish this, we will use another hooh provided by the `react-router-dom` library, called :
`useActionData()`. Remember, the action function `createOrderAction()` is connected to `CreateOrder` in the component route definition :

```jsx
//CreateOrder.jsx


//app.jsx
import ... { action as createOrderAction } from './features/order/CreateOrder'
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      ...{
        path: '/order/new',
        element: <CreateOrder />,
        **************************
        action: createOrderAction,
        **************************
      },
    ],
  },
])
```

so to access the data from the component, we can just add the following :

```jsx
//CreateOrder.jsx
```

The `useActionData()` hook will return some data including the `errors` object that contains all the errors messages that we can display in the user interface like so:

```jsx
function CreateOrder() {
  ...
   **********************************
  const formErrors = useActionData()
   **********************************

  ...
  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST">
        ...
        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
          **********************************
          {formErrors?.phone && <p className="text-red">{formErrors.phone}</p>}
          ***********************************
        </div>
        ...
      </Form>
    </div>
  )
}
```

Let's test this in the browser :

![test-error](./completed/assets/test-error.gif)

We can see that if we try and enter some text in the phone input field, we get back the error message.

That's it for react router data loading. At this point, we know how :

- we can fetch data using loaders (data fetching)
- we can write date using actions (data mutation)

these are the two most important concepts in the new react-router. In the next section we will apply some style to our application using the super popular library `Tailwind CSS`

### Styling the App with Tailwindd CSS

#### What is Tailwindd CSS?

As always, let's start this section by understanding the technology that we are going to be using. Here is the definition found on the tailwind website:

> _A utility-first CSS framework packed with classes ... that can be composed to build any design, directly in your markup_.

_What is utility-first approach?_

The utility-first approach is about writing tiny classes with one single purpose like _flex_ or _text-center_ and then combining them to build an entire layout.
In tailwind, all these classes are written for us.

Here are some pros and cons to this approach:

Pros:

- We don't have to worry about class names
- We don't have to jump between files to write markup and styles
- It makes our UI looks better and more consistent
- It helps us to save a lot of time

Cons:

- Markup looks unreadable with lots of classes
- You will have to learn a lot of class names
- You

#### Setting up Tailwind CSS?

- In the command line, let's execute this command :

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- We can then configure our template paths in `tailwind.config.js`:

```js
//tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- finally let's add the Tailwind directives to our CSS file

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Working with tailwind css

All the classnames used to style our user interface are available in the docs.
Check out this [commit](https://github.com/genFD/react-part-IV-projects/commit/2b19abfeccf8ce44296dbddd38d9a943a2418028) to copy the classes for our components.

### Adding Redux and advanced React Router

#### Setting up and connecting redux to our application

As discussed in the "Application Planning" section, we will use Redux for our global state (user and cart state). But before we jump into it, let's take look at our list of requirement :

> ✅ The pizza menu can change, so it **should be loaded from an API** (this part is already done!)

> ✅ Once an order is placed, each **order will get an unique ID** that should be displayed so the **user can look up their order based on the ID** ✅

- A very simple application where users can **order pizzas from a menu**
- This application does not require any authentication, no users accounts and no login : **users just input their names before using the app**
- Users can add multiple pizzas to a **cart** before ordering
- Ordering requires the user's **name, address and phone number**
- if possible the **GPS location** should be provided to make delivery easier
- Users can **mark their order as priority for an additionnal 20% of the price**
- Orders are made by sending a POST request with the order data(user data + selected pizzas) to the API
- Payments are made on delivery, **no payment processing** is necessary
- Users should be able to mark their order as priority **even after it has been placed**

We've already implemented two features, let's move on to the user state.
We've decided that user state will be global because the user information **will need to be accesible to all the components in the tree and the data are not fetched from an API**.

let's start by running this command :

```sh
npm i @reduxjs/toolkit react-redux
```

In the **userSlice.js** file, we can add the following:

```js
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  userName: '',
}
const reducers = {
  updateName: (state, action) => {
    state.username = action.payload
  },
}

const option = {
  name: 'user',
  initialState,
  reducers,
}
const userSlice = createSlice(option)
export const { updateName } = userSlice.actions

export default userSlice.reducer
```

- The call to `createSlice(option)` will create a slice of the global state named `user`, the `initialState` and the reducer which is function that's responsible for updating the `initialState` object.

- As a reminder, the reducer function takes two parameters `state` and `action` and returns the new state. In our example, we set the username to the data received from `action.payload`.

- Inside `userSlice.actions` we have access to the action creator `updateName` that we've exported immediately so that we can use it in our form. We've also exported the reducer function.

In the **src/** folder, we created a file `store.js` where we can configure our store like this :

```js
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'

const option = {
  reducers: {
    user: userReducer,
  },
}

const store = configureStore(option)
export default store
```

To provide the global state to our application we can add this in the **main.jsx** file:

```jsx
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
```

and with that, we have added `redux` to our application.

In **feature/user/userName.jsx/** we can access our `userName` state by using the `useSelector()` hook and display it in the UI.

```jsx
function Username() {
  const username = useSelector((state) => state.user.userName)
  if (!username) return null
  return <div className="hidden text-sm font-semibold md:block">{username}</div>
}
```

![uiusername](./completed/src/assets/appscreenshots.png)

#### Reading and updating the state

One of the requirement of our application is that users should be able to just input their names before using the app. To achieve this in **feature/user/createUser.jsx/** we can add this to update our user state :

```jsx
function CreateUser() {
  const [username, setUsername] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function handleSubmit(e) {
    e.preventDefault()
    if (!username) return
    dispatch(updateName(username))
    setUsername('')
    navigate('/menu')
  }
}
```

- It's not a good practice to connect the redux store directly to the input, that's the reason why we creatd a local `username` state, to save the value entered by the user.

- When the user submit the form, we dispatched the `updateName()` action creator to update the store with the value saved in the local state : `dispatch(updateName(username))` and redirect the user back to the menu : `navigate('/menu')`.

![userName appear on home page and redirect to menu](./completed/src/assets/appscreenshots.png)

- Also, we want to conditionnally rendered the form only if there's no user in the redux store. This is why in the **ui/home.jsx** we added this :

```jsx
function Home() {
  const username = useSelector((state) => state.user.userName) // read username from redux store
  return (
    <div className="my-10 px-4 text-center sm:my-16 ">
      ...
      {username === '' ? ( // conditionally rendered CreateUser or Button
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue ordering, {username}
        </Button>
      )}
    </div>
  )
}
```

- We also need to read the `username` in the cart :

```jsx
//Cart.jsx
function Cart() {
  const cart = fakeCart
  const username = useSelector((state) => state.user.userName)

  return (
    <div className=" px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className=" mt-7 text-xl font-semibold">Your cart,{username}</h2>
      ...
    </div>
  )
}
```

- and finally in `CreateOrder.jsx` component :

```jsx
function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const username = useSelector((state) => state.user.userName)
  ...

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className=" mb-5 flex flex-col gap-2  sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            defaultValue={username}
            className="input grow"
            type="text"
            name="customer"
            required
          />
        </div>
        ...
  )
}
```

- Notice how we used the default value prop for the username input. This is because we want to be able to override the value of the input field. The default value prop allows us to set a default value for the input field that we can change unlike a controlled element.

Let's try this in the browser :
