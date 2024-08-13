import { Roles } from "@/utils/permission-maps";
export const useGetRole = () => {
  const role = Roles.Owner;
  return { role };
};
