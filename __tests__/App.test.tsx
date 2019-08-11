import 'react-native-gesture-handler/jestSetup';
import "react-native";
import React from "react";
import App from "../App";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

jest.mock('NativeAnimatedHelper').mock('react-native-gesture-handler', () => {
    const View = require('react-native/Libraries/Components/View/View');
    return {
        State: {},
        PanGestureHandler: View,
        BaseButton: View,
        Directions: {},
    };
});

describe(`App`, () => {
    test(`Can render correctly`, () => {
        renderer.create(<App />)
    });
})
