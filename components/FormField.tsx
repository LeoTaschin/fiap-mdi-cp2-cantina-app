import React from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { Colors, FontSizes, Spacing, BorderRadius } from '@/constants/theme';

interface FormFieldProps extends TextInputProps {
  label: string;
  icon: string;
  error?: string;
}

export function FormField({ label, icon, error, style, ...inputProps }: FormFieldProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View style={styles.fieldContainer}>
      <View style={styles.labelRow}>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
      <View style={[styles.inputWrapper, { borderColor: error ? colors.error : colors.border, backgroundColor: colors.cardBackground }]}> 
        <MaterialCommunityIcons name={icon} size={20} color={error ? colors.error : colors.icon} style={styles.icon} />
        <TextInput
          placeholderTextColor={colors.icon}
          style={[styles.input, { color: colors.text }, style]}
          {...inputProps}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: Spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  label: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: FontSizes.base,
    minHeight: 40,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  errorText: {
    color: Colors.light.error,
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
});
