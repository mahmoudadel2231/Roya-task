import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { tag, tagHighlight, tagHighlightBorder, tagText, warningText } from '../../theme';

type Props = { tags: string[]; searchQuery?: string; style?: ViewStyle };

export const ProductTags = ({ tags, searchQuery = '', style }: Props) => {
  const q = searchQuery.toLowerCase().trim();
  const active = q.length >= 3;

  return (
    <View style={[styles.wrap, style]}>
      {tags.map(t => {
        const matched = active && t.toLowerCase().includes(q);
        return (
          <View key={t} style={[styles.tag, matched && styles.tagHl]}>
            <Text style={[styles.text, matched && styles.textHl]}>{t}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  tag: { backgroundColor: tag, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999 },
  tagHl: { backgroundColor: tagHighlight, borderWidth: 1, borderColor: tagHighlightBorder },
  text: { fontSize: 10, color: tagText, fontWeight: '500' },
  textHl: { color: warningText },
});

export default ProductTags;
