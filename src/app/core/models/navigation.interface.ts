export enum NavigationPath {
  Home = '',
  Map = 'map',
  Report = 'report',
  Login = 'login',
  // whatever = 'whatever',
}

export interface NavigationLink {
  route: NavigationPath;
  label: string;
  params?: Record<string, any>;
}
