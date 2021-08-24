// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

interface Observable {
  attach(o: Observer);
  detach(o: Observer);
  notify();
}

interface Observer {
  update();
}

class YoutubeChannel implements Observable {
  private channelSubcribers: Observer[] = [];
  private lastVideoPosted: string = '';

  attach(o: Observer) {
    this.channelSubcribers.push(o);
  }
  detach(o: Observer) {
    this.channelSubcribers.pop();
  }

  addNewVideo(tittle: string) {
    this.lastVideoPosted = tittle;
    this.notify();
    console.log('New youtube video added to channel');
  }

  lastVideoTittle() {
    return this.lastVideoPosted;
  }

  notify() {
    for (let subcriptors of this.channelSubcribers) {
      subcriptors.update();
    }
  }
}

class Suscriber implements Observer {
  private observable = null;

  constructor(observable: YoutubeChannel) {
    this.observable = observable;
  }

  update() {
    console.log('New video posted!');
    console.log(this.observable.lastVideoTittle());
  }
}

let channel = new YoutubeChannel();

let s1 = new Suscriber(channel);
let s2 = new Suscriber(channel);

channel.attach(s1);
channel.attach(s2);

channel.addNewVideo('Video del patron observer');
