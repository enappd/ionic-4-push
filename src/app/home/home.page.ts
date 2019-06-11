import { Component } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pushes: any = [];
  constructor(private fcm: FCM, public plt: Platform) {
    this.plt.ready()
      .then(() => {
        this.fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            console.log(data)
            console.log("Received in background");
            this.pushes.push({
              body: data.body,
              title: data.title
            })
            console.log(this.pushes)
          } else {
            console.log(data)
            console.log("Received in foreground");
            this.pushes.push({
              body: data.body,
              title: data.title
            })
            console.log(this.pushes)
          };
        });

        this.fcm.onTokenRefresh().subscribe(token => {
          // Register your new token in your back-end if you want
          // backend.registerToken(token);
        });
      })
  }
  subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
  }
  getToken() {
    this.fcm.getToken().then(token => {
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }
  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
  }
}
