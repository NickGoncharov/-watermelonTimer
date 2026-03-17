import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      const nextModeIsBreak = !isBreak;
      setIsBreak(nextModeIsBreak);
      setSeconds(nextModeIsBreak ? 5 * 60 : 25 * 60);
      setIsActive(false);
      Alert.alert("Готово!", nextModeIsBreak ? "Время съесть арбуз!" : "Пора за работу!");
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, isBreak]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setSeconds(25 * 60);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isBreak ? 'ОТДЫХ' : 'РАБОТА'}</Text>
      
      {/* Квадратный арбуз */}
      <View style={[styles.watermelon, { borderColor: isBreak ? '#8BC34A' : '#2E7D32' }]}>
        {/* Полоски арбуза */}
        <View style={styles.stripeContainer}>
          <View style={styles.stripe} />
          <View style={styles.stripe} />
          <View style={styles.stripe} />
        </View>
        
        <View style={[styles.pulp, { backgroundColor: isBreak ? '#FFEB3B' : '#FF5252' }]}>
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>
          {/* Семечки */}
          {!isBreak && <View style={styles.seed} />}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleTimer}>
          <Text style={styles.buttonText}>{isActive ? 'ПАУЗА' : 'СТАРТ'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#eee' }]} onPress={resetTimer}>
          <Text style={[styles.buttonText, { color: '#333' }]}>СБРОС</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 30,
    color: '#1B5E20',
    letterSpacing: 2,
  },
  watermelon: {
    width: 260,
    height: 260,
    borderRadius: 20, // Скругленные углы для квадратного арбуза
    borderWidth: 12,
    backgroundColor: '#1B5E20', // Темно-зеленая корка
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  stripeContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stripe: {
    width: 20,
    height: '100%',
    backgroundColor: '#2E7D32', 
    opacity: 0.5,
  },
  pulp: {
    width: '90%',
    height: '90%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  seed: {
    position: 'absolute',
    bottom: 40,
    right: 50,
    width: 10,
    height: 15,
    backgroundColor: '#333',
    borderRadius: 5,
    transform: [{ rotate: '15deg' }],
  },
  timerText: {
    fontSize: 55,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 50,
    gap: 15,
  },
  button: {
    backgroundColor: '#1B5E20',
    paddingVertical: 18,
    paddingHorizontal: 35,
    borderRadius: 15,
    minWidth: 130,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
});
