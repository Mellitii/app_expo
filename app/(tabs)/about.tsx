import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Info, Calculator, Truck, DollarSign, Settings } from 'lucide-react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>À propos de l'application</Text>
        <Text style={styles.subtitle}>
          Calculateur de prix pour les dressings sur mesure
        </Text>
      </View>
      
      <View style={styles.card}>
        <Info size={24} color="#3B82F6" />
        <Text style={styles.cardTitle}>Comment ça marche</Text>
        <Text style={styles.cardText}>
          Cette application calcule le prix TTC d'un dressing sur mesure en fonction de plusieurs paramètres,
          notamment les dimensions, les options choisies et les frais de transport.
        </Text>
      </View>
      
      <View style={styles.card}>
        <Calculator size={24} color="#8B5CF6" />
        <Text style={styles.cardTitle}>Formule de calcul</Text>
        <Text style={styles.cardText}>
          Avec chambranle:
          {'\n'}((((largeur+0.1)*(hauteur+0.1))*T + (prix coulisse*nombre de coulisses))-remise)*1.19+(((largeur+0.1)*(hauteur+0.1)))*30)+transport)*1.19
          {'\n\n'}
          Sans chambranle:
          {'\n'}(((((largeur*(hauteur))*T + (prix coulisse*nombre de coulisses))-remise)*1.19)+(((largeur*hauteur)*30)+transport)*1.19
        </Text>
      </View>
      
      <View style={styles.featureRow}>
        <View style={styles.featureCard}>
          <Settings size={24} color="#0D9488" />
          <Text style={styles.featureTitle}>Options de dressing</Text>
          <Text style={styles.featureText}>
            Personnalisez avec ou sans chambranle et façade.
          </Text>
        </View>
        
        <View style={styles.featureCard}>
          <Truck size={24} color="#F59E0B" />
          <Text style={styles.featureTitle}>Frais de transport</Text>
          <Text style={styles.featureText}>
            Calculez les coûts selon votre emplacement.
          </Text>
        </View>
      </View>
      
      <View style={styles.card}>
        <DollarSign size={24} color="#F43F5E" />
        <Text style={styles.cardTitle}>Prix et valeurs</Text>
        <Text style={styles.cardSubtitle}>Prix des coulisses:</Text>
        <Text style={styles.cardText}>
          - Scala: 100 DT{'\n'}
          - Metabox: 30 DT
        </Text>
        
        <Text style={styles.cardSubtitle}>Valeur de T:</Text>
        <Text style={styles.cardText}>
          - Avec façade: T = 450{'\n'}
          - Sans façade: T = 360
        </Text>
        
        <Text style={styles.cardSubtitle}>Tarifs de transport:</Text>
        <Text style={styles.cardText}>
          - Tunis: 127.5 DT{'\n'}
          - Capbon: 292.5 DT{'\n'}
          - Sousse: 420 DT{'\n'}
          - Djerba: 1005 DT
        </Text>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Tous les prix incluent la TVA (19%)
        </Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
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
    marginBottom: 8,
  },
  card: {
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
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#334155',
    marginTop: 12,
    marginBottom: 8,
  },
  cardSubtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#475569',
    marginTop: 16,
    marginBottom: 4,
  },
  cardText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    lineHeight: 22,
  },
  featureRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  featureCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'flex-start',
  },
  featureTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#334155',
    marginTop: 12,
    marginBottom: 8,
  },
  featureText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
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
  version: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 8,
  },
});