import { ADMIN_USER } from './aws/iam';

/**
 * @note Must import & use ≥1 resource from all subfiles in order for Pulumi to recognize
 */

export const ADMIN_USER_NAME = ADMIN_USER.name;
