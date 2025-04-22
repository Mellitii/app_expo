import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import NumericInput from '@/components/NumericInput';
import ToggleSwitch from '@/components/ToggleSwitch';
import SelectDropdown from '@/components/SelectDropdown';
import ResultCard from '@/components/ResultCard';
import { 
  calculateDressingPrice, 
  calculateArea, 
  calculateDiscount,
  transportOptions, 
  slideTypeOptions 
} from '@/utils/calculator';

export default function CalculatorScreen() {
  // Form state
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [hasChambranle, setHasChambranle] = useState(true);
  const [hasFacade, setHasFacade] = useState(true);
  const [slideType, setSlideType] = useState<'scala' | 'metabox'>('scala');
  const [slideCount, setSlideCount] = useState('0');
  const [transport, setTransport] = useState<number>(transportOptions[0].value);
  const [discount, setDiscount] = useState('0');
  
  // Result state
  const [price, setPrice] = useState(0);
  const [isPriceCalculated, setIsPriceCalculated] = useState(false);
  
  // Validation state
  const [widthError, setWidthError] = useState('');
  const [heightError, setHeightError] = useState('');
  const [slideCountError, setSlideCountError] = useState('');
  
  // Recalculate price when form values change
  useEffect(() => {
    // Validate inputs
    if (!width || !height || !slideCount) {
      setIsPriceCalculated(false);
      return;
    }
    
    // Clear validation errors
    setWidthError('');
    setHeightError('');
    setSlideCountError('');
    
    // Parse values
    const widthValue = parseFloat(width);
    const heightValue = parseFloat(height);
    const slideCountValue = parseInt(slideCount, 10);
    const discountValue = parseFloat(discount || '0');
    
    // Validate values
    if (widthValue <= 0) {
      setWidthError('La largeur doit être supérieure à 0');
      setIsPriceCalculated(false);
      return;
    }
    
    if (heightValue <= 0) {
      setHeightError('La hauteur doit être supérieure à 0');
      setIsPriceCalculated(false);
      return;
    }
    
    if (slideCountValue < 0) {
      setSlideCountError('Le nombre de coulisses doit être positif');
      setIsPriceCalculated(false);
      return;
    }
    
    // Calculate price
    const calculatedPrice = calculateDressingPrice({
      width: widthValue,
      height: heightValue,
      hasChambranle,
      hasFacade,
      slideType,
      slideCount: slideCountValue,
      transport,
      discount: calculateDiscount(
        calculateArea(widthValue, heightValue, hasChambranle),
        hasFacade,
        slideType,
        slideCountValue,
        discountValue
      )
    });
    
    setPrice(calculatedPrice);
    setIsPriceCalculated(true);
  }, [width, height, hasChambranle, hasFacade, slideType, slideCount, transport, discount]);
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Calculateur de Prix Dressing</Text>
            <Text style={styles.subtitle}>
              Entrez les dimensions et les options pour calculer le prix TTC
            </Text>
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Dimensions</Text>
            
            <NumericInput
              label="Largeur (m)"
              value={width}
              onChangeText={setWidth}
              errorMessage={widthError}
              units="m"
            />
            
            <NumericInput
              label="Hauteur (m)"
              value={height}
              onChangeText={setHeight}
              errorMessage={heightError}
              units="m"
            />
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Options</Text>
            
            <ToggleSwitch
              label="Chambranle"
              value={hasChambranle}
              onToggle={() => setHasChambranle(!hasChambranle)}
              optionLabels={{ true: 'Avec', false: 'Sans' }}
            />
            
            <ToggleSwitch
              label="Façade"
              value={hasFacade}
              onToggle={() => setHasFacade(!hasFacade)}
              optionLabels={{ true: 'Avec', false: 'Sans' }}
            />
            
            <SelectDropdown
              label="Type de Coulisse"
              value={slideType}
              options={slideTypeOptions}
              onSelect={(value) => setSlideType(value as 'scala' | 'metabox')}
            />
            
            <NumericInput
              label="Nombre de Coulisses"
              value={slideCount}
              onChangeText={setSlideCount}
              isInteger={true}
              step={1}
              errorMessage={slideCountError}
            />
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Livraison et Remise</Text>
            
            <SelectDropdown
              label="Transport"
              value={transport}
              options={transportOptions}
              onSelect={(value) => setTransport(value as number)}
            />
            
            <NumericInput
              label="Remise (%)"
              value={discount}
              onChangeText={setDiscount}
              min={0}
              max={100}
              units="%"
            />
          </View>
          
          <ResultCard
            price={price}
            transport={transport}
            hasChambranle={hasChambranle}
            hasFacade={hasFacade}
            slideType={slideType}
            slideCount={parseInt(slideCount || '0', 10)}
            discount={parseFloat(discount || '0')}
            area={
              calculateArea(
                parseFloat(width || '0'), 
                parseFloat(height || '0'), 
                hasChambranle
              )
            }
            isPriceCalculated={isPriceCalculated}
          />
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Tous les prix incluent la TVA à 19%
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    padding: 20,
    paddingTop: 24,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#64748B',
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#334155',
    marginBottom: 16,
  },
  footer: {
    marginTop: 8,
    marginBottom: 24,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
});