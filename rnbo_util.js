import { createDevice, TimeNow, MessageEvent } from "@rnbo/js";

class RNBO_device {
  constructor() {
    const WAContext = window.AudioContext || window.webkitAudioContext; // this is what the audio will play though
    this.context = new WAContext();
    this.gainNode = new GainNode(context);
    gainNode.connect(context.destination);
    gainNode.gain.value = 0;
  }

  async init(patcher, dependencies) {
    this.device = await createDevice({ context: this.context, patcher });
    this.device.node.connect(this.context.destination);

    if (dependencies) {
      // Load the dependencies into the device
      const results = await this.device.loadDataBufferDependencies(
        dependencies
      );
      results.forEach((result) => {
        if (result.type === "success") {
          console.log(`Successfully loaded buffer with id ${result.id}`);
        } else {
          console.log(
            `Failed to load buffer with id ${result.id}, ${result.error}`
          );
        }
      });
    }
  }

  sendMessage(tag, message) {
    const event1 = new MessageEvent(TimeNow, tag, [message]);
    this.device.scheduleEvent(event1);
  }

  setParam(param, value) {
    const p = this.device.parametersById.get(param);
    p.value = value;
  }
}

export default RNBO_device;
