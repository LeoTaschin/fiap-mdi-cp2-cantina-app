import React, { useMemo } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MENU_ITEMS } from '@/constants/menu';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Colors, FontSizes, Spacing, BorderRadius } from '@/constants/theme';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { cartQuantity, favorites, addToCart, toggleFavorite, isFavorite } = useAppData();
  const { user } = useAuth();

  const greeting = useMemo(() => {
    if (!user) return 'Bem-vindo(a)';
    return `Olá, ${user.fullName.split(' ')[0]}`;
  }, [user]);

  const renderItem = ({ item }: { item: typeof MENU_ITEMS[number] }) => {
    const favorite = isFavorite(item.id);

    return (
      <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}> 
        <View style={[styles.tag, { backgroundColor: item.color + '22' }]}>
          <Text style={[styles.tagText, { color: item.color }]}>{item.category}</Text>
        </View>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.price, { color: colors.primary }]}>R$ {item.price.toFixed(2)}</Text>
        </View>
        <Text style={[styles.cardDescription, { color: colors.icon }]}>{item.description}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.iconButton, { borderColor: colors.border }]}
            activeOpacity={0.7}
            onPress={() => toggleFavorite(item.id)}
          >
            <MaterialCommunityIcons
              name={favorite ? 'heart' : 'heart-outline'}
              size={22}
              color={favorite ? colors.error : colors.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            activeOpacity={0.8}
            onPress={() => addToCart(item.id)}
          >
            <Text style={[styles.addButtonText, { color: colors.background }]}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.primary }]}>{greeting}</Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>Aproveite seu lanche com praticidade.</Text>
        </View>
        <View style={styles.badgeGroup}>
          <View style={[styles.badge, { backgroundColor: colors.primary + '15' }]}>
            <MaterialCommunityIcons name="cart" size={16} color={colors.primary} />
            <Text style={[styles.badgeText, { color: colors.primary }]}>{cartQuantity} no carrinho</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: colors.secondary + '15' }]}>
            <MaterialCommunityIcons name="heart" size={16} color={colors.secondary} />
            <Text style={[styles.badgeText, { color: colors.secondary }]}>{favorites.length} favoritos</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={MENU_ITEMS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  greeting: {
    fontSize: FontSizes['3xl'],
    fontWeight: '800',
  },
  subtitle: {
    fontSize: FontSizes.base,
    marginTop: Spacing.xs,
  },
  badgeGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Spacing.md,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  badgeText: {
    marginLeft: Spacing.sm,
    fontWeight: '600',
    fontSize: FontSizes.sm,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  card: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  tag: {
    alignSelf: 'flex-start',
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  tagText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  cardTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    flex: 1,
    marginRight: Spacing.sm,
  },
  price: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  cardDescription: {
    fontSize: FontSizes.sm,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  addButton: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  addButtonText: {
    fontWeight: '700',
  },
});
