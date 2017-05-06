import * as express from 'express';

import CatsCtrl from './controllers/cats';
import Cat from './models/cat.model';
import TableCtrl from './controllers/table';

/*export default function setRoutes(app) {

 const cats = new CatsCtrl();

 // APIs
 app.route('/api/cats').get(cats.getAll);
 app.route('/api/cats/count').get(cats.count);
 app.route('/api/cat').post(cats.insert);
 app.route('/api/cat/:id').get(cats.get);
 app.route('/api/cat/:id').put(cats.update);
 app.route('/api/cat/:id').delete(cats.delete);

 }*/
export default function setRoutes(app) {

  const table = new TableCtrl();

  app.route('/api/tables').get(table.getTables);

  app.route('/api/table').post(table.addTable);
  app.route('/api/table/:id').get(table.getTable);
  app.route('/api/team').post(table.addTeam);

  app.route('/api/user').post(table.addUser);
  app.route('/api/users').get(table.getUsers);

  app.route('/api/tournament').post(table.createTournament);
  app.route('/api/tournament/:id').get(table.getTournament);
  app.route('/api/tournament/table/:id').get(table.getTournamentTable);
  app.route('/api/tournament/table').post(table.addEntityToTournament);
  app.route('/api/tournament/match').post(table.addTournamentMatch);
}

