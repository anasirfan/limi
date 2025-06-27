import { designIdMap } from './designIdMap';

export function sendToIframe(type, value, index) {
  const iframe = document.getElementById('playcanvas-app');
  if (!iframe || !iframe.contentWindow) return;
  let message;
  if (type === 'cable') {
    message = `cable_${index}:${value}`;
  } else {
    message = `${type}:${value}`;
  }
  iframe.contentWindow.postMessage(message, '*');
}

export function sendCableConfig(index, cable) {
  if (cable.isSystem) {
    sendToIframe('system', cable.systemType);
    sendToIframe('cable', cable.designId, index);
  } else {
    sendToIframe('cable', cable.designId, index);
  }
}

export function sendFullConfig(config) {
  sendToIframe('light_type', config.lightType);
  sendToIframe('light_amount', config.lightAmount);
  sendToIframe('base_type', config.baseType);
  sendToIframe('base_color', config.baseColor);
  sendToIframe('cable_color', config.cableColor);
  sendToIframe('cable_length', config.cableLength);
  config.cables.forEach((cable, i) => sendCableConfig(i, cable));
}
