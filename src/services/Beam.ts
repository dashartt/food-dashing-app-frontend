import * as PusherPushNotifications from "@pusher/push-notifications-web";

export default class Beam {
  static instance: PusherPushNotifications.Client;

  static subscribe(interest: string) {
    Beam.instance = new PusherPushNotifications.Client({
      instanceId: process.env.NEXT_PUBLIC_BEAM_ID as string,
    });

    Beam.instance
      .start()
      .then(() => {
        console.log("Beam instance started");

        Beam.instance
          .addDeviceInterest(interest)
          .then(() => console.log(`Beam instance subscribed on: ${interest}`))
          .catch((error) =>
            console.log(
              `Beam instance not subscribed on ${interest} \n Error: `,
              error
            )
          );
      })
      .catch((error) =>
        console.log("Beam instance not started \n Error: ", error)
      );
  }
}
