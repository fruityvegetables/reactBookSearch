import {
  OPEN_VIEW_MODAL,
  CLOSE_VIEW_MODAL,
  OPEN_CREATE_MODAL,
  OPEN_CREATE_PAGE,
  CLOSE_CREATE_MODAL,
  CLOSE_CREATE_PAGE,
  CREATE_RESOURCE,
  CREATE_RESOURCE_START,
  GET_PAGINATED_DATA,
  GET_PAGINATED_DATA_START,
  CLOSE_ALERT,
  GET_ONE_ENTITY,
  OPEN_UPDATE_MODAL,
  OPEN_UPDATE_PAGE,
  OPEN_UPDATE_MODAL_START,
  UPDATE_RESOURCE,
  UPDATE_RESOURCE_START,
  RENDER_DELETE_CONFIRMATION,
  CLOSE_DELETE_CONFIRMATION,
  DELETE_RESOURCE_START,
  DELETE_RESOURCE,
  GET_ONE_ENTITY_START,
  GET_EXTRA_DATA
} from "constants/ActionTypes";

export const openCreateModal = () => {
  return {
    type: OPEN_CREATE_MODAL
  };
};

export const openCreatePage = otherData => {
  return {
    type: OPEN_CREATE_PAGE,
    payload: otherData
  };
};

export const closeCreateModal = () => {
  return {
    type: CLOSE_CREATE_MODAL
  };
};

export const closeCreatePage = () => {
  return {
    type: CLOSE_CREATE_PAGE
  };
};

export const createResource = (data, baseEntityAPI) => {
  return {
    type: CREATE_RESOURCE,
    payload: { data, baseEntityAPI }
  };
};

export const createResourceStart = () => {
  return {
    type: CREATE_RESOURCE_START
  };
};

export const getPaginatedDataStart = () => {
  return {
    type: GET_PAGINATED_DATA_START
  };
};

export const getPaginatedData = (baseEntityAPI, page, rowsPerPage) => {
  return {
    type: GET_PAGINATED_DATA,
    payload: { baseEntityAPI, page, rowsPerPage }
  };
};

export const openUpdateModalStart = () => {
  return {
    type: OPEN_UPDATE_MODAL_START
  };
};

export const closeAlert = () => {
  return {
    type: CLOSE_ALERT
  };
};

export const openUpdateModal = payload => {
  return {
    type: OPEN_UPDATE_MODAL,
    payload
  };
};

export const openUpdatePage = (payload, otherData) => {
  return {
    type: OPEN_UPDATE_PAGE,
    payload
  };
};

export const getOneStart = () => {
  return {
    type: GET_ONE_ENTITY_START
  };
};

export const getOneEntity = (id, baseEntityAPI) => {
  return {
    type: GET_ONE_ENTITY,
    payload: { id, baseEntityAPI }
  };
};

export const updateResource = (data, id, baseEntityAPI) => {
  return {
    type: UPDATE_RESOURCE,
    payload: { data, id, baseEntityAPI }
  };
};

export const openViewModal = payload => {
  return {
    type: OPEN_VIEW_MODAL,
    payload
  };
};

export const closeViewModal = () => {
  return {
    type: CLOSE_VIEW_MODAL
  };
};

export const updateResourceStart = () => {
  return {
    type: UPDATE_RESOURCE_START
  };
};

export const renderDeleteConfirmation = () => {
  return {
    type: RENDER_DELETE_CONFIRMATION
  };
};

export const closeDeleteConfirmation = () => {
  return {
    type: CLOSE_DELETE_CONFIRMATION
  };
};

export const deleteResourceStart = () => {
  return {
    type: DELETE_RESOURCE_START
  };
};

export const deleteResource = (toDelete, baseEntityAPI) => {
  return {
    type: DELETE_RESOURCE,
    payload: { toDelete, baseEntityAPI }
  };
};

export const getExtraData = (extraEntitiesToFetch) => {
  return {
    type: GET_EXTRA_DATA,
    payload: { extraEntitiesToFetch }
  }
}
