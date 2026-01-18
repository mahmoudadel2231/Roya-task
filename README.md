# Roya Task - Product Catalog App

A React Native product catalog app with search, sorting, and multi-selection features.

## Features

- Browse products with lazy-loaded images
- Search products by name (min 3 characters)
- Sort by name or price (ascending/descending)
- Select multiple products with checkbox
- View product details (price, tags, description)

## Tech Stack

- React Native 0.83.1
- TypeScript
- react-native-vector-icons (Feather)
- react-native-safe-area-context

## Project Structure

```
src/
├── components/
│   ├── common/          # Button, Checkbox, SearchInput
│   └── product/         # ProductCard, ProductList, ProductTags
├── screens/
│   └── ProductListScreen.tsx
├── theme/
│   └── colors.ts
├── types/
│   └── product.types.ts
└── constants/
    └── products.data.ts
```

## Getting Started

### Install dependencies

```sh
npm install
```

### iOS Setup

```sh
cd ios && pod install && cd ..
```

### Run the app

```sh
# iOS
npm run ios

# Android
npm run android
```

## Screenshots

The app displays a product list with:
- Search bar at the top
- Sort button (toggles between name↑, name↓, price↑, price↓)
- Product cards with image, name, price, tags
- Selectable checkboxes for each product
