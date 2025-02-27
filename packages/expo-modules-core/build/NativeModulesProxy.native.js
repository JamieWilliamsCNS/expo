import { NativeModules } from 'react-native';
const NativeProxy = NativeModules.NativeUnimoduleProxy;
const modulesConstantsKey = 'modulesConstants';
const exportedMethodsKey = 'exportedMethods';
const NativeModulesProxy = {};
if (NativeProxy) {
    Object.keys(NativeProxy[exportedMethodsKey]).forEach((moduleName) => {
        NativeModulesProxy[moduleName] = NativeProxy[modulesConstantsKey][moduleName] || {};
        NativeProxy[exportedMethodsKey][moduleName].forEach((methodInfo) => {
            NativeModulesProxy[moduleName][methodInfo.name] = (...args) => {
                const { key, argumentsCount } = methodInfo;
                if (argumentsCount !== args.length) {
                    return Promise.reject(new Error(`Native method ${moduleName}.${methodInfo.name} expects ${argumentsCount} ${argumentsCount === 1 ? 'argument' : 'arguments'} but received ${args.length}`));
                }
                return NativeProxy.callMethod(moduleName, key, args);
            };
        });
        // These are called by EventEmitter (which is a wrapper for NativeEventEmitter)
        // only on iOS and they use iOS-specific native module, EXReactNativeEventEmitter.
        //
        // On Android only {start,stop}Observing are called on the native module
        // and these should be exported as Expo methods.
        NativeModulesProxy[moduleName].addListener = (...args) => NativeModules.EXReactNativeEventEmitter.addProxiedListener(moduleName, ...args);
        NativeModulesProxy[moduleName].removeListeners = (...args) => NativeModules.EXReactNativeEventEmitter.removeProxiedListeners(moduleName, ...args);
    });
}
else {
    console.warn(`The "UMNativeModulesProxy" native module is not exported through NativeModules; verify that @unimodules/react-native-adapter's native code is linked properly`);
}
export default NativeModulesProxy;
//# sourceMappingURL=NativeModulesProxy.native.js.map