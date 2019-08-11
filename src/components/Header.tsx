import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import { IState } from '../Reducer';
import Globals from '../Globals';
import { NavigationScreenProp } from 'react-navigation';
import Icon from '../helpers/Icon';

interface IHeaderProps {
    navigation?: NavigationScreenProp<any, any>;
    theme: "Light" | "Dark";
}

class Header extends React.Component<IHeaderProps, {}> {

    render() {
        return (
            <View style={[{ backgroundColor: (this.props.theme === "Dark" ? Globals.DARK_THEME : Globals.LIGHT_THEME), flex: 1 }]}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text>Hello from Header</Text>
                    <TouchableOpacity
                        disabled={false}
                        onPress={() => { console.log(this.props); this.props.navigation && this.props.navigation.navigate("Settings") }}
                        style={[styles.settingsTouchable]}
                    >
                        <Icon
                            style={styles.settingsIcon}
                            iconIdentifier={`Ionicons/md-settings`}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    settingsIcon: {
        fontSize: 30,
        color: `rgba(255, 102, 0, 1)`
    },
    settingsTouchable: {
        flex: 1,
        marginRight: 25,
        alignItems: `center`
    },
})

function mapStateToProps(state: IState) {
    return {
        theme: state.stories.theme
    }
}

export default connect(mapStateToProps)(Header);
