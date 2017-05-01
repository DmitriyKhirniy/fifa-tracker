import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

import {DataService} from '../services/data.service';
import {ToastComponent} from '../shared/toast/toast.component';
import {IResponse} from '../../../server/models/table-cotroller.model';
import {IUser} from '../../../server/models/user.model';
import {ITeam} from '../../../server/models/team.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public users: Array<IUser>;

  public readonly currentTableId: String = '59061141cdc12728d82cf099';

  cats = [];
  isLoading = true;

  cat = {};
  isEditing = false;

  addCatForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(private http: Http,
              private dataService: DataService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getCats();

    this.loadUsers();

    this.addCatForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight
    });
  }

  private createTable(): void {
    const table: any = {
      teams: [],
      users: [],
      tournaments: []
    };

    this.dataService.addTable(table)
      .subscribe(
        (response) => {
          console.log('response: ', response);
        },
        (err: IResponse) => {
          console.log('respo: ', err);
        }
      );
  }

  public addNewTeam(): void {
    const team: ITeam = {
      title: 'Real Madrid'
    };

    this.dataService.addNewTeam(team, this.users[1]['_id'] , this.currentTableId.toString())
      .subscribe(
        (response) => {
          console.log('re: ', response);
        },
        (error) => console.log('error: ', error)
      );
  }

  public addNewUser(): void {
    const user: IUser = {
      name: 'Nikita',
      age: 27
    };

    this.dataService.addNewUser(user, this.currentTableId.toString())
      .subscribe(
        (response) => {
          console.log('response: ', response);
        },
        (err) => {
          console.log('errror: ', err);
        }
      );
  }

  public loadUsers(): void {
    this.dataService.getUsers(this.currentTableId.toString())
      .subscribe(
        (response: Array<IUser>) => {
          console.log('users: ', response);
          this.users = response;
        },
        (err) => {
          console.log('err: ', err);
        }
      );
  }

  getCats() {
    this.dataService.getCats(this.currentTableId.toString()).subscribe(
      data => {
        console.log('table: ', data);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addCat() {
    this.dataService.addCat(this.addCatForm.value).subscribe(
      res => {
        const newCat = res.json();
        this.cats.push(newCat);
        this.addCatForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(cat) {
    this.isEditing = true;
    this.cat = cat;
  }

  cancelEditing() {
    this.isEditing = false;
    this.cat = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getCats();
  }

  editCat(cat) {
    this.dataService.editCat(cat).subscribe(
      res => {
        this.isEditing = false;
        this.cat = cat;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCat(cat) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dataService.deleteCat(cat).subscribe(
        res => {
          const pos = this.cats.map(elem => {
            return elem._id;
          }).indexOf(cat._id);
          this.cats.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
