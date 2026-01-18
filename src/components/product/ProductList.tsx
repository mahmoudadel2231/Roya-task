import React from 'react';
import { FlatList, View, Text, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { PRODUCT_TYPE } from '../../types';
import { subtle, gray, grayDark } from '../../theme';
import { ProductCard } from './ProductCard';

type Props = {
  products: PRODUCT_TYPE[];
  selectedIds: number[];
  onToggleSelect: (id: number) => void;
  searchQuery?: string;
  numColumns?: number;
  style?: ViewStyle;
};

const Empty = ({ query }: { query: string }) => {
  const searching = query.trim().length >= 3;
  return (
    <View style={styles.empty}>
      <Icon
        name="search"
        size={48}
        color={subtle}
        style={{ opacity: 0.5, marginBottom: 16 }}
      />
      <Text style={styles.emptyTitle}>
        {searching ? 'No products found' : 'No products'}
      </Text>
      <Text style={styles.emptyText}>
        {searching ? 'Try different search terms' : 'All products deleted'}
      </Text>
    </View>
  );
};

export const ProductList = ({
  products,
  selectedIds,
  onToggleSelect,
  searchQuery = '',
  numColumns = 1,
  style,
}: Props) => (
  <FlatList
    data={products}
    keyExtractor={p => String(p.id)}
    numColumns={numColumns}
    key={numColumns}
    style={style}
    contentContainerStyle={{ paddingBottom: 32 }}
    ListEmptyComponent={<Empty query={searchQuery} />}
    renderItem={({ item, index }) => {
      const left = index % numColumns === 0;
      const margin =
        numColumns > 1
          ? { marginLeft: left ? 0 : 8, marginRight: left ? 8 : 0 }
          : {};
      return (
        <View style={[{ flex: 1, marginBottom: 16 }, margin]}>
          <ProductCard
            product={item}
            isSelected={selectedIds.includes(item.id)}
            onToggleSelect={onToggleSelect}
            searchQuery={searchQuery}
          />
        </View>
      );
    }}
  />
);

const styles = StyleSheet.create({
  empty: { alignItems: 'center', paddingVertical: 48 },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: grayDark,
    marginBottom: 4,
  },
  emptyText: { fontSize: 14, color: gray, textAlign: 'center' },
});

export default ProductList;
