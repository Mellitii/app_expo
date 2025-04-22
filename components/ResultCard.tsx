import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withRepeat,
  withTiming,
  Easing
} from 'react-native-reanimated';
import { ArrowDown } from 'lucide-react-native';

interface ResultCardProps {
  price: number;
  transport: number;
  hasChambranle: boolean;
  hasFacade: boolean;
  slideType: string;
  slideCount: number;
  discount: number;
  area: number;
  isPriceCalculated: boolean;
}

export default function ResultCard({
  price,
  transport,
  hasChambranle,
  hasFacade,
  slideType,
  slideCount,
  discount,
  area,
  isPriceCalculated
}: ResultCardProps) {
  // Animation values
  const scaleValue = useSharedValue(isPriceCalculated ? 1 : 0);
  const arrowOffset = useSharedValue(0);

  // Animate scale when price is calculated
  React.useEffect(() => {
    if (isPriceCalculated) {
      scaleValue.value = withSpring(1, { stiffness: 120, damping: 12 });
      
      // Pulse animation for arrow
      arrowOffset.value = withRepeat(
        withTiming(10, { 
          duration: 1500,
          easing: Easing.inOut(Easing.ease)
        }),
        -1, // Infinite repetitions
        true // Reverse
      );
    } else {
      scaleValue.value = withTiming(0, { duration: 300 });
    }
  }, [isPriceCalculated]);

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
      opacity: scaleValue.value,
    };
  });

  const animatedArrowStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: arrowOffset.value }],
    };
  });

  // Calculate values for display
  const slidePrice = slideType === 'scala' ? 100 : 30;
  const T = hasFacade ? 450 : 360;
  const totalSlidesPrice = slidePrice * slideCount;
  const discountAmount = discount > 0 ? (((area * T) + totalSlidesPrice) * (discount / 100)) : 0;

  if (!isPriceCalculated) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, animatedCardStyle]}>
      <Animated.View style={[styles.arrowContainer, animatedArrowStyle]}>
        <ArrowDown size={32} color="#3B82F6" />
      </Animated.View>
      
      <View style={styles.card}>
        <Text style={styles.title}>Résultat</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Prix Total TTC</Text>
          <Text style={styles.priceValue}>{price.toFixed(2)} DT</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Détails du calcul</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Surface</Text>
            <Text style={styles.detailValue}>{area.toFixed(2)} m²</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Type</Text>
            <Text style={styles.detailValue}>
              {hasChambranle ? 'Avec chambranle' : 'Sans chambranle'}, 
              {hasFacade ? ' avec façade' : ' sans façade'}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Coulisses</Text>
            <Text style={styles.detailValue}>
              {slideCount} × {slideType === 'scala' ? 'Scala' : 'Metabox'} ({slidePrice} DT chacune)
            </Text>
          </View>
          
          {discount > 0 && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Remise ({discount}%)</Text>
              <Text style={styles.detailValue}>-{discountAmount.toFixed(2)} DT</Text>
            </View>
          )}
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transport</Text>
            <Text style={styles.detailValue}>{transport.toFixed(2)} DT</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>TVA (19%)</Text>
            <Text style={styles.detailValue}>Incluse</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  arrowContainer: {
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    width: '100%',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 16,
  },
  priceContainer: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  priceLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#3B82F6',
    marginBottom: 8,
  },
  priceValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#3B82F6',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 16,
  },
  detailsContainer: {
    gap: 12,
  },
  detailsTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#334155',
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  detailValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1E293B',
  },
});