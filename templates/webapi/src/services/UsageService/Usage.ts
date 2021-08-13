import { cpu, mem } from "node-os-utils";

export type Usage = {
  ramPercentage: string;
  ramMB: number;
  cpu: string;
};

export var usage: Usage = {
  ramPercentage: "-1%",
  ramMB: -1,
  cpu: "-1%",
};

var timeout: NodeJS.Timeout;
export var recording: boolean = false;

export function startRecording(
  interval: number,
  callback: (usage: Usage) => void
) {
  if (timeout != undefined) throw new Error("Recording is already started!");
  recording = true;
  record(100, callback);

  timeout = setInterval(async () => {
    record(interval, callback);
  }, interval);
}

async function record(interval: number, callback: (usage: Usage) => void) {
  var cpuUsage = (await cpu.usage(interval)) + "%";
  var memoryUsed = await mem.used();

  var ramPercentage =
    Math.round(
      (memoryUsed.usedMemMb / memoryUsed.totalMemMb) * 100
    ).toString() + "%";

  var ramMB = memoryUsed.usedMemMb;

  usage = {
    cpu: cpuUsage,
    ramPercentage: ramPercentage,
    ramMB: ramMB,
  };

  callback(usage);
}

export function stopRecoring() {
  recording = false;
  if (timeout != undefined) clearInterval(timeout);
}
