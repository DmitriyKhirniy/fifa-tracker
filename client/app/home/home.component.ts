import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

import {DataService} from '../services/data.service';
import {ToastComponent} from '../shared/toast/toast.component';
import {IResponse} from '../../../server/models/table-cotroller.model';
import {IUser} from '../../../server/models/user.model';
import {ITeam} from '../../../server/models/team.model';
import {ITournament} from "../../../server/models/tournament.model";
import {ITournamentTable} from "../../../server/models/tournament-table.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public users: Array<IUser>;

  public tournamentTable: Array<ITournamentTable>;


  public readonly currentTableId: String = '59061141cdc12728d82cf099';
  public readonly currentTournamntId: String = '5907643004e0c70134d7bb61';

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

    this.getTournamentTable();

    this.addCatForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight
    });
  }

  private getTournamentTable(): void {
    this.dataService.getTournamentTable(this.currentTableId.toString(), this.currentTournamntId.toString())
      .subscribe(
        (response: Array<ITournamentTable>) => {
          console.log('tour: ', response);
          if (response) {
            this.tournamentTable = response;
          }
        }
      );
  }

  private addTeamToTournamentTable(): void {

    const request: any = {
      teamId: '59077982bac21a233019d239',
      tableId: this.currentTableId.toString(),
      tournamentId: this.currentTournamntId.toString()
    }

    this.dataService.addEntityToTournamentTable(request)
      .subscribe(
        (respose) => {
          console.log('table created: ', respose);
        },
        (err) => console.log('error: ', err)
      );
  }

  private createTournament(): void {
    const tournament: ITournament = {
      title: 'Test FIFA tournament',
      createdDate: new Date,
      table: [],
      matches: []
    };

    this.dataService.createTournament(tournament, this.currentTableId.toString())
      .subscribe(
        (response: any) => {
          console.log('tournament created: ', response);
        },
        (error) => console.log('errr: ', error)
      );
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
      title: 'Bayern Munich'
    };

    this.dataService.addNewTeam(team, this.users[4]['_id'], this.currentTableId.toString())
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
