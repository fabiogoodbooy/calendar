import { Component ,ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  events!: any[]  ;
  data :any ;



  constructor() {}
  ngOnInit() {
    fetch('./assets/input.json').then(res => res.json())
    .then(jsonData => {
      this.events = jsonData;

    });
  }
  // Calculate the top position of the event based on its start time
   getTop(event: any): string {
    const startHour = +event.start.split(':')[0];
    const startMinute = +event.start.split(':')[1];
    const top = (startHour - 9) * 60 + startMinute;
    console.log('top', event);
    return top + 'px';

  }

  // Calculate the height of the event based on its duration
  getHeight(event: any): string {
    return (event.duration / 60) * 60 + 'px';
  }

  // Calculate the left position of the event
  getLeft(event: any): string {
     // Find the first event that starts before this event ends
     const overlappingEvents = this.events.filter(e => {
      const eventEnd = this.getEventEnd(event);
      return this.getEventEnd(e) > eventEnd;
    });

    // Calculate the left position based on the start time of the event
    const startHour = +event.start.split(':')[0];
    const startMinute = +event.start.split(':')[1];
    const left = (startHour - 9) * 60 + startMinute;
    return left + 'px';
  }

  // Calculate the width of the event
  getWidth(event: any): string {
      // Find the first event that starts after this event ends
      const overlappingEvents = this.events.filter(e => {
        const eventEnd = this.getEventEnd(event);
        return this.getEventEnd(e) > eventEnd;
      });
  
      // Calculate the width based on the number of overlapping events
      const width = 100 / (overlappingEvents.length + 1);
      return width + '%';
  }

  // Calculate the end time of an event based on its start time and duration
  getEventEnd(event: any): number {
    const startHour = +event.start.split(':')[0];
    const startMinute = +event.start.split(':')[1];
    return startHour * 60 + startMinute + event.duration;
  }
}
