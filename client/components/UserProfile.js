import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo';
import CookedHistory from '../containers/CookedHistory';
import avatar from '../assets/images/default_male.png';

const HEADER_MAX_HEIGHT = 140;
const HEADER_MIN_HEIGHT = 90;
const PROFILE_IMAGE_MAX_HEIGHT = 90;
const PROFILE_IMAGE_MIN_HEIGHT = 50;

export default class UserProfile extends Component {
    state = {
        scrollY: new Animated.Value(0),
    }

    render() {
        const { user } = this.props;
        if (!user) return null;
        const { email, _id, gender, nickname } = user;

        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
        });

        const profileImageHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
            extrapolate: 'clamp',
        });

        const profileImageMarginTop = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [HEADER_MAX_HEIGHT - (PROFILE_IMAGE_MAX_HEIGHT / 2), HEADER_MAX_HEIGHT + 5],
            extrapolate: 'clamp',
        });

        const headerZindex = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });

        const headerTitleBottom = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
                HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT + 20,
                HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT + 25,
            ],
            outputRange: [-20, -20, 0, 5],
            extrapolate: 'clamp',
        });

        return (
            <View style={styles.outestContainer}>
                <Animated.View style={{
                    ...styles.headerSection,
                    height: headerHeight,
                    zIndex: headerZindex,
                }}>
                    <LinearGradient
                        colors={['#89f7fe', '#66a6ff']}
                        start={[0, 0]}
                        end={[1, 1]}
                        location={[0.25, 0.4]}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        }}
                    />
                    <Animated.View style={{
                        ...styles.headerTextContainer,
                        bottom: headerTitleBottom,
                    }}>
                        <Text style={styles.headerText}>{nickname}</Text>
                    </Animated.View>
                </Animated.View>
                <ScrollView
                    style={styles.scrollerContainer}
                    scrollEnabled
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                    )}
                >
                    <Animated.View style={{
                        ...styles.avatarContainer,
                        height: profileImageHeight,
                        width: profileImageHeight,
                        marginTop: profileImageMarginTop,
                    }}>
                        <Image source={avatar} style={styles.profileAvatar} />
                    </Animated.View>
                    <Text style={styles.profileNickname}>Welcome <Text style={styles.nickname}>{nickname}</Text></Text>
                    <CookedHistory user={user} />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outestContainer: {
        flex: 1,
        backgroundColor: 'rgb(250, 250, 250)',
    },
    headerSection: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'lightskyblue',
        alignItems: 'center',
    },
    headerTextContainer: {
        position: 'absolute',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(250, 250, 250)',
    },
    scrollerContainer: {
        flex: 1,
        paddingLeft: '6%',
        paddingRight: '6%',
    },
    avatarContainer: {
        borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
        borderColor: 'white',
        borderWidth: 3,
        overflow: 'hidden',
    },
    profileAvatar: {
        flex: 1,
        width: null,
        height: null,
    },
    profileNickname: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'rgb(100, 100, 100)',
        alignSelf: 'flex-start',
        marginTop: 10,
        marginBottom: 20,
    },
    nickname: {
        color: 'rgb(150, 150, 150)'
    }
})
