/**
 * CheckpointCalendar Component
 * 
 * Calendário interativo que exibe checkpoints nas suas datas
 * - Marca datas com checkpoints
 * - Mostra detalhes ao clicar em uma data
 * - Integrado com paleta FIAP
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Colors, FontSizes, Spacing, BorderRadius } from '@/constants/theme';
import { CHECKPOINTS } from '@/constants/checkpoints';
import { CheckpointCard } from './CheckpointCard';
import { X } from 'lucide-react-native';

interface CheckpointCalendarProps {
  onClose: () => void;
}

export function CheckpointCalendar({ onClose }: CheckpointCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Criar mapa de datas com checkpoints
  const markedDates = useMemo(() => {
    const marked: Record<string, any> = {};

    CHECKPOINTS.forEach((checkpoint) => {
      if (checkpoint.dueDate) {
        const dateStr = checkpoint.dueDate.toISOString().split('T')[0];
        marked[dateStr] = {
          marked: true,
          dotColor: Colors.light.primary,
          activeOpacity: 0,
        };
      }
    });

    // Destacar data selecionada
    marked[selectedDate] = {
      ...marked[selectedDate],
      selected: true,
      selectedColor: Colors.light.primary,
      selectedTextColor: '#FFFFFF',
    };

    return marked;
  }, [selectedDate]);

  // Filtrar checkpoints da data selecionada
  const checkpointsForDate = useMemo(() => {
    return CHECKPOINTS.filter((checkpoint) => {
      if (!checkpoint.dueDate) return false;
      const checkpointDateStr = checkpoint.dueDate.toISOString().split('T')[0];
      return checkpointDateStr === selectedDate;
    });
  }, [selectedDate]);

  return (
    <View style={[styles.container, { backgroundColor: '#000000' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: '#2a2a2a' }]}>
        <Text style={styles.title}>Calendário de Checkpoints</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Calendário */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Calendar
          markedDates={markedDates}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          theme={{
            backgroundColor: '#FFFFFF',
            calendarBackground: '#FFFFFF',
            textSectionTitleColor: Colors.light.text,
            textSectionTitleDisabledColor: Colors.light.icon,
            selectedDayBackgroundColor: Colors.light.primary,
            selectedDayTextColor: '#FFFFFF',
            todayTextColor: Colors.light.primary,
            dayTextColor: Colors.light.text,
            textDisabledColor: Colors.light.icon,
            dotColor: Colors.light.primary,
            selectedDotColor: '#FFFFFF',
            monthTextColor: Colors.light.text,
            indicatorColor: Colors.light.primary,
            arrowColor: Colors.light.primary,
            disabledArrowColor: Colors.light.icon,
            'stylesheet.calendar.header': {
              week: {
                marginTop: Spacing.md,
                marginBottom: Spacing.md,
                flexDirection: 'row',
                justifyContent: 'space-around',
              },
            },
          }}
          style={styles.calendar}
        />

        {/* Checkpoints da data selecionada */}
        <View style={styles.checkpointsSection}>
          <Text style={styles.sectionTitle}>
            {checkpointsForDate.length > 0
              ? `${checkpointsForDate.length} checkpoint(s) em ${new Date(selectedDate).toLocaleDateString('pt-BR')}`
              : `Nenhum checkpoint em ${new Date(selectedDate).toLocaleDateString('pt-BR')}`}
          </Text>

          {checkpointsForDate.length > 0 ? (
            <View style={styles.checkpointsList}>
              {checkpointsForDate.map((checkpoint) => (
                <CheckpointCard key={checkpoint.id} checkpoint={checkpoint} />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Sem checkpoints nesta data</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: Spacing.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    backgroundColor: '#000000',
  },
  calendar: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333333',
  },
  checkpointsSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: Spacing.lg,
  },
  checkpointsList: {
    gap: Spacing.md,
  },
  emptyState: {
    paddingVertical: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: FontSizes.base,
    color: '#888888',
    fontStyle: 'italic',
  },
});
