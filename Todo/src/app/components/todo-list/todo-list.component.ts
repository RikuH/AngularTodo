import { Component, OnInit } from '@angular/core';
import { Todo } from '../../interface/Todo';
import { trigger, transition, style, animate } from '@angular/animations';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth'
import { firestore } from 'firebase';
import { Title } from '@angular/platform-browser';
export interface CommentId extends Comment { id?: string };

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger('fade',
      [
        transition(':enter',
          [
            style(
              {
                opacity: 0,
                transform: 'translateX(-30px)',
              },
            ),
            animate(200, style(
              {
                opacity: 1,
                transform: 'translateX(0px)',
              }
            )
            )
          ]
        ),
      ]
    )
  ],
})
export class TodoListComponent implements OnInit {
  //Database stuff
  ToDoList: AngularFireList<any>;
  ToDoListArray:any[];

  constructor(private db: AngularFireDatabase) {
  }

  getToDoList(){
    this.ToDoList = this.db.list("todos");
    return this.ToDoList;
  }

  onAdd(itemTitle){
    this.addTodo(itemTitle.value);
    itemTitle.value = null;
  }

  ngOnInit(): void {
    this.getToDoList().snapshotChanges().subscribe(item=>{
      this.ToDoListArray = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.ToDoListArray.push(x);
      })
    })
  }

  addTodo(title: string): void {
    console.log("add");
    this.ToDoList.push({
      title: title,
      isChecked: false
    })

  }

  deleteTodo($key: string): void {
    this.ToDoList.remove($key);
  }

  toggleTodo($key:string, flag: boolean){
    this.ToDoList.update($key,{isChecked:flag});
  }

}
