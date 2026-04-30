/**
 * FIAP Checkpoint Tracker - CheckpointCard Component
 * 
 * Design: Corporate Minimalism
 * - Card com barra lateral colorida por matéria
 * - Indicador visual de urgência
 * - Informações claras e hierárquicas
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react-native';
import { Checkpoint, getSubjectById, getStatusColor, getDaysUntil, formatDate } from '@/constants/checkpoints';
import { Colors, FontSizes, Spacing, BorderRadius } from '@/constants/theme';

interface CheckpointCardProps {
  checkpoint: Checkpoint;
  onPress?: () => void;
  colorScheme?: 'light' | 'dark';
}

export const CheckpointCard: React.FC<CheckpointCardProps> = ({
  checkpoint,
  onPress,
  colorScheme = 'light',
}) => {
  const subject = getSubjectById(checkpoint.subjectId);
  const daysUntil = getDaysUntil(checkpoint.dueDate);
  const colors = Colors[colorScheme];
  const statusColor = getStatusColor(checkpoint.status);

  // Determinar ícone de status
  const getStatusIcon = () => {
    switch (checkpoint.status) {
      case 'completed':
        return <CheckCircle2 size={20} color={statusColor} />;
      case 'in-progress':
        return <Clock size={20} color={statusColor} />;
      default:
        return <AlertCircle size={20} color={statusColor} />;
    }
  };

  // Determinar urgência
  const getUrgencyLabel = () => {
    if (daysUntil < 0) return 'Atrasado';
    if (daysUntil === 0) return 'Hoje';
    if (daysUntil === 1) return 'Amanhã';
    if (daysUntil <= 7) return `${daysUntil} dias`;
    return `${Math.ceil(daysUntil / 7)} semanas`;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.cardBorder,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Barra lateral colorida */}
      <View
        style={[
          styles.colorBar,
          {
            backgroundColor: subject?.color || colors.primary,
          },
        ]}
      />

      {/* Conteúdo principal */}
      <View style={styles.content}>
        {/* Cabeçalho: Disciplina e Status */}
        <View style={styles.header}>
          <Text
            style={[
              styles.subjectCode,
              {
                color: subject?.color || colors.primary,
              },
            ]}
          >
            {subject?.code || 'N/A'}
          </Text>
          <View style={styles.statusBadge}>
            {getStatusIcon()}
          </View>
        </View>

        {/* Título do Checkpoint */}
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}
          numberOfLines={2}
        >
          {checkpoint.title}
        </Text>

        {/* Descrição */}
        <Text
          style={[
            styles.description,
            {
              color: colors.icon,
            },
          ]}
          numberOfLines={1}
        >
          {checkpoint.description}
        </Text>

        {/* Rodapé: Data e Urgência */}
        <View style={styles.footer}>
          <Text
            style={[
              styles.date,
              {
                color: colors.icon,
              },
            ]}
          >
            {formatDate(checkpoint.dueDate)}
          </Text>
          <View
            style={[
              styles.urgencyBadge,
              {
                backgroundColor: statusColor + '20', // 20% opacity
              },
            ]}
          >
            <Text
              style={[
                styles.urgencyText,
                {
                  color: statusColor,
                },
              ]}
            >
              {getUrgencyLabel()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: BorderRadius.lg,
    marginVertical: Spacing.sm,
    marginHorizontal: Spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  colorBar: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  subjectCode: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  statusBadge: {
    padding: Spacing.xs,
  },
  title: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: FontSizes.xs,
  },
  urgencyBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  urgencyText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
});
