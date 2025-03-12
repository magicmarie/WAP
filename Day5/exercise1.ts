class Meditation {
  duration: number;

  constructor(duration: number) {
    this.duration = duration;
  }

   // using setTimeOut
start = () => {
  setTimeout(() => {
    for (let i = this.duration; i > 0; i--) {
      console.log(i);
    }

    console.log('Jay Guru Dev');
  }, 1000);
};

// using setInterval
start1 = () => {
  let i = this.duration;
  const interval = setInterval(() => {
    console.log(i);
    i--;

    if (i === 0) {
      console.log('Jay Guru Dev');
      clearInterval(interval);
    }
  }, 1000);
}

}


const morning_meditation = new Meditation(5);
morning_meditation.start();
console.log(`Start meditation`);

// Start meditation
// 5
// 4
// 3
// 2
// 1
// Jay Guru Dev
