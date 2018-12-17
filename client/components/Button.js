import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default class Button extends Component {
    static defaultProps = {
        style: {},
    }

    render() {
        const { onPress, theme, children, icon, style } = this.props;

        const themeStyle = {
            color: theme === 'hollow' ? 'rgba(0, 0, 0, 0.5)' : (style.color || 'white'),
            backgroundColor: theme === 'hollow' ? (style.color || 'white') : 'transparent',
        }

    return ( 
        <TouchableOpacity onPress={onPress} style={{
                ...styles.outerContainer,
                ...style,
                backgroundColor: themeStyle.backgroundColor,
            }}
        >
            {
                icon && 
                <AntDesign
                    name={icon}
                    size={20}
                    style={{ marginRight: 10 }}
                    color={themeStyle.color}
                />
            }
            <Text style={{ ...styles.btnText, color: themeStyle.color }}>{children}</Text>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    outerContainer: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 19,
        fontWeight: 'bold',
    }
})