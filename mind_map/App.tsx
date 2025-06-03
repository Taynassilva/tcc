import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  useColorScheme,
  ActivityIndicator,
  Modal,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import ChatScreen from './ChatScreen';

type Task = {
  text: string;
  date: 'today' | 'other';
  done: boolean;
};

type CalendarDay = {
  date: string;
  timeSlots: string[];
};

type CalendarWeek = {
  name: string;
  dates?: string;
  days: CalendarDay[];
};

export default function App() {
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedTab, setSelectedTab] = useState<'all' | 'today' | 'done'>('all');
  const [tasks, setTasks] = useState<Task[]>([
    { text: 'Aprender React Native', date: 'today', done: true },
    { text: 'Comprar mantimentos', date: 'today', done: false },
    { text: 'Ligar para o cliente X', date: 'other', done: false },
    { text: 'Pagar contas', date: 'other', done: false },
  ]);
  const [selectedCalendarWeek, setSelectedCalendarWeek] = useState('Próxima Semana');
  const [selectedCalendarTime, setSelectedCalendarTime] = useState<string | null>(null);
  const [isChatVisible, setIsChatVisible] = useState(false);

  const isDarkMode = colorScheme === 'dark';

  // Cores personalizadas para o design
  const Colors = {
    primary: '#3c2477', // Roxo principal
    secondary: '#7a52aa', // Roxo mais claro
    backgroundLight: '#f0f2f5',
    backgroundDark: '#1a1a2e',
    cardLight: '#ffffff',
    cardDark: '#282a36',
    textLight: '#333333',
    textDark: '#e0e0e0',
    shadowLight: '#d1d9e6',
    shadowDark: '#000000',
    success: '#4caf50',
    borderLight: '#c8ced7',
    borderDark: '#3a3a4c',
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos de login.');
      return;
    }
    setIsLoggedIn(true);
  };

  const toggleTaskDone = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'today') return task.date === 'today';
    if (selectedTab === 'done') return task.done;
    return true;
  });

  const renderTasks = () =>
    filteredTasks.map((task, index) => (
      <View
        key={index}
        style={[
          styles.task,
          { backgroundColor: isDarkMode ? Colors.cardDark : Colors.cardLight },
          task.done && styles.taskDone,
          {
            shadowColor: isDarkMode ? Colors.shadowDark : Colors.shadowLight,
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: isDarkMode ? 0.4 : 0.15,
            shadowRadius: 4,
            elevation: 3,
          }
        ]}
      >
        <TouchableOpacity
          style={[
            styles.circle,
            { borderColor: Colors.primary },
            task.done && styles.checked,
            task.done && { backgroundColor: Colors.success },
          ]}
          onPress={() => toggleTaskDone(index)}
        />
        <Text style={[styles.taskText, { color: isDarkMode ? Colors.textDark : Colors.textLight }]}>
          {task.text}
        </Text>
      </View>
    ));

  const calendarWeeks: CalendarWeek[] = [
    {
      name: 'Próxima Semana',
      dates: '12 de Julho de 2021',
      days: [
        { date: 'Segunda-feira, 12 de Julho de 2021', timeSlots: ['09:00', '09:30', '10:30', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30'] },
        { date: 'Terça-feira, 13 de Julho de 2021', timeSlots: ['09:00', '09:30', '10:30', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30'] },
        { date: 'Quarta-feira, 14 de Julho de 2021', timeSlots: ['09:00', '09:30', '10:00', '10:30', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'] },
        { date: 'Quinta-feira, 15 de Julho de 2021', timeSlots: ['09:00', '09:30', '10:00', '10:30', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'] },
        { date: 'Sexta-feira, 16 de Julho de 2021', timeSlots: ['09:00', '09:30', '10:00', '10:30', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'] },
      ],
    },
    { name: '18 - 24 de Julho', days: [] },
    { name: '25 - 31 de Julho', days: [] },
    { name: '01 - 07 de Agosto', days: [] },
    { name: 'Mais Horários', days: [] },
  ];

  const renderNewCalendar = () => {
    const currentWeekData = calendarWeeks.find(week => week.name === selectedCalendarWeek);
    const currentTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    return (
      <View style={[styles.calendarContainer, {
          backgroundColor: isDarkMode ? Colors.cardDark : Colors.cardLight,
          shadowColor: isDarkMode ? Colors.shadowDark : Colors.shadowLight,
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: isDarkMode ? 0.3 : 0.2,
          shadowRadius: 8,
          elevation: 6,
      }]}>
        <View style={[styles.calendarHeaderSection, { borderRightColor: isDarkMode ? Colors.borderDark : Colors.borderLight }]}>
          <View style={styles.quarterlyReview}>
            <Text style={[styles.quarterlyReviewText, { color: isDarkMode ? Colors.textDark : Colors.textLight }]}>Revisão Trimestral da Conta</Text>
            <View style={styles.duration}>
              <Text style={[styles.durationIcon, { color: isDarkMode ? Colors.textDark : Colors.textLight }]}>&#x23F1;</Text>
              <Text style={[styles.durationText, { color: isDarkMode ? Colors.textDark : Colors.textLight }]}>30 minutos</Text>
            </View>
          </View>

          <View style={styles.weekOptions}>
            {calendarWeeks.map((week, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.weekOption,
                  selectedCalendarWeek === week.name && { backgroundColor: isDarkMode ? '#3a3a4c' : '#e0e2e5' },
                  { borderRadius: 10, paddingVertical: 10, paddingHorizontal: 15, marginBottom: 8 }
                ]}
                onPress={() => setSelectedCalendarWeek(week.name)}
              >
                <Text style={[
                  styles.weekOptionText,
                  { color: isDarkMode ? Colors.textDark : Colors.textLight },
                  selectedCalendarWeek === week.name && { fontWeight: 'bold', color: Colors.primary }
                ]}>
                  {week.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.timezoneContainer, { borderTopColor: isDarkMode ? Colors.borderDark : Colors.borderLight }]}>
            <Text style={[styles.timezoneText, { color: isDarkMode ? Colors.textDark : Colors.textLight }]}>Atualmente {currentTime}</Text>
            <Text style={[styles.timezoneLocation, { color: isDarkMode ? Colors.textDark : Colors.textLight }]}>América/Los Angeles</Text>
            <TouchableOpacity onPress={() => Alert.alert('Mudar Fuso Horário', 'Funcionalidade para mudar o fuso horário seria implementada aqui.')}>
              <Text style={styles.changeButton}>Mudar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.timeSlotsSection}>
          <Text style={[styles.nextWeekTitle, { color: isDarkMode ? Colors.textDark : Colors.textLight }]}>PRÓXIMA SEMANA</Text>
          {currentWeekData?.days.map((day, dayIndex) => (
            <View key={dayIndex} style={styles.dayTimeSlotsContainer}>
              <Text style={[styles.dayTimeSlotsHeader, { color: isDarkMode ? Colors.textDark : Colors.textLight }]}>{day.date}</Text>
              <View style={styles.timeSlotsRow}>
                {day.timeSlots.map((time, timeIndex) => (
                  <TouchableOpacity
                    key={timeIndex}
                    style={[
                      styles.timeSlotButton,
                      { borderColor: Colors.primary, backgroundColor: isDarkMode ? Colors.cardDark : Colors.cardLight },
                      selectedCalendarTime === time && { backgroundColor: Colors.primary },
                      {
                        shadowColor: isDarkMode ? Colors.shadowDark : Colors.shadowLight,
                        shadowOffset: { width: 2, height: 2 },
                        shadowOpacity: isDarkMode ? 0.3 : 0.15,
                        shadowRadius: 3,
                        elevation: 2,
                      }
                    ]}
                    onPress={() => setSelectedCalendarTime(time)}
                  >
                    <Text style={[
                        styles.timeSlotText,
                        { color: Colors.primary },
                        selectedCalendarTime === time && { color: Colors.cardLight }
                      ]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
                {day.timeSlots.length > 8 && (
                  <TouchableOpacity style={[
                      styles.moreTimesButton,
                      {
                        backgroundColor: isDarkMode ? Colors.cardDark : Colors.cardLight,
                        borderColor: isDarkMode ? Colors.borderDark : Colors.borderLight,
                        shadowColor: isDarkMode ? Colors.shadowDark : Colors.shadowLight,
                        shadowOffset: { width: 2, height: 2 },
                        shadowOpacity: isDarkMode ? 0.3 : 0.15,
                        shadowRadius: 3,
                        elevation: 2,
                      }
                    ]}>
                    <Text style={[styles.moreTimesText, { color: isDarkMode ? Colors.textDark : Colors.textLight }]}>Mais horários ↓</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  if (showSplash) {
    return (
      <View style={[styles.splashScreen, { backgroundColor: isDarkMode ? Colors.backgroundDark : Colors.backgroundLight }]}>
        <Text style={[styles.splashText, { color: isDarkMode ? Colors.textDark : Colors.primary }]}>Bem-vindo ao Taskify!</Text>
        <ActivityIndicator size="large" color={isDarkMode ? Colors.textDark : Colors.primary} style={{ marginTop: 20 }} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? Colors.backgroundDark : Colors.backgroundLight },
      ]}
    >
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      {isLoggedIn ? (
        <>
          <View style={[styles.header, { backgroundColor: isDarkMode ? Colors.backgroundDark : Colors.backgroundLight }]}>
            <Text style={[styles.headerText, { color: isDarkMode ? Colors.textDark : Colors.textLight }]}>
              Bem-vindo, {username}!
            </Text>
            <TouchableOpacity
              style={styles.chatIcon}
              onPress={() => setIsChatVisible(true)}
            >
              <Text style={[styles.chatIconText, { color: isDarkMode ? Colors.textDark : Colors.primary }]}>💬</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.mainContent}>
            <View style={[styles.tabs, { backgroundColor: isDarkMode ? Colors.cardDark : Colors.cardLight, borderRadius: 15, padding: 8,
                shadowColor: isDarkMode ? Colors.shadowDark : Colors.shadowLight, shadowOffset: { width: 0, height: 3 }, shadowOpacity: isDarkMode ? 0.3 : 0.15, shadowRadius: 5, elevation: 4,
            }]}>
              {['all', 'today', 'done'].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tab,
                    { backgroundColor: isDarkMode ? Colors.cardDark : Colors.cardLight, borderRadius: 10, paddingVertical: 10, marginHorizontal: 4 },
                    selectedTab === tab && { backgroundColor: Colors.primary },
                  ]}
                  onPress={() => setSelectedTab(tab as 'all' | 'today' | 'done')}
                >
                  <Text style={[
                      { color: isDarkMode ? Colors.textDark : Colors.textLight },
                      selectedTab === tab && { color: Colors.cardLight, fontWeight: 'bold' }
                    ]}>
                    {tab === 'all'
                      ? 'Tudo'
                      : tab === 'today'
                      ? 'Hoje'
                      : 'Concluído'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {renderTasks()}

            <TouchableOpacity style={[styles.button, { backgroundColor: Colors.primary }]}>
              <Text style={styles.buttonText}>Minhas Tarefas</Text>
            </TouchableOpacity>

            {renderNewCalendar()}
          </ScrollView>

          <Modal
            animationType="slide"
            transparent={false}
            visible={isChatVisible}
            onRequestClose={() => setIsChatVisible(false)}
          >
            <ChatScreen onClose={() => setIsChatVisible(false)} isDarkMode={isDarkMode} />
          </Modal>
        </>
      ) : (
        <View style={[styles.loginScreen, { backgroundColor: isDarkMode ? Colors.backgroundDark : Colors.backgroundLight }]}>
          <Text style={[styles.loginText, { color: isDarkMode ? Colors.textDark : Colors.textLight }]}>
            Tela de Login
          </Text>
          <TextInput
            style={[styles.input, {
                backgroundColor: isDarkMode ? Colors.cardDark : Colors.cardLight,
                borderColor: isDarkMode ? Colors.borderDark : Colors.borderLight,
                color: isDarkMode ? Colors.textDark : Colors.textLight,
                borderRadius: 15, padding: 15, marginVertical: 10,
                shadowColor: isDarkMode ? Colors.shadowDark : Colors.shadowLight, shadowOffset: { width: 2, height: 2 }, shadowOpacity: isDarkMode ? 0.3 : 0.15, shadowRadius: 5, elevation: 3,
            }]}
            placeholder="Nome de Usuário"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor={isDarkMode ? '#888888' : '#aaaaaa'}
          />
          <TextInput
            style={[styles.input, {
                backgroundColor: isDarkMode ? Colors.cardDark : Colors.cardLight,
                borderColor: isDarkMode ? Colors.borderDark : Colors.borderLight,
                color: isDarkMode ? Colors.textDark : Colors.textLight,
                borderRadius: 15, padding: 15, marginVertical: 10,
                shadowColor: isDarkMode ? Colors.shadowDark : Colors.shadowLight, shadowOffset: { width: 2, height: 2 }, shadowOpacity: isDarkMode ? 0.3 : 0.15, shadowRadius: 5, elevation: 3,
            }]}
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={isDarkMode ? '#888888' : '#aaaaaa'}
          />
          <TouchableOpacity
            onPress={handleLogin}
            style={[
              styles.button,
              { backgroundColor: Colors.primary, borderRadius: 15, paddingVertical: 15, marginTop: 20 },
              (username === '' || password === '') && { opacity: 0.7 },
              {
                shadowColor: isDarkMode ? Colors.shadowDark : Colors.shadowLight, shadowOffset: { width: 0, height: 5 }, shadowOpacity: isDarkMode ? 0.4 : 0.25, shadowRadius: 8, elevation: 7,
              }
            ]}
            disabled={username === '' || password === ''}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: 32, // Maior e mais impactante
    fontWeight: 'bold',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    paddingTop: Platform.OS === 'android' ? 35 : 55, // Ajuste para status bar
  },
  headerText: {
    fontSize: 24, // Maior
    fontWeight: 'bold',
  },
  chatIcon: {
    position: 'absolute',
    right: 20,
    top: Platform.OS === 'android' ? 35 : 55, // Ajuste para alinhar com o paddingTop do header
    zIndex: 1,
    padding: 5,
  },
  chatIconText: {
    fontSize: 32, // Maior para ser mais visível
  },
  loginScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30, // Mais padding
  },
  loginText: {
    fontSize: 28, // Maior
    fontWeight: 'bold',
    marginBottom: 30, // Mais espaço
  },
  input: {
    width: '100%',
    borderWidth: 1,
  },
  button: {
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18, // Maior
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20, // Mais espaço
    padding: 8,
    alignSelf: 'center', // Centralizar as abas
    width: '90%', // Limitar largura das abas
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16, // Mais padding
    marginBottom: 12, // Mais espaço
    borderRadius: 15, // Mais arredondado
    borderWidth: 1, // Adicionar borda para um toque mais neumórfico
    borderColor: 'transparent', // Inicialmente transparente, será ajustado com sombras
  },
  taskDone: {
    opacity: 0.7, // Um pouco mais transparente quando concluída
  },
  taskText: {
    fontSize: 17, // Um pouco maior
  },
  circle: {
    width: 24, // Maior
    height: 24, // Maior
    borderRadius: 12, // Metade da largura/altura para ser um círculo
    borderWidth: 2,
    marginRight: 12, // Mais espaço
    justifyContent: 'center', // Para centralizar o "tick" se adicionarmos
    alignItems: 'center',
  },
  checked: {
    // Background color definido inline no renderTasks
  },
  mainContent: {
    paddingBottom: 30, // Mais padding no final
    paddingHorizontal: 15,
  },
  calendarContainer: {
    flexDirection: 'row',
    borderRadius: 20, // Mais arredondado
    marginTop: 25, // Mais espaço
    overflow: 'hidden',
    minHeight: 450, // Um pouco maior
  },
  calendarHeaderSection: {
    width: '40%',
    padding: 20, // Mais padding
    borderRightWidth: 1,
    justifyContent: 'space-between',
    paddingBottom: 25,
  },
  quarterlyReview: {
    marginBottom: 25,
  },
  quarterlyReviewText: {
    fontSize: 19, // Maior
    fontWeight: 'bold',
  },
  duration: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  durationIcon: {
    fontSize: 18, // Maior
    marginRight: 8,
  },
  durationText: {
    fontSize: 15,
  },
  weekOptions: {},
  weekOption: {
    borderRadius: 10,
    marginBottom: 8, // Mais espaço
  },
  weekOptionText: {
    fontSize: 17, // Maior
  },
  timezoneContainer: {
    marginTop: 25,
    borderTopWidth: 1,
    paddingTop: 18,
  },
  timezoneText: {
    fontSize: 15,
  },
  timezoneLocation: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 3,
  },
  changeButton: {
    color: '#3c2477',
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 15,
  },
  timeSlotsSection: {
    flex: 1,
    padding: 20, // Mais padding
  },
  nextWeekTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 20, // Mais espaço
  },
  dayTimeSlotsContainer: {
    marginBottom: 25,
  },
  dayTimeSlotsHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  timeSlotsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10, // Mais espaço entre os botões de hora
  },
  timeSlotButton: {
    paddingVertical: 10, // Mais padding
    paddingHorizontal: 16, // Mais padding
    borderRadius: 12, // Mais arredondado
    borderWidth: 1,
  },
  timeSlotText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  selectedTimeSlot: {
    // Estilos de fundo e texto definidos inline no renderNewCalendar
  },
  moreTimesButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  moreTimesText: {
    fontSize: 15,
  }
});