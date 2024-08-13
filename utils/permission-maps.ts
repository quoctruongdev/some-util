export enum Roles {
  Viewer = "VIEWER",
  Editor = "EDITOR",
  Owner = "OWNER",
}

export type RoleValues = (typeof Roles)[keyof typeof Roles];

export enum Scopes {
  CanCreate = "can-create",
  CanEdit = "can-edit",
  CanDelete = "can-delete",
  CanView = "can-view",
}

export type ScopeValues = (typeof Scopes)[keyof typeof Scopes];

export type Permissions = {
  [key in Roles]: Scopes[];
};

export const PERMISSIONS: Permissions = {
  [Roles.Viewer]: [Scopes.CanView],
  [Roles.Editor]: [Scopes.CanView, Scopes.CanEdit],
  [Roles.Owner]: [
    Scopes.CanView,
    Scopes.CanEdit,
    Scopes.CanCreate,
    Scopes.CanDelete,
  ],
};
