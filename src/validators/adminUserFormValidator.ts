import * as yup from "yup";
import {
  USER_ROLES,
  USER_STATUSES,
  type UserRole,
  type UserStatus,
} from "../types/user.ts";
import type { AdminUserFormData } from "../types/admin.ts";

export const adminUserFormValidator: yup.ObjectSchema<AdminUserFormData> =
  yup.object({
    role: yup.mixed<UserRole>().oneOf(USER_ROLES).optional(),
    status: yup.mixed<UserStatus>().oneOf(USER_STATUSES).optional(),
    bio: yup.string().optional(),
  });
