import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useAppData } from '@/context/AppDataContext';
import { useTheme } from '@/context/ThemeContext';
import { Colors, FontSizes, Spacing, BorderRadius } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { orders, cartQuantity, favorites } = useAppData();
  const { theme, toggleTheme, colors } = useTheme();

  const handleLogout = async () => {
    Alert.alert('Sair', 'Tem certeza que deseja encerrar a sessão?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => logout() },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.profileHeader, { backgroundColor: colors.primary }]}> 
          <View style={[styles.avatar, { backgroundColor: colors.background }]}> 
            <MaterialCommunityIcons name="food" size={36} color={colors.primary} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.background }]}>{user?.fullName ?? 'Visitante'}</Text>
            <Text style={[styles.profileEmail, { color: colors.background }]}>{user?.email ?? 'Faça login para continuar'}</Text>
            <Text style={[styles.profileRole, { color: colors.background }]}>Equipe FIAP Cantina</Text>
          </View>
        </View>

        <View style={[styles.statsSection, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}> 
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Atividades</Text>
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: colors.primary + '15' }]}>
              <Text style={[styles.statLabel, { color: colors.text }]}>Pedidos</Text>
              <Text style={[styles.statValue, { color: colors.primary }]}>{orders.length}</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.secondary + '15' }]}>
              <Text style={[styles.statLabel, { color: colors.text }]}>No carrinho</Text>
              <Text style={[styles.statValue, { color: colors.secondary }]}>{cartQuantity}</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.success + '15' }]}>
              <Text style={[styles.statLabel, { color: colors.text }]}>Favoritos</Text>
              <Text style={[styles.statValue, { color: colors.success }]}>{favorites.length}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.settingsSection, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}> 
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferências</Text>
          <View style={styles.settingRow}>
            <View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Modo escuro</Text>
              <Text style={[styles.settingDescription, { color: colors.icon }]}>Ative o tema escuro do aplicativo.</Text>
            </View>
            <Switch
              value={theme === 'dark'}
              onValueChange={() => toggleTheme()}
              thumbColor={theme === 'dark' ? colors.primary : colors.background}
              trackColor={{ false: colors.border, true: colors.primary + '60' }}
            />
          </View>
        </View>

        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: colors.error }]} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={[styles.logoutLabel, { color: colors.background }]}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomLeftRadius: BorderRadius['2xl'] ?? 24,
    borderBottomRightRadius: BorderRadius['2xl'] ?? 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.lg,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: FontSizes['2xl'],
    fontWeight: '800',
    marginBottom: Spacing.xs,
  },
  profileEmail: {
    fontSize: FontSizes.sm,
  },
  profileRole: {
    fontSize: FontSizes.sm,
    marginTop: Spacing.xs,
    opacity: 0.9,
  },
  statsSection: {
    marginTop: -Spacing.xl,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginRight: Spacing.sm,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs,
  },
  statValue: {
    fontSize: FontSizes['2xl'],
    fontWeight: '800',
  },
  settingsSection: {
    marginTop: Spacing.lg,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    padding: Spacing.lg,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: FontSizes.base,
    fontWeight: '700',
  },
  settingDescription: {
    fontSize: FontSizes.sm,
    marginTop: Spacing.xs,
  },
  logoutButton: {
    marginTop: Spacing.lg,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  logoutLabel: {
    fontSize: FontSizes.base,
    fontWeight: '700',
  },
});
