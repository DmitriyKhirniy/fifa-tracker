import {IResponse} from '../models/table-cotroller.model';
import {ITeam} from '../models/team.model';
import {IUser} from '../models/user.model';
import {ITable} from "../models/table.model";

export abstract class TableBaseCtrl {

  abstract model: any;

  public addTeam = (req, res): any => {
    this.model.findOne({_id: req.body.tableId}, (err, entity) => {

      if (err) {
        return res.status(400).json({message: err.toString()});
      }

      console.log(req.body);

      console.log('entity: ', entity.users)
      const user: IUser = entity.users.filter((element) => {
        return element._id.toString() === req.body.userId.toString();
      })[0];

      console.log('user: ', user);
      if (!user) {
        return res.status(404).json({message: 'User not found!'});
      }

      if (req.body && req.body.team) {
        const team: ITeam = req.body.team;
        team.user = user;
        entity.teams.push(team);
        entity.save((error, _team) => {
          console.log('team: ', _team);
        });
        return res.status(200).json({message: 'Added.'});
      } else {
        return res.status(400).json({message: 'Body object team not found.'});
      }
    });
  }

  public getTable = (req, res) => {
    this.model.findOne({_id: req.params.id}, (err, entity) => {
      if (err) {
        return res.status(400).json({message: err.toString()});
      }

      return res.status(200).json(entity);
    });
  }

  public getTables = (req, res) => {
    this.model.find({}, (err, entity) => {

      if (err) {
        return res.status(400).json({message: err.toString()});
      }

      return res.status(200).json(entity);
    });
  }

  public addTable = (req, res) => {
    const obj = new this.model(req.body);
    obj.save((err, item) => {
      if (err) {
        return res.status(404).json({message: err.to()});
      }
      res.status(200).json(item);
    });
  }

  public getUsers = (req, res) => {
    this.model.findOne({_id: req.query.tableId}, (err, entity) => {
      if (err) {
        return res.status(400).json({message: err.toString()});
      }

      return res.status(200).json(entity.users);
    });
  }

  public addUser = (req, res) => {
    this.model.findOne({_id: req.body.id}, (err, entity) => {
      if (err) {
        return res.status(400).json({message: err.toString()});
      }

      if (entity) {
        entity.users.push(req.body.user);
        entity.save();
      }

      return res.status(200).json({message: 'New user added.'});
    })
  }

  public getUser = (req, res) => {
    this.model.findOne({_id: req.params.id}, (err, entity) => {
      if (err) {
        return res.status(400).json({message: err.toString()});
      }

      return res.status(200).json(entity);
    })
  }

  public createTournament = (req, res) => {
    this.model.findOne({_id: req.body.tableId}, (err, entity) => {
      if (err) {
        return res.status(400).json({message: err.toString()});
      }

      entity.tournaments.push(req.body.tournament);
      entity.save();
      return res.status(201).json({message: 'Created.'});
    });
  }

  public getTournament = (req, res) => {
    this.model.findOne({_id: req.query.tableId}, (err, entity) => {
      if (err) {
        return res.status(400).json({message: err.toString()});
      }

      const tournament: any = entity.tournaments.filter((element) => {
        return element._id.toString() === req.params.id.toString();
      })[0];

      if (!tournament) {
        return res.status(404).json({message: 'Tournament not found.'});
      }

      return res.status(200).json(tournament);
    });
  }

  public getTournamentTable = (req, res) => {
    this.model.findOne({_id: req.query.tableId}, (err, entity) => {
      if (err) {
        return res.status(400).json({message: err.toString()});
      }

      const tournament: any = entity.tournaments.filter((element) => {
        return element._id.toString() === req.params.id.toString();
      })[0];

      if (!tournament) {
        return res.status(404).json({message: 'Tournament not found.'});
      }

      return res.status(200).json(tournament.table);
    });
  }

  public getTournamentMatches = (req, res) => {
    this.model.findOne({_id: req.query.tableId}, (err, entity) => {
      if (err) {
        return res.status(400).json({message: err.toString()});
      }

      const tournament: any = entity.tournaments.filter((element) => {
        return element._id.toString() === req.params.id.toString();
      })[0];

      if (!tournament) {
        return res.status(404).json({message: 'Tournament not found.'});
      }

      return res.status(200).json(tournament.matches);
    });
  }

  public addEntityToTournament = (req, res) => {
    this.model.findOne({_id: req.body.tableId}, (err, entity) => {
      if (err) {
        return res.status(400).json({message: err.toString()});
      }

      const tournament: any = entity.tournaments.filter((element) => {
        return element._id.toString() === req.body.tournamentId.toString();
      })[0];

      if (!tournament) {
        return res.status(404).json({message: 'Tournament not found.'});
      }

      const team: any = entity.teams.filter((element) => {
        return element._id.toString() === req.body.teamId.toString();
      })[0];

      if (!team) {
        return res.status(404).json({message: 'Team not found.'});
      }

      const value: any = {
        scored: 0,
        missed: 0,
        games: 0,
        difference: 0,
        series: [],
        points: 0,
        team: team
      };

      tournament.table.push(value);

      entity.save();

      return res.status(200).json(value);
    });
  }

  public addTournamentMatch = (req, res) => {
    this.model.findOne({_id: req.body.tableId}, (err, entity) => {
      if (err) {
        return res.status(400).json({message: err.toString()});
      }
      const tournament: any = entity.tournaments.filter((element) => {
        return element._id.toString() === req.body.tournamentId.toString();
      })[0];
      if (!tournament) {
        return res.status(404).json({message: 'Tournament not found.'});
      }

      const homeEntity: any = tournament.table.filter((element) => {
        return element._id.toString() === req.body.home.teamId.toString();
      })[0];

      const awayEntity: any = tournament.table.filter((element) => {
        return element._id.toString() === req.body.away.teamId.toString();
      })[0];

      const homeScored: number = req.body.home.scored;
      const awayScored: number = req.body.away.scored;

      if (homeEntity && awayEntity) {
        homeEntity.scored += homeScored;
        homeEntity.missed += awayScored;
        awayEntity.scored += awayScored;
        awayEntity.missed += homeScored;
        homeEntity.games++;
        awayEntity.games++;

        homeEntity.difference += (homeScored - awayScored);
        awayEntity.difference += (awayScored - homeScored);

        if (!homeEntity.points) {
          homeEntity.points = 0;
        }

        if (!awayEntity.points) {
          awayEntity.points = 0;
        }

        if (homeScored === awayScored) {
          homeEntity.points++;
          homeEntity.series.push({value: 'D'});
          awayEntity.points++;
          awayEntity.series.push({value: 'D'});
        } else if (homeScored > awayScored) {
          homeEntity.points += 3;
          homeEntity.series.push({value: 'W'});
          awayEntity.series.push({value: 'L'});
        } else {
          awayEntity.points += 3;
          awayEntity.series.push({value: 'W'});
          homeEntity.series.push({value: 'L'});
        }

        tournament.table.sort((_a, _b) => {
          return _b.points - _a.points;
        });
      }

      const match: any = {
        home: {
          scored: req.body.home.scored,
          team: homeEntity.team
        },
        away: {
          scored: req.body.away.scored,
          team: awayEntity.team
        }
      };

      console.log('match: ', match);
      console.log('table: ', tournament.table);
      entity.save();
      return res.status(200).json(tournament.table);
    });
  }

}
