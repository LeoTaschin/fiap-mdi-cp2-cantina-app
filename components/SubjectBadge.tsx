/**
 * FIAP Checkpoint Tracker - SubjectBadge Component
 * 
 * Badge para exibir disciplinas com cor única
 */

import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Subject } from '@/constants/checkpoints';
import { FontSizes, Spacing, BorderRadius } from '@/constants/theme';

interface SubjectBadgeProps {
  subject: Subject;
  onPress?: () => void;
  isSelected?: boolean;
}

export const SubjectBadge: React.FC<SubjectBadgeProps> = ({
  subject,
  onPress,
  isSelected = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: subject.color + (isSelected ? 'FF' : '20'), // Full or 20% opacity
          borderColor: subject.color,
          borderWidth: isSelected ? 2 : 1,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.code,
          {
            color: subject.color,
            fontWeight: isSelected ? '700' : '600',
          },
        ]}
      >
        {subject.code}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.md,
    marginBottom: Spacing.md,
  },
  code: {
    fontSize: FontSizes.sm,
  },
});
