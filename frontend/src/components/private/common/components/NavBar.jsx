import * as React from 'react';

export default (props) => (

    <nav class="navbar navbar-expand-md navbar-dark bg-primary">
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
            data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">
            <img src="https://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg" width="30" height="30"
                class="d-inline-block align-top" alt="" />
            <span class="menu-collapsed">Sample</span>
        </a>
        <div class="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
            <div class="navbar-nav">
                <ul>
                    <li class="nav-item">
                        <a id="link-home" class="nav-link home" href="#private/dashboard" data-navigo>Home</a>
                    </li>
                </ul>
                <Component ></Component></app-profile-menu>
            </div>
            <div class="navbar-nav">
                <ul>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false" data-i18n="Profile"></a>
                        <div class="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                                <a class="dropdown-item" href="#" id="menuChangePwd" data-i18n="ChangePassword"></a>
                                <a class="dropdown-item" href="#" id="menuLogout" data-i18n="Logout"></a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);