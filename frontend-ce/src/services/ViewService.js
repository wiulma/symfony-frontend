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
    "U": {
      component: "home-user",
      module: "private-user"
    }
  }

}