import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-todo';
  todos: any[];

  constructor(db: AngularFireDatabase) {
    db.list('/todos').valueChanges().subscribe(todos => {
      this.todos = todos;
      //console.log(this.todos);
    }
    )
  }
}
