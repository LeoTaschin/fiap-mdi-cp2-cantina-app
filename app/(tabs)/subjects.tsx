import React from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MENU_ITEMS } from '@/constants/menu';
import { useAppData } from '@/context/AppDataContext';
import { useTheme } from '@/context/ThemeContext';
import { Colors, FontSizes, Spacing, BorderRadius } from '@/constants/theme';

export default function OrdersScreen() {
  const { colors } = useTheme();
  const { cart, orders, cartTotal, removeFromCart, placeOrder, clearCart, loading } = useAppData();

  const cartItems = cart
    .map((item) => {
      const menuItem = MENU_ITEMS.find((menu) => menu.id === item.id);
      if (!menuItem) return null;
      return { ...menuItem, quantity: item.quantity };
    })
    .filter(Boolean) as Array<typeof MENU_ITEMS[number] & { quantity: number }>;

  const handleCheckout = () => {
    if (!cartItems.length) {
      Alert.alert('Carrinho vazio', 'Adicione itens antes de finalizar o pedido.');
      return;
    }

    placeOrder();
    Alert.alert('Pedido enviado', 'Seu pedido foi adicionado ao histórico da cantina.');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>Pedidos e Carrinho</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>Confira seus itens e finalize com segurança.</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loading} />
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <>
              <View style={[styles.section, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}> 
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Carrinho</Text>
                {cartItems.length === 0 ? (
                  <Text style={[styles.emptyText, { color: colors.icon }]}>Seu carrinho está vazio.</Text>
                ) : (
                  cartItems.map((item) => (
                    <View key={item.id} style={styles.cartItem}>
                      <View style={styles.cartItemInfo}>
                        <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
                        <Text style={[styles.itemDetail, { color: colors.icon }]}>Quantidade: {item.quantity}</Text>
                      </View>
                      <View style={styles.cartItemActions}>
                        <Text style={[styles.itemPrice, { color: colors.primary }]}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
                        <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
                          <MaterialCommunityIcons name="delete-outline" size={20} color={colors.error} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                )}
              </View>

              <View style={styles.footerButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: colors.primary }]}
                  onPress={handleCheckout}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.actionButtonText, { color: colors.background }]}>Finalizar pedido</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.secondaryButton, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
                  onPress={clearCart}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Limpar carrinho</Text>
                </TouchableOpacity>
              </View>
            </>
          }
          renderItem={({ item }) => (
            <View style={[styles.orderCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}> 
              <View style={styles.orderHeader}>
                <Text style={[styles.orderTitle, { color: colors.text }]}>Pedido #{item.id.slice(-4)}</Text>
                <Text style={[styles.orderDate, { color: colors.icon }]}>R$ {item.total.toFixed(2)}</Text>
              </View>
              <Text style={[styles.orderItems, { color: colors.icon }]}>Itens: {item.items.length}</Text>
              <Text style={[styles.orderDate, { color: colors.icon }]}>enviado em {new Date(item.createdAt).toLocaleDateString('pt-BR')}</Text>
            </View>
          )}
          ListFooterComponent={
            <View style={styles.historySection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Histórico de Pedidos</Text>
              {orders.length === 0 ? (
                <Text style={[styles.emptyText, { color: colors.icon }]}>Você ainda não fez nenhum pedido.</Text>
              ) : null}
            </View>
          }
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={orders.length === 0 ? null : undefined}
        />
      )}
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
  title: {
    fontSize: FontSizes['3xl'],
    fontWeight: '800',
  },
  subtitle: {
    fontSize: FontSizes.base,
    marginTop: Spacing.xs,
  },
  loading: {
    marginTop: Spacing['2xl'],
  },
  section: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: FontSizes.sm,
    marginTop: Spacing.sm,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
  },
  cartItemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: FontSizes.base,
    fontWeight: '700',
  },
  itemDetail: {
    fontSize: FontSizes.sm,
    marginTop: Spacing.xs,
  },
  cartItemActions: {
    alignItems: 'flex-end',
    marginLeft: Spacing.md,
  },
  itemPrice: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  removeButton: {
    padding: Spacing.xs,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  actionButton: {
    flex: 1,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  actionButtonText: {
    fontSize: FontSizes.base,
    fontWeight: '700',
  },
  secondaryButton: {
    flex: 1,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: FontSizes.base,
    fontWeight: '700',
  },
  orderCard: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  orderTitle: {
    fontSize: FontSizes.base,
    fontWeight: '700',
  },
  orderDate: {
    fontSize: FontSizes.sm,
  },
  orderItems: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs,
  },
  historySection: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing['2xl'],
  },
});
