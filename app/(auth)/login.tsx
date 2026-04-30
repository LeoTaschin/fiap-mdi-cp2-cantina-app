import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { FormField } from '@/components/FormField';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Colors, FontSizes, Spacing, BorderRadius } from '@/constants/theme';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { user, loading, login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace('/(tabs)');
    }
  }, [loading, user, router]);

  const emailError = useMemo(() => {
    if (!email.trim()) return 'Informe seu e-mail.';
    if (!emailRegex.test(email)) return 'Digite um e-mail válido.';
    return '';
  }, [email]);

  const passwordError = useMemo(() => {
    if (!password) return 'Informe a senha.';
    if (password.length < 6) return 'A senha precisa ter ao menos 6 caracteres.';
    return '';
  }, [password]);

  const canSubmit = !emailError && !passwordError;

  const handleSubmit = async () => {
    if (!canSubmit) {
      setServerError('Preencha todos os campos corretamente antes de entrar.');
      return;
    }

    setSubmitting(true);
    setServerError('');

    try {
      await login({ email, password });
      router.replace('/(tabs)');
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Erro ao fazer login.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.brandContainer}>
            <Text style={[styles.brandTitle, { color: colors.primary }]}>Cantina FIAP</Text>
            <Text style={[styles.brandSubtitle, { color: colors.text }]}>Login de aluno</Text>
          </View>

          <View style={[styles.formCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}> 
            <FormField
              label="E-mail"
              icon="email"
              value={email}
              keyboardType="email-address"
              placeholder="seu@email.com"
              autoCapitalize="none"
              onChangeText={setEmail}
              error={emailError}
            />
            <FormField
              label="Senha"
              icon="lock"
              value={password}
              placeholder="••••••••"
              secureTextEntry
              onChangeText={setPassword}
              error={passwordError}
            />
            {serverError ? <Text style={styles.serverError}>{serverError}</Text> : null}

            <TouchableOpacity
              style={[
                styles.primaryButton,
                {
                  backgroundColor: canSubmit ? colors.primary : colors.border,
                },
              ]}
              onPress={handleSubmit}
              disabled={!canSubmit || submitting}
              activeOpacity={0.8}
            >
              {submitting ? (
                <ActivityIndicator color={colors.background} />
              ) : (
                <Text style={[styles.primaryButtonText, { color: colors.background }]}>Entrar</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footerRow}>
              <Text style={[styles.footerText, { color: colors.text }]}>Ainda não possui conta?</Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={[styles.linkText, { color: colors.primary }]}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    paddingTop: Spacing['2xl'],
  },
  brandContainer: {
    marginBottom: Spacing['2xl'],
  },
  brandTitle: {
    fontSize: FontSizes['4xl'],
    fontWeight: '800',
    marginBottom: Spacing.sm,
  },
  brandSubtitle: {
    fontSize: FontSizes.lg,
    fontWeight: '500',
  },
  formCard: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 4,
  },
  serverError: {
    color: Colors.light.error,
    marginBottom: Spacing.md,
    fontWeight: '600',
  },
  primaryButton: {
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
  },
  primaryButtonText: {
    fontSize: FontSizes.base,
    fontWeight: '700',
  },
  footerRow: {
    marginTop: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: FontSizes.sm,
  },
  linkText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
});
