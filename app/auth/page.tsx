"use client";
import PermissionsGate from "@/components/PermissionsGate";
import { Scopes } from "@/utils/permission-maps";

export default function Authen() {
  const Content = <T extends object>(props: T) => {
    console.log("props", props);
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {Scopes.CanEdit}
      </main>
    );
  };

  return (
    <PermissionsGate
      RenderError={<p>You shall not pass!</p>}
      errorProps={{ disabled: false }}
      scopes={[Scopes.CanEdit]}
    >
      <Content />
    </PermissionsGate>
  );
}
