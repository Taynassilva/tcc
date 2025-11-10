// ChatScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
  Dimensions,
} from 'react-native';

type Message = {
  id: string;
  sender: 'user' | 'superior';
  text: string;
  timestamp: string;
};

type ChatScreenProps = {
  onClose: () => void;
  isDarkMode: boolean;
};

export default function ChatScreen({ onClose, isDarkMode }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'superior', text: 'Olá! Em que posso ajudar hoje?', timestamp: '14:00' },
    { id: '2', sender: 'user', text: 'Olá! Preciso de ajuda com uma tarefa.', timestamp: '14:01' },
    { id: '3', sender: 'superior', text: 'Certo, por favor, me dê mais detalhes sobre a tarefa.', timestamp: '14:02' },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const newMessage: Message = {
      id: String(messages.length + 1),
      sender: 'user',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText('');

    setTimeout(() => {
      const superiorResponse: Message = {
        id: String(messages.length + 2),
        sender: 'superior',
        text: 'Entendido. Estou verificando isso para você...',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prevMessages) => [...prevMessages, superiorResponse]);
    }, 1500);
  };

  const chatStyles = StyleSheet.create({
    chatContainer: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1a1a2e' : '#f0f2f5', // Cor de fundo suave
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 18, // Aumentar padding
      paddingTop: Platform.OS === 'android' ? 35 : 55, // Ajuste para status bar
      backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff', // Fundo do cabeçalho
      borderBottomWidth: 0, // Remover borda
      shadowColor: isDarkMode ? '#000' : '#d1d9e6', // Sombra sutil
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
      borderBottomLeftRadius: 20, // Bordas arredondadas
      borderBottomRightRadius: 20,
    },
    backButton: {
      marginRight: 15,
      padding: 5,
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15, // Arredondado
      backgroundColor: isDarkMode ? '#282a36' : '#e0e2e5', // Fundo do botão
      shadowColor: isDarkMode ? '#000' : '#a7aaaf',
      shadowOffset: { width: 3, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 3,
    },
    backButtonText: {
      fontSize: 22, // Um pouco maior
      color: isDarkMode ? '#e0e0e0' : '#3c2477', // Cor principal do tema
      fontWeight: 'bold',
    },
    headerText: {
      fontSize: 22, // Um pouco maior
      fontWeight: 'bold',
      color: isDarkMode ? '#e0e0e0' : '#333333',
      flex: 1, // Para o título ocupar espaço
      textAlign: 'center', // Centralizar o título
      marginRight: 40, // Espaço para o botão voltar
    },
    messagesContainer: {
      flexGrow: 1,
      padding: 15, // Aumentar padding
      justifyContent: 'flex-end',
    },
    messageBubble: {
      maxWidth: '80%',
      padding: 14, // Aumentar padding
      borderRadius: 20, // Mais arredondado
      marginBottom: 10,
      elevation: 2,
      shadowColor: isDarkMode ? '#000' : '#d1d9e6',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#3c2477', // Cor principal do seu app
      shadowColor: '#1a1a2e', // Sombra mais escura para o usuário
      shadowOffset: { width: -3, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
    },
    superiorMessage: {
      alignSelf: 'flex-start',
      backgroundColor: isDarkMode ? '#282a36' : '#ffffff', // Cor mais clara para superior
      shadowColor: isDarkMode ? '#000' : '#d1d9e6',
      shadowOffset: { width: 3, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    messageText: {
      fontSize: 16,
      lineHeight: 22, // Melhorar legibilidade
      color: isDarkMode ? '#e0e0e0' : '#333333',
    },
    userMessageText: {
      color: '#ffffff', // Texto branco para mensagens do usuário
    },
    superiorMessageText: {
      color: isDarkMode ? '#e0e0e0' : '#333333',
    },
    timestamp: {
      fontSize: 11, // Um pouco maior
      marginTop: 6,
      textAlign: 'right',
      color: isDarkMode ? '#999999' : '#777777',
      opacity: 0.8,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: isDarkMode ? '#1a1a2e' : '#f0f2f5', // Fundo do input container
      borderTopWidth: 0,
      shadowColor: isDarkMode ? '#000' : '#d1d9e6',
      shadowOffset: { width: 0, height: -3 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    textInput: {
      flex: 1,
      backgroundColor: isDarkMode ? '#282a36' : '#ffffff',
      borderRadius: 25, // Mais arredondado
      paddingHorizontal: 20,
      paddingVertical: Platform.OS === 'ios' ? 15 : 12,
      fontSize: 16,
      marginRight: 10,
      color: isDarkMode ? '#e0e0e0' : '#333333',
      borderColor: isDarkMode ? '#3a3a4c' : '#c8ced7', // Bordas mais suaves
      borderWidth: 1,
      shadowColor: isDarkMode ? '#000' : '#d1d9e6', // Sombra interna/externa
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 2,
    },
    sendButton: {
      backgroundColor: '#3c2477',
      borderRadius: 25, // Mais arredondado
      width: 50, // Maior
      height: 50, // Maior
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#1a1a2e',
      shadowOffset: { width: 3, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 4,
    },
    sendButtonText: {
      color: '#fff',
      fontSize: 22, // Um pouco maior
      fontWeight: 'bold',
    },
  });

  return (
    <KeyboardAvoidingView
      style={chatStyles.chatContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={chatStyles.header}>
        <TouchableOpacity onPress={onClose} style={chatStyles.backButton}>
          <Text style={chatStyles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={chatStyles.headerText}>Chat com Seu Superior</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={chatStyles.messagesContainer}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              chatStyles.messageBubble,
              message.sender === 'user' ? chatStyles.userMessage : chatStyles.superiorMessage,
            ]}
          >
            <Text
              style={[
                chatStyles.messageText,
                message.sender === 'user' ? chatStyles.userMessageText : chatStyles.superiorMessageText,
              ]}
            >
              {message.text}
            </Text>
            <Text style={chatStyles.timestamp}>{message.timestamp}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={chatStyles.inputContainer}>
        <TextInput
          style={chatStyles.textInput}
          placeholder="Digite sua mensagem..."
          placeholderTextColor={isDarkMode ? '#888888' : '#aaaaaa'}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity onPress={handleSendMessage} style={chatStyles.sendButton}>
          <Text style={chatStyles.sendButtonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}