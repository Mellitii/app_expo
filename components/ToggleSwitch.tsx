import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence 
} from 'react-native-reanimated';

interface ToggleSwitchProps {
  label: string;
  value: boolean;
  onToggle: () => void;
  optionLabels?: { true: string; false: string };
}

export default function ToggleSwitch({
  label,
  value,
  onToggle,
  optionLabels = { true: 'Oui', false: 'Non' }
}: ToggleSwitchProps) {
  const labelScale = useSharedValue(1);
  
  const animatedLabelStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: labelScale.value }]
    };
  });

  const handleToggle = () => {
    onToggle();
    
    labelScale.value = withSequence(
      withTiming(1.1, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.label, animatedLabelStyle]}>
        {label}
      </Animated.Text>
      
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            value && styles.optionActive,
            { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }
          ]}
          onPress={() => !value && handleToggle()}
          activeOpacity={0.7}
        >
          <Text style={[styles.optionText, value && styles.optionTextActive]}>
            {optionLabels.true}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.option,
            !value && styles.optionActive,
            { borderTopRightRadius: 8, borderBottomRightRadius: 8 }
          ]}
          onPress={() => value && handleToggle()}
          activeOpacity={0.7}
        >
          <Text style={[styles.optionText, !value && styles.optionTextActive]}>
            {optionLabels.false}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginBottom: 8,
    color: '#334155',
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },
  optionActive: {
    backgroundColor: '#3B82F6',
  },
  optionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
});