import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
  ViewStyle,
} from 'react-native';
import { PRODUCT_TYPE } from '../../types';
import {
  card,
  border,
  selected,
  selectedBorder,
  muted,
  gray,
  text,
  textSecondary,
  warning,
  warningText,
  price as priceColor,
} from '../../theme';
import { Checkbox } from '../common';
import { ProductTags } from './ProductTags';

type Props = {
  product: PRODUCT_TYPE;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  searchQuery?: string;
  style?: ViewStyle;
};

const TypographyText = ({
  text,
  query,
  baseStyle,
  highlightStyle,
}: {
  text: string;
  query: string;
  baseStyle: any;
  highlightStyle: any;
}) => {
  const normalizedQuery = query.toLowerCase().trim();
  if (normalizedQuery.length < 3) {
    return (
      <Text style={baseStyle} numberOfLines={2}>
        {text}
      </Text>
    );
  }

  const index = text.toLowerCase().indexOf(normalizedQuery);
  if (index === -1) {
    return (
      <Text style={baseStyle} numberOfLines={2}>
        {text}
      </Text>
    );
  }

  return (
    <Text style={baseStyle} numberOfLines={2}>
      {text.slice(0, index)}
      <Text style={highlightStyle}>
        {text.slice(index, index + normalizedQuery.length)}
      </Text>
      {text.slice(index + normalizedQuery.length)}
    </Text>
  );
};

export const ProductCard = ({
  product,
  isSelected,
  onToggleSelect,
  searchQuery = '',
  style,
}: Props) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const onImageLoad = () => {
    setImageLoaded(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const onPress = () => onToggleSelect(product.id);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={style}>
      <View style={[styles.card, isSelected && styles.cardSelected]}>
        <View style={styles.imgContainer}>
          {!imageLoaded && !imageError && (
            <View style={styles.placeholder}>
              <ActivityIndicator size="small" color={gray} />
            </View>
          )}
          {imageError && (
            <View style={styles.placeholder}>
              <Text style={styles.errorText}>No Image</Text>
            </View>
          )}
          {!imageError && (
            <Animated.Image
              source={{ uri: product.image }}
              style={[styles.image, { opacity: fadeAnim }]}
              resizeMode="cover"
              onLoad={onImageLoad}
              onError={() => setImageError(true)}
            />
          )}
          <View style={styles.container}>
            <Checkbox checked={isSelected} onToggle={onPress} />
          </View>
        </View>

        <View style={styles.info}>
          <TypographyText
            text={product.title}
            query={searchQuery}
            baseStyle={styles.title}
            highlightStyle={styles.highlight}
          />
          <TypographyText
            text={product.description}
            query={searchQuery}
            baseStyle={styles.description}
            highlightStyle={styles.descriptionHighlight}
          />
          <Text style={styles.price}>{product.price.toFixed(2)} JD</Text>
          <ProductTags tags={product.tags} searchQuery={searchQuery} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: card,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: border,
    overflow: 'hidden',
  },
  cardSelected: { backgroundColor: selected, borderColor: selectedBorder },
  imgContainer: { width: 120, backgroundColor: muted },
  image: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  placeholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: muted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: { fontSize: 10, color: gray },
  container: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    padding: 2,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: { fontSize: 14, fontWeight: '600', color: text, marginBottom: 4 },
  highlight: { backgroundColor: warning, color: warningText },
  description: { fontSize: 12, color: textSecondary, marginBottom: 8 },
  descriptionHighlight: { backgroundColor: warning, color: warningText },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: priceColor,
    marginBottom: 8,
  },
});

export default ProductCard;
