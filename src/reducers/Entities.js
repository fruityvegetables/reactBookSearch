import {
  OPEN_CREATE_MODAL,
  OPEN_CREATE_PAGE,
  OPEN_VIEW_MODAL,
  CLOSE_CREATE_MODAL,
  CLOSE_CREATE_PAGE,
  CLOSE_VIEW_MODAL,
  GET_PAGINATED_DATA_SAGA,
  GET_PAGINATED_DATA_START,
  CREATE_RESOURCE_SAGA,
  CREATE_RESOURCE_START,
  CREATE_RESOURCE_SAGA_END,
  CLOSE_ALERT,
  CREATE_RESOURCE_SAGA_ERROR,
  GET_ONE_ENTITY_SAGA,
  OPEN_UPDATE_MODAL_START,
  OPEN_UPDATE_MODAL,
  OPEN_UPDATE_PAGE,
  GET_ONE_ENTITY_SAGA_END,
  UPDATE_RESOURCE_SAGA,
  UPDATE_RESOURCE_SAGA_ERROR,
  GET_NO_ENTITY,
  GET_ENTITY_ERROR,
  UPDATE_RESOURCE_START,
  UPDATE_RESOURCE_SAGA_GENERAL_ERROR,
  CREATE_RESOURCE_SAGA_GENERAL,
  CREATE_RESOURCE_SAGA_CONFIG_ERROR,
  RENDER_DELETE_CONFIRMATION,
  CLOSE_DELETE_CONFIRMATION,
  DELETE_RESOURCE_START,
  DELETE_RESOURCE_SAGA,
  GET_ONE_ENTITY_START,
  GET_EXTRA_DATA_SAGA,
} from "constants/ActionTypes";
  
  const INIT_STATE = {
    isCreateModalOpen: false,
      isUpdateModalOpen: false,
      paginatedData: [],
      isEntityListEmpty: false,
      ispageDataLoading: false,
      createdData: {},
      isCreatedDataLoading: false,
      isSuccess: false,
      isFailed: false,
      isUpdateFailedWithGenError: false,
      entity: {},
      isUpdateDataLoading: false,
      isUpdateFailed: false,
      isUpdateDataLoading: false,
      isGetResourceFailed: false,
      errorObject: {},
      updateErrorObject: {},
      isFailedWithGeneralError: false,
      configError: [],
      updateConfigError: [],
      isConfigError: false,
      isDeleteConfirmOpen: false,
      isDeleteLoading: false,
      isDeleteSuccessful: false,
      paginatedDataCount: 0,
      isViewModalOpen: false,
      extraData: [],
      isIssuerAddedSuccessfully: false,
      isAddIssuersLoading: false,
      client: {},
      isIssuerDeleting: false
  };
  
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_PAGINATED_DATA_SAGA: {
          const { data, count } = action.payload;
          return {
            ...state,
            paginatedData: data,
            paginatedDataCount: count,
            ispageDataLoading: false,
            isEntityListEmpty: false
          }
      }
      case GET_PAGINATED_DATA_START: {
        return {
          ...state,
          ispageDataLoading: true
        }
      }
      case GET_NO_ENTITY: {
        return {
          ...state,
          isEntityListEmpty: true
        }
      }
      case GET_ENTITY_ERROR: {
        return {
          ...state,
          isGetResourceFailed: true
        }
      }
      case OPEN_CREATE_MODAL: {
          return {
            ...state,
            isCreateModalOpen: true
          }
      }
      case OPEN_CREATE_PAGE: {
        return {
          ...state,
          isCreatePageOpen: true,
          otherData: action.payload
        };
      }
      case CLOSE_CREATE_MODAL: {
        return {
          ...state,
          isCreateModalOpen: false,
          isUpdateModalOpen: false
        }
      }
      case CREATE_RESOURCE_START: {
        return {
          ...state,
          isCreatedDataLoading: true
        }
      }
      case CREATE_RESOURCE_SAGA: {
        const newPaginatedData = [action.payload, ...state.paginatedData];
        const newPaginatedDataCount = state.paginatedDataCount + 1
        return {
          ...state,
          createdData: action.payload,
          paginatedData: newPaginatedData,
          paginatedDataCount: newPaginatedDataCount,
          isSuccess: true
        }
    }
    case CREATE_RESOURCE_SAGA_END: {
      return {
        ...state,
        isCreatedDataLoading: false,
        isCreateModalOpen: false,
        isCreatePageOpen: false
      };
    }
    case CLOSE_ALERT: {
      return {
          ...state,
          isSuccess: false,
          isFailed: false,
          isUpdateFailed: false,
          isUpdateFailedWithGenError: false,
          isDeleteSuccessful: false,
          isFailedWithGeneralError: false,
          isConfigError: false
      }
    }
    case CREATE_RESOURCE_SAGA_ERROR: {
      return {
        ...state,
        isFailed: true,
        isCreatedDataLoading: false,
        errorObject: action.payload
      };
    }
    case CREATE_RESOURCE_SAGA_CONFIG_ERROR: {
      return {
        ...state,
        isConfigError: true,
        isCreatedDataLoading: false,
        configError: action.payload
      };
    }
    case CREATE_RESOURCE_SAGA_GENERAL: {
      return {
        ...state,
        isFailedWithGeneralError: true,
        isCreatedDataLoading: false
      };
    }
    case OPEN_UPDATE_MODAL: {
      return {
        ...state,
        isUpdateModalOpen: true,
        entity: action.payload
      };
    }
    case OPEN_UPDATE_PAGE: {
      return {
        ...state,
        entity: action.payload
      };
    }
    case GET_ONE_ENTITY_START: {
      return {
        ...state,
        isModalLoading: true
      }
    }
    case GET_ONE_ENTITY_SAGA: {
      return {
        ...state,
        entity: action.payload,
        isModalLoading: false
      };
    }
    case GET_ONE_ENTITY_SAGA_END: {
      return {
        ...state
      };
    }
    case OPEN_UPDATE_MODAL_START: {
      return {
        ...state,
        isModalLoading: true
      };
    }
    case UPDATE_RESOURCE_START: {
      return {
        ...state,
        isUpdateDataLoading: true
      };
    }
    case UPDATE_RESOURCE_SAGA: {
      const entityIndex = state.paginatedData.findIndex(
        obj => obj.id === action.payload.id
      );
      const updatedArray = [...state.paginatedData];
      updatedArray[entityIndex] = action.payload;
      return {
        ...state,
        paginatedData: updatedArray,
        isUpdateModalOpen: false,
        isSuccess: true,
        isUpdateDataLoading: false,
        isModalLoading: false
      };
    }
    case UPDATE_RESOURCE_SAGA_ERROR: {
      return {
        ...state,
        updateErrorObject: action.payload,
        isUpdateFailed: true,
        isUpdateDataLoading: false,

      };
    }
    case UPDATE_RESOURCE_SAGA_GENERAL_ERROR: {
      return {
        ...state,
        isUpdateFailedWithGenError: true,
        isUpdateDataLoading: false,

      };
    }
    case RENDER_DELETE_CONFIRMATION: {
      return {
        ...state,
        isDeleteConfirmOpen: true
      };
    }
    case CLOSE_DELETE_CONFIRMATION: {
      return {
        ...state,
        isDeleteConfirmOpen: false
      };
    }
    case DELETE_RESOURCE_START: {
      return {
        ...state,
        isDeleteLoading: true
      };
    }
    case DELETE_RESOURCE_SAGA: {
      const newPaginatedData = state.paginatedData.filter(
        obj => !action.payload.includes(obj.id)
      );
      const newPaginatedDataCount =
        state.paginatedDataCount - action.payload.length;
      return {
        ...state,
        isDeleteLoading: false,
        isDeleteSuccessful: true,
        isDeleteConfirmOpen: false,
        paginatedData: newPaginatedData,
        paginatedDataCount: newPaginatedDataCount
      };
    }
    case OPEN_VIEW_MODAL: {
      return {
        ...state,
        isViewModalOpen: true,
        entity: action.payload
      };
    }
    case CLOSE_VIEW_MODAL: {
      return {
        ...state,
        isViewModalOpen: false
      };
    }
    case GET_EXTRA_DATA_SAGA: {
      return {
        ...state,
        extraData: action.payload,
      }
    }
    default:
      return state;
  }
};
