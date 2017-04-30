import {IResponse} from '../models/table-cotroller.model';
import {ITeam} from '../models/team.model';

export abstract class TableBaseCtrl {

  abstract model: any;

  public addTeam = (req, res): ITeam | IResponse => {
    this.model.find({}, (err, entity) => {

      if (err) {
        return res.status(400).json({message: err.toString()});
      }

      if (req.body && req.body.team) {
        entity.teams.push(req.body.team);
        entity.save((error, team) => {
          console.log('team: ', team);
        });
      } else {
        return res.status(400).json({message: 'Body object team not found.'});
      }
    });

    return res.status(500).json({message: 'Cant create new team.'});
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

  public getUsers = (req , res) => {
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
    this.model.findOne({_id: req.params.id} , (err , entity) => {
      if (err) {
        return res.status(400).json({message: err.toString()});
      }

      return res.status(200).json(entity);
    })
  }
}
