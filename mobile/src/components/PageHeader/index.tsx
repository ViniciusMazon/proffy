import React, { ReactNode } from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

interface PageHeaderProps {
  name?: string;
  title: string;
  subTitle?: string;
  icon?: string;
  iconText?: string;
  headerRight?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ name, title, subTitle, icon, iconText, headerRight, children }) => {
  const { navigate } = useNavigation();

  function handleGoBack() {
    navigate('Landing');
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>
        <Text style={styles.topBarName}>{name}</Text>
        <Image source={logoImg} resizeMode="contain" />
      </View>

      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Image source={icon} style={styles.icon} />
          <Text style={styles.iconText}>{iconText}</Text>
        </View>
        <Text style={styles.subTitle}>{subTitle}</Text>

        {headerRight}
      </View>

      {children}
    </View>
  );
}

export default PageHeader;
