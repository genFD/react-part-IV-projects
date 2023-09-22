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
