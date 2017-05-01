import {IResponse} from '../models/table-cotroller.model';
import {ITeam} from '../models/team.model';
import {IUser} from '../models/user.model';

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

}
