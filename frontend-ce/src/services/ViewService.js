/**
 * View service
 * @description View Configurations
 */
export default {

  ROOT_AREA: "main",
  CONTENT_AREA: "main-content",

  profileView: {
    "A": {
      component: "home-admin",
      module: "private-admin"
    },
    "M": {
      component: "home-manager",
      module: "private-manager"
    },
    "U": {
      component: "home-user",
      module: "private-user"
    }
  }

}