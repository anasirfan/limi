// Replay a saved iframe message array
import { sendToIframe } from './iframeMessenger';

export async function replayIframeMessages(messages) {
  for (let i = 0; i < messages.length; i++) {
    sendToIframe(...messages[i]);
    await new Promise(res => setTimeout(res, 100));
  }
}
