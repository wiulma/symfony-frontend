export default (user) => {
    return `<div class="wrapper">
        <!-- Bootstrap NavBar -->
        <nav class="navbar navbar-expand-md navbar-dark bg-primary">
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#">
                <img src="https://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg" width="30" height="30"
                    class="d-inline-block align-top" alt="">
                <span class="menu-collapsed">Sample</span>
            </a>
            <div class="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
                <div class="navbar-nav">
                    <ul>
                        <li class="nav-item">
                            <a id="link-home" class="nav-link home" href="#private/dashboard" data-navigo>Home</a>
                        </li>
                    </ul>
                    <app-profile-menu></app-profile-menu>
                </div>
                <ul class="navbar-nav">
                    <li class="nav-item dropdown account">
                        <a class="nav-link dropdown-toggle" id="dropdownMenuButton" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <FontAwesomeIcon icon={faUser} size="1x" />
                            <span class="label">${user.name}</span>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a href="#" id="mnuChangePwd" class="nav-link" data-i18n="ChangePassword"></a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a href="#" id="mnuLogout" class="nav-link">
                            <FontAwesomeIcon icon={faSignOutAlt} class="menu-icon" />
                            <span class="label" data-i18n="Logout"></span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav><!-- NavBar END -->
    
        <!-- MAIN -->
        <div class="col" id="main-content">
            <app-dashboard></app-dashboard>
        </div>
    
    </div>`;
}
