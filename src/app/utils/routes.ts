export const BASE_URL = 'http://localhost:8000'
export const VERSION = '/api/v1'
export const AUTH_URL = `${VERSION}/auth`
export const CREATE_USER = `/create_user`
export const LOGIN_URL = `/login_user`

// User Urls
export const LOGGED_IN_USER = `/logged_in_user`
export const GET_ALL_USER = `/get_all_user`

// Client Urls
export const CREATE_CLIENT = `/create_client`
export const GET_ALL_CLIENT = `/get_all_client`
export const GET_CLIENT_BY_ID = `/get_client_by_id/:id`
export const UPDATE_CLIENT_BY_ID = `/update_client_by_id/:id`

// Meeting and feedback Urls
export const SEND_EMAIL_TO_CLIENT = `/send_email_to_client`
export const GET_MEETING_BY_ID = `/get_meeting_by_id/:id`
export const GET_ALL_MEETING = `/get_all_meeting`
export const DELETE_MEETING_BY_ID = `/delete_meeting_by_id/:id`

// Campaign Urls
export const SEND_EMAIL_TO_CLIENTS = `/send_email_to_clients`
export const GET_CAMPAIGN_BY_ID = `/get_campaign_by_id/:id`
export const GET_ALL_CAMPAIGN = `/get_all_campaign`
export const DELETE_CAMPAIGN_BY_ID = `/delete_campaign_by_id/:id`

// Service Urls
export const CREATE_SERVICE = `/create_service`
export const GET_ALL_SERVICE = `/get_all_service`
export const GET_SERVICE_BY_ID = `/get_service_by_id/:id`
export const UPDATE_SERVICE_BY_ID = `/update_service_by_id/:id`
