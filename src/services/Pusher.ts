import type { Channel } from "pusher-js";
import PusherInit from "pusher-js";

export default class Pusher {
  static channel: Channel;

  static subscribe(channel: string) {
    Pusher.channel = new PusherInit(
      process.env.NEXT_PUBLIC_PUSHER_KEY as string,
      {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
      }
    ).subscribe(channel);
  }

  static onEvent(event: string, callback: Function) {
    Pusher.channel.bind(event, callback);
  }
}
