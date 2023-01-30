/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  ViroARPlane,
  ViroARPlaneSelector,
  ViroARScene,
  ViroARSceneNavigator,
  ViroBox,
  ViroTrackingStateConstants,
} from '@viro-community/react-viro';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

function App() {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
}

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');
  const [foundAnchor, setFoundAnchor] = useState<any>(null);
  const arSceneRef = React.useRef(null);

  function onInitialized(state: any, reason: any) {
    console.log('guncelleme', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setText('Tracking unavailable');
    }
  }

  return (
    <ViroARScene
      onAnchorFound={foundAnchorId => setFoundAnchor(foundAnchorId)}
      onAnchorUpdated={() => console.log('onAnchorUpdated')}
      onAnchorRemoved={() => console.log('onAnchorRemoved')}>
      {foundAnchor && (
        <ViroARPlane anchorId={foundAnchor.anchorId}>
          <ViroBox position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]} />
        </ViroARPlane>
      )}
    </ViroARScene>
  );
};

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Poppins',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default App;
