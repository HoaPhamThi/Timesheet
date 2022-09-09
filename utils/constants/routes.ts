const HOME_PAGE: IRouteConstant = {
    href: '/',
};
const NOT_FOUND_PAGE: IRouteConstant = {
    href: '/404',
};
const WORKSHEET_PAGE: IRouteConstant = {
    href: '/worksheet',
};
const ADMIN_PAGE: IRouteConstant = {
    href: '/admin',
};

const PROFILE_PAGE: IRouteConstant = {
    href: '/edit-profile',
};
export const CLIENT = {
    NOT_FOUND: NOT_FOUND_PAGE,
    WORKSHEET: WORKSHEET_PAGE,
    ADMIN: ADMIN_PAGE,
    HOME: HOME_PAGE,
    PROFILE: PROFILE_PAGE,
};

const POST_API: IRouteConstant = {
    href: '/posts',
};
const LOGIN_API: IRouteConstant = {
    href: '/login',
};
const PROFILE_API: IRouteConstant = {
    href: '/profile',
};
const CHANGE_PASSWORD_API: IRouteConstant = {
    href: '/change-pass',
};
const EDIT_PROFILE_API: IRouteConstant = {
    href: '/members/edit',
};
const UPDATE_PROFILE_API: IRouteConstant = {
    href: '/members/update',
};
const API_HOME: IRouteConstant = {
    href: '/home',
};
const WORKSHEET_API: IRouteConstant = {
    href: '/worksheets',
};
const REGISTER_FORGET: IRouteConstant = {
    href: '/worksheets/register-forget/create',
};
const UPDATE_FORGET: IRouteConstant = {
    href: '/worksheets/register-forget/update',
};
const REGISTER_LATE_EARLY: IRouteConstant = {
    href: '/worksheets/register-late-early/create',
};
const UPDATE_LATE_EARLY: IRouteConstant = {
    href: '/worksheets/register-late-early/update',
};
const REGISTER_OVERTIME: IRouteConstant = {
    href: '/worksheets/register-ot/create',
};
const UPDATE_OVERTIME: IRouteConstant = {
    href: '/worksheets/register-ot/update',
};

export const API = {
    LOGIN: LOGIN_API,
    PROFILE: PROFILE_API,
    CHANGE_PASSWORD: CHANGE_PASSWORD_API,
    POST: POST_API,
    EDIT_PROFILE: EDIT_PROFILE_API,
    UPDATE_PROFILE: UPDATE_PROFILE_API,
    HOME_NOTICE: API_HOME,
    WORKSHEET: WORKSHEET_API,
    FORGET: REGISTER_FORGET,
    UPDATE_FORGET_MODAL: UPDATE_FORGET,
    POST_LATE_EARLY: REGISTER_LATE_EARLY,
    EDIT_LATE_EARLY: UPDATE_LATE_EARLY,
    OVERTIME: REGISTER_OVERTIME,
    UPDATE_OVERTIME_MODAL: UPDATE_OVERTIME,
};
