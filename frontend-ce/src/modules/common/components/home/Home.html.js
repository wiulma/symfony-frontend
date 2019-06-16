export default (user) => {
    return `<div class="wrapper">
        <nav class="navbar navbar-expand-md navbar-dark bg-primary-dark">
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
                            <i class="fas fa-user" size="1x"></i>
                            <span class="label">${user.name}</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                            <a href="#" id="mnuChangePwd" class="dropdown-item nav-link">
                                <i class="fas fa-key" class="menu-icon"></i>
                                <span class="label" data-i18n="changePassword"></span>
                            </a>
                            <a href="#" id="mnuLogout" class="dropdown-item nav-link">
                                <i class="fas fa-sign-out-alt" class="menu-icon"></i>
                                <span class="label" data-i18n="logout"></span>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    
        <div class="col" id="main-content">
            <app-dashboard></app-dashboard>
        </div>
    
    </div>`;
}
