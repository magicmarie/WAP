[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/caPhPr9K)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=18521858)

## CS472-Node-Event-Loop
### Update the `README.md` file, to include the answers to the following questions:
1. What is LibUV?
   - LibUV is a C library that performs Node.js's async I/O operations.
   - It provides the Event loop for managing the async operations.
   - It has the thread pool or worker pool for CPU intensive or CPU bound tasks.
   - It provides timers e.g setTimeOut, setInterval, setImmediate.
   - It provides the async non blocking I/O to manange the Event Loop. Ops like le handling, networking, timers etc.
   - It provides Cross Platform Compatibility(windows, macos, Linux).


2. How does Node.js handle I/O operations asynchronously? What role does the event loop play in this process?
   Node.js is non-blocking and handles I/O operations asynchronously using the Event Loop and libuv.
   The Event loop is at the heart of Node's async behavior. It manages th execution of the non blocking tasks. The LibUV delegates the I/O ops to her the OS or the thread pool.

   So when an I/O operation (e.g., file read, network request) is triggered:
   - Node delegates I/O tasks to the OS via libuv.
   - The Event Loop continues running other code without waiting.
   - Once the OS completes the operation, libuv sends the result back.
   - The Event Loop executes the callback function.


3. What are the advantages and limitations of a single-threaded model?
   Advantages:
   - Efficient for I/O operations (handles thousands of concurrent requests).
   - No thread synchronization issues (avoids deadlocks, race conditions).
   - Lightweight (uses less memory compared to multi-threaded systems).

   Limitations:
   - CPU-intensive tasks block the event loop (e.g., large computations slow down everything).
   - Single core utilization (doesn’t use multiple CPU cores efficiently).
   - Limited scalability for heavy processing (use worker_threads for CPU-bound tasks).


4. What is the difference between `setImmediate(f)` and `setTimeout(f, Time)`?

   The key difference between setImmediate(f) and setTimeout(f, Time) lies in when they execute in the Node.js event loop.

   setImmediate(f) schedules a function to run right after the current I/O phase, meaning it executes as soon as possible once the current event loop cycle completes. Best use case is When you need to run a callback ASAP after I/O.
   setTimeout(f, Time), even if the time is 0ms, places the function into the timers queue, which means it waits at least for the next event loop cycle before running.  Best case scenario is When you need a delayed function execution.


5. What is the difference between `process.nextTick(f)` and `setImmediate(f)`?

   The difference between process.nextTick(f) and setImmediate(f) lies in when they execute in the event loop and how they impact performance.

   process.nextTick(f) Executes immediately after the current operation and before the event loop continues to the next phase. It effectively hijacks control of the event loop, meaning if you call process.nextTick repeatedly, you can block I/O and delay timers. It is often used for handling errors or critical async operations that must run before anything else.

   setImmediate(f) Runs after I/O callbacks in the check phase of the event loop. Unlike process.nextTick, it allows the event loop to proceed naturally, meaning it doesn't starve I/O operations. Best used when you need a non-blocking way to schedule tasks after I/O.

6. What is the difference between `process.nextTick(f)` and `queueMicrotask(f)`?

   The difference between process.nextTick(f) and queueMicrotask(f) lies in their execution timing and behavior within the event loop.

   process.nextTick(f) schedules the callback to run immediately after the current operation completes, before the event loop continues. This means it blocks the event loop if called recursively, potentially starving I/O tasks. It is Node.js-specific and not available in the browser.

   queueMicrotask(f) schedules the callback at the end of the current microtask queue, similar to how JavaScript’s Promises work. Unlike process.nextTick, it does not block the event loop, ensuring the event loop progresses naturally. It is standard JavaScript and works in both Node.js and browsers.


7. Name 10 of Node Core modules

   Node.js Core Modules are built-in modules without needing installation.
   I ran these commands in the commandline to find them.
   ```
   node

   console.log(require('module').builtinModules);
   ```

   - fs (File System) – Handles file operations.
   - http – Creates web servers.
   - https – Handles secure HTTP requests.
   - url – Parses and formats URLs.
   - path – Works with file paths.
   - os – Provides OS-related information.
   - crypto – Handles encryption and hashing.
   - events – Implements event-driven programming.
   - stream – Handles data streams (e.g., reading files).
   - util – Provides utility functions.


8. Name 10 of Node Global objects

   Node.js Global Objects are available everywhere without requiring require().
   I ran these commands in the commandline to find them.
   ```
   node

   console.log(Reflect.ownKeys(global));
   ```

   - global – The global namespace object.
   - process – Provides process information (like process.env).
   - console – Used for logging (console.log).
   - Buffer – Handles binary data.
   - setTimeout() – Executes a function after a delay.
   - setInterval() – Repeats execution at intervals.
   - setImmediate() – Executes after the current event loop phase.
   - clearTimeout() – Cancels setTimeout().
   - clearInterval() – Cancels setInterval().
   - __dirname – Returns the current directory path.


#### Navigate to the `test` folder, run `npm i`
Write down your observation and explain what happens in Node when you run the following commands:
   1. `npm run start`
   2. For Windows: `SET UV_THREADPOOL_SIZE=2 && npm run start`
   3. For MacOS: `export UV_THREADPOOL_SIZE=2 && npm run start`

   When you run npm run start and execute this script the first time, here’s what happens:

   pbkdf2 Uses the Worker Pool: pbkdf2 (from crypto) is a CPU-intensive operation that runs in Node.js's thread pool (powered by libuv). By default, Node.js has 4 worker threads in the thread pool (unless you change it using UV_THREADPOOL_SIZE). Since you're calling pbkdf2 12 times, but only 4 threads are available, the first 4 will start immediately, and the rest will wait in a queue.

   ![alt text](<Screenshot 2025-03-04 at 15.18.56.png>)

   The first 4 pbkdf2 calls are executed immediately by the 4 worker threads. The remaining 8 calls wait in the queue. When a thread finishes one task, it picks up the next one from the queue. Since pbkdf2 operations take a similar time to compute, you’ll likely see batches of 4 completing around the same time.

   If you set UV_THREADPOOL_SIZE=2, Node.js will only have 2 worker threads available in the thread pool. Here’s what will happen when you run the script: Since pbkdf2 is CPU-intensive and runs in the worker pool: Only 2 pbkdf2 calls will start immediately. The remaining 10 calls will wait in a queue.
   As soon as a thread finishes a task, it picks the next one from the queue.

   Task 1 & 2 start immediately (since we have 2 worker threads).
   Tasks 3-12 are in the queue.
   - 1 & 2 finish → now 3 & 4 start.
   - 3 & 4 finish → now 5 & 6 start.
   - 5 & 6 finish → now 7 & 8 start.
   - 7 & 8 finish → now 9 & 10 start.
   - 9 & 10 finish → now 11 & 12 start.
   - 11 & 12 finish.

![alt text](<Screenshot 2025-03-04 at 15.19.20.png>)
