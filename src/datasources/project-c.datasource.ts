import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'ProjectC',
  connector: 'mongodb',
  url: 'mongodb+srv://user_admin:4klNnBEqsEyo7HEb@cluster0.rqwpapd.mongodb.net/project?retryWrites=true&w=majority',
  host: 'localhost',
  port: 27017,
  user: '',
  password: '',
  database: 'project',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ProjectCDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'ProjectC';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.ProjectC', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
