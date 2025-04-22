import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { CircleMinus as MinusCircle, CirclePlus as PlusCircle } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence 
} from 'react-native-reanimated';

interface NumericInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  errorMessage?: string;
  isInteger?: boolean;
  units?: string;
}

export default function NumericInput({
  label,
  value,
  onChangeText,
  placeholder = '0',
  min = 0,
  max = 1000,
  step = 0.1,
  errorMessage,
  isInteger = false,
  units,
}: NumericInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const labelScale = useSharedValue(1);
  const shakeAnimation = useSharedValue(0);

  const animatedLabelStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: labelScale.value }]
    };
  });

  const animatedInputStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeAnimation.value }]
    };
  });

  const handleIncrement = () => {
    const currentValue = value === '' ? 0 : parseFloat(value);
    const newValue = isInteger
      ? Math.min(Math.floor(currentValue + step), max)
      : Math.min(parseFloat((currentValue + step).toFixed(2)), max);
    onChangeText(newValue.toString());
    
    labelScale.value = withSequence(
      withTiming(1.1, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
  };

  const handleDecrement = () => {
    const currentValue = value === '' ? 0 : parseFloat(value);
    const newValue = isInteger
      ? Math.max(Math.floor(currentValue - step), min)
      : Math.max(parseFloat((currentValue - step).toFixed(2)), min);
    onChangeText(newValue.toString());
    
    labelScale.value = withSequence(
      withTiming(1.1, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
  };

  const handleChangeText = (text: string) => {
    // Allow empty string or valid numbers
    if (text === '') {
      onChangeText('');
      return;
    }

    // Replace comma with period
    const sanitizedText = text.replace(',', '.');
    
    // Check if the text is a valid number
    const regex = isInteger ? /^\d+$/ : /^\d*\.?\d*$/;
    if (!regex.test(sanitizedText)) {
      shakeAnimation.value = withSequence(
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
      return;
    }

    const numValue = parseFloat(sanitizedText);
    // Check if the value is within the range
    if (isNaN(numValue) || numValue < min || numValue > max) {
      shakeAnimation.value = withSequence(
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
      return;
    }

    // If integer mode, round the value
    const finalValue = isInteger ? Math.floor(numValue).toString() : sanitizedText;
    onChangeText(finalValue);
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.label, animatedLabelStyle]}>
        {label}
      </Animated.Text>
      
      <View style={styles.inputContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleDecrement}
          disabled={value === '' || parseFloat(value) <= min}
        >
          <MinusCircle 
            size={24} 
            color={value === '' || parseFloat(value) <= min ? '#CBD5E1' : '#3B82F6'} 
          />
        </TouchableOpacity>
        
        <Animated.View style={[styles.textInputContainer, animatedInputStyle]}>
          <TextInput
            style={[
              styles.input,
              isFocused && styles.inputFocused,
              errorMessage && styles.inputError,
            ]}
            value={value}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            keyboardType="decimal-pad"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {units && <Text style={styles.units}>{units}</Text>}
        </Animated.View>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleIncrement}
          disabled={value !== '' && parseFloat(value) >= max}
        >
          <PlusCircle 
            size={24} 
            color={value !== '' && parseFloat(value) >= max ? '#CBD5E1' : '#3B82F6'} 
          />
        </TouchableOpacity>
      </View>
      
      {errorMessage && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 8,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },
  inputFocused: {
    borderColor: '#3B82F6',
    borderWidth: 2,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Poppins-Regular',
  },
  units: {
    position: 'absolute',
    right: 16,
    color: '#64748B',
    fontFamily: 'Poppins-Regular',
  }
});