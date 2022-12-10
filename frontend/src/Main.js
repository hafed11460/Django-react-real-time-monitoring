import React, { useReducer } from 'react';
import AppContext from 'context/Context';
import { settings } from './config';
import { configReducer } from './reducers/configReducer';
import { getColor, getItemFromStore } from 'helpers/utils';
import useToggleStylesheet from 'hooks/useToggleStyle';

const Main = props => {
    const configState = {
        isDark: getItemFromStore('isDark', settings.isDark),
        isHide: getItemFromStore('isHide', settings.isHide),
        isSidebar: getItemFromStore('isHide', settings.isSidebar),
    };

    const [config, configDispatch] = useReducer(configReducer, configState);

    const { isLoaded } = useToggleStylesheet(
        // config.isRTL,
        config.isDark,
        configDispatch
      );

    const setConfig = (key, value) => {
        configDispatch({
            type: 'SET_CONFIG',
            payload: {
                key,
                value,
                setInStore: [
                    'isDark',
                    'isHide',
                    'isSidebar',
                ].includes(key)
            }
        });
    };

    //   if (!isLoaded) {
    //     return (
    //       <div
    //         style={{
    //           position: 'fixed',
    //           top: 0,
    //           right: 0,
    //           bottom: 0,
    //           left: 0,
    //         //   backgroundColor: config.isDark ? getColor('dark') : getColor('light')
    //         }}
    //       />
    //     );
    //   }

    return (
        <AppContext.Provider value={{ config, setConfig, configDispatch }}>
            {props.children}
        </AppContext.Provider>
    );
};



export default Main;
