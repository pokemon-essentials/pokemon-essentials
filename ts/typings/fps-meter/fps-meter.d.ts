/**
 * Allows you to capture the frames-per-second metrics of your application. 
 */
declare class FPSMeter {

   /**
    * Starts the frames-per-second meter.
    */
    start(): void;

   /**
    * Stops the frames-per-second meter.
    */
    stop(): void;

   /**
    * Returns a valid indicating whether the frames-per-second meter is currently running.
    */
    running(): boolean;

   /**
    * Adds a callback function to be called each time FPS data is due to be reported. Returns an unique id which can be used to remove this callback later.
    */
    addCallback(callback: (fps: number, minFps?: number) => void): number;

   /**
    * Removes the callback with the specified id.
    */
    removeCallback(id: number);
}