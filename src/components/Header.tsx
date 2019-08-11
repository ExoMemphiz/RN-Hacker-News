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

    goBack = () => {
        this.props.navigation && this.props.navigation.goBack();
    }

    getHeaderStyle = () => {
        return [
            styles.header,
            { backgroundColor: (this.props.theme === "Dark" ? Globals.DARK_THEME : Globals.LIGHT_THEME) },
            { borderBottomColor: (this.props.theme === "Dark" ? "#333" : "#EEE") },
            { flex: .092 }
        ]
    }

    render() {

        let routeName = this.props.navigation && this.props.navigation.state.routeName;

        return (
            <View style={this.getHeaderStyle()}>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", paddingTop: `3%` }}>
                    <View style={{ flex: 1, flexDirection: "row", marginLeft: 25, marginRight: 35 }}>
                        {routeName !== "Home" && <TouchableOpacity
                            disabled={false}
                            onPress={this.goBack}
                            style={[{ paddingTop: 2, marginRight: 15 }]}
                        >
                            <Icon
                                style={styles.backArrow}
                                iconIdentifier={`AntDesign/arrowleft`}
                            />
                        </TouchableOpacity>
                        }
                        <Text style={styles.headerText}>{routeName}</Text>
                    </View>
                    {routeName === "Home" &&
                        < TouchableOpacity
                            disabled={false}
                            onPress={() => { console.log(this.props); this.props.navigation && this.props.navigation.navigate("Settings") }}
                            style={[{ marginRight: 25 }]}
                        >
                            <Icon
                                style={styles.settingsIcon}
                                iconIdentifier={`Ionicons/md-settings`}
                            />
                        </TouchableOpacity>
                    }

                </View>

            </View >
        )
    }

}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 2
    },
    headerText: {
        color: `rgba(255, 102, 0, 1)`,
        fontWeight: `500`,
        fontSize: 20
    },
    backArrow: {
        fontSize: 24,
        color: `rgba(255, 102, 0, 1)`
    },
    settingsIcon: {
        fontSize: 30,
        color: `rgba(255, 102, 0, 1)`
    },
})

function mapStateToProps(state: IState) {
    return {
        theme: state.stories.theme
    }
}

export default connect(mapStateToProps)(Header);
