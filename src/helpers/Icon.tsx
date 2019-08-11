import React from "react";
import { connect } from "react-redux";

const IconSets: { [IconSet: string]: any } = {
    AntDesign: require('react-native-vector-icons/AntDesign'),
    Feather: require("react-native-vector-icons/Feather"),
    Ionicons: require("react-native-vector-icons/Ionicons"),
    FontAwesome: require("react-native-vector-icons/FontAwesome"),
};

interface IconProps {
    iconIdentifier: string;
    iconStyle?: any;
    style?: any;
}

class Icon extends React.Component<IconProps, {}> {

    // @ts-ignore
    setNativeProps(nativeProps) {
        // @ts-ignore
        this._root.setNativeProps(nativeProps);
    }

    render() {
        let identifier = this.props.iconIdentifier || "FontAwesome/question";
        const iconParts = identifier.split("/");
        let iconPackageName = iconParts[0];
        let iconName = iconParts[1];
        if (!IconSets[iconPackageName]) {
            iconPackageName = "FontAwesome";
            iconName = "question";
        }
        const IconClass = IconSets[iconPackageName].default;
        const clonedProps: any = { ...this.props, name: iconName };
        delete clonedProps.iconIdentifier;

        if (clonedProps.iconStyle) {
            clonedProps[clonedProps.iconStyle] = true;
        }
        delete clonedProps.iconStyle;

        return (
            // @ts-ignore
            <IconClass {...clonedProps} ref={(component: any) => (this._root = component)} />
        );
    }
}

export default connect()(Icon);
