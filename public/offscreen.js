chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "PLAY_TTS_BACKGROUND" && message.audioUrl) {
    const { audioUrl } = message;
    (async () => {
      try {
        const audio = new Audio(audioUrl);
        audio.onended = () => {
          chrome.runtime.sendMessage({ type: "PLAY_TTS_DONE" });
        };
        await audio.play();
        sendResponse({ success: true });
      } catch (error) {
        console.error("Offscreen: error playing audio", error);
        sendResponse({ success: false, error: String(error) });
      }
    })();
    return true;
  }
});