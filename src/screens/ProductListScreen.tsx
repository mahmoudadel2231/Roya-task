import React, { useState, useMemo, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchInput, Button, ProductList } from '../components';
import { background } from '../theme';
import { SORT_ORDER, NEXT_SORT, PRODUCT_TYPE } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

const MIN_SEARCH_LENGTH = 3;

export const ProductListScreen = () => {
  const [products, setProducts] = useState<PRODUCT_TYPE[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortState, setSortState] = useState<SORT_ORDER>('none');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [screenSize, setScreenSize] = useState(Dimensions.get('window'));
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) =>
      setScreenSize(window),
    );
    return () => subscription?.remove();
  }, []);

  const isLandscape = screenSize.width > screenSize.height;
  const numColumns = isLandscape ? 2 : 1;

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query.length < MIN_SEARCH_LENGTH) return products;
    return products.filter(
      p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query)),
    );
  }, [products, searchQuery]);

  const sortedProducts = useMemo(() => {
    if (sortState === 'none') return filteredProducts;
    return [...filteredProducts].sort((a, b) =>
      sortState === 'asc' ? a.price - b.price : b.price - a.price,
    );
  }, [filteredProducts, sortState]);

  const visibleProducts = sortedProducts.map(p => p.id);

  const isAllSelected =
    visibleProducts.length > 0 &&
    visibleProducts.every(id => selectedIds.includes(id));

  const remainingChars = Math.max(
    0,
    MIN_SEARCH_LENGTH - searchQuery.trim().length,
  );

  const toggletSelection = (id: number) => {
    setSelectedIds(currentIds => {
      if (currentIds.includes(id)) {
        return currentIds.filter(i => i !== id);
      } else {
        return [...currentIds, id];
      }
    });
  };

  const toggleAllSelection = () => {
    setSelectedIds(isAllSelected ? [] : visibleProducts);
  };

  const deleteSelected = () => {
    setProducts(currentProducts =>
      currentProducts.filter(p => !selectedIds.includes(p.id)),
    );
    setSelectedIds([]);
  };

  const sortingLabel =
    sortState === 'asc'
      ? 'Price: Low to High'
      : sortState === 'desc'
      ? 'Price: High to Low'
      : 'Sort by Price';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
        <View style={styles.controlsContainer}>
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={() => setSearchQuery('')}
            remainingChars={remainingChars}
            style={styles.searchInput}
          />

          <View style={styles.buttonsRow}>
            <Button
              title={sortingLabel}
              onPress={() => setSortState(NEXT_SORT(sortState))}
              variant={sortState !== 'none' ? 'primary' : 'secondary'}
            />
            <Button
              title={isAllSelected ? 'Deselect All' : 'Select All'}
              onPress={toggleAllSelection}
              variant="secondary"
              disabled={sortedProducts.length === 0}
            />
            {selectedIds.length > 0 && (
              <Button
                title={`Delete Selected (${selectedIds.length})`}
                onPress={deleteSelected}
                variant="danger"
                disabled={selectedIds.length === 0}
              />
            )}
          </View>
        </View>

        <ProductList
          products={sortedProducts}
          selectedIds={selectedIds}
          onToggleSelect={toggletSelection}
          searchQuery={searchQuery}
          numColumns={numColumns}
          style={styles.productList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: background },
  contentContainer: { flex: 1, padding: 16 },
  controlsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: { marginBottom: 16 },
  buttonsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  productList: { flex: 1 },
});

export default ProductListScreen;
