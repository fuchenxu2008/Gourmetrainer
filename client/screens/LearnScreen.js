import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import TagCard from '../components/TagCard';
import allTags from '../constants/Tags';
import layout from '../constants/Layout';
const { height } = layout.window;

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  _handlePress = (tag) => {
    this.props.navigation.navigate('TagCenter', { tag })
  }

  render() {
    return (
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 0.1 * height }}>
        <View style={styles.headerSection}>
          <Text style={styles.heading}>Learning Center</Text>
          <Text style={styles.smallerheading}>Learn to Master Different Cuisines</Text>
        </View> 
        <View style={styles.cardContainer}>
          {
            allTags.map((tag, i) => (
              <TagCard key={i} tag={tag} index={i} onPress={() => this._handlePress(tag)} />
            ))
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: 'rgb(250, 250, 250)',
  },
  headerSection: {
    paddingHorizontal: '8%',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'color: rgb(70, 70, 70)',
  },
  smallerheading: {
    fontSize: 20,
    color: 'rgb(150, 150, 150)',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 40,
  }
});
