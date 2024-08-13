import { cloneElement, ReactElement } from "react";
import { PERMISSIONS, Scopes, ScopeValues } from "@/utils/permission-maps";

import { PropsWithChildren } from "react";
import { useGetRole } from "@/hooks";

interface PermissionProps {
  permissions: Scopes[];
  scopes: ScopeValues[];
}
interface PermissionsGateProps extends PropsWithChildren {
  scopes: ScopeValues[];
  RenderError?: React.ReactNode;
  errorProps?: {
    disabled: boolean;
  };
}
const hasPermission = ({ permissions, scopes }: PermissionProps) => {
  const scopesMap: Record<string, boolean> = {};
  scopes.forEach((scope) => {
    scopesMap[scope] = true;
  });
  return permissions.some((permission: ScopeValues) => scopesMap[permission]);
};

export default function PermissionsGate({
  children,
  scopes = [],
  RenderError,
  errorProps,
}: PermissionsGateProps) {
  const { role } = useGetRole();
  const permissions: Scopes[] = PERMISSIONS[role];
  const permissionGranted = hasPermission({ permissions, scopes });
  if (!permissionGranted && !errorProps) return <>{RenderError}</>;
  if (!permissionGranted && errorProps)
    return cloneElement(children as ReactElement, { ...errorProps });

  return <>{children}</>;
}
