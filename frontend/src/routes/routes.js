const dashRoutes = [
    {
        label: 'Dashboard',
        to: '/',
        labelDisable: true,
        icon:'bi bi-grid-fill',
        children: [
            {
                name: 'All Switchs',
                to: '/switches',
                exact: true,
                active: true
            },
        ]
    },
    {
        label: 'Plcs',
        to: '/plcs',
        labelDisable: true,
        icon:'bi bi-router-fill',
        children: [
            {
                name: 'All Switchs',
                to: '/plcs',
                exact: true,
                active: true
            },
            {
                name: 'Create',
                to: '/switches/create',
                exact: true,
                active: true
            },
        ]
    },
    {
        label: 'Users',
        to: '/users',
        labelDisable: false,
        icon:'bi bi-stack',
        children: [
            {
                name: 'Admin',
                to: '/devices/admin/',
                icon:'bi bi-pc-display-horizontal',
                exact: true,
                active: true
            },
            {
                name: 'Views',
                icon:'bi bi-printer',
                to: '/users/views',
                exact: true,
                active: true
            },
        ]
    },
    {
        label: 'Settings',
        to: '/settings',
        labelDisable: false,
        icon:'bi bi-tools',
        children: [
            {
                name: 'Backup',
                to: '/tools/backup/',
                icon:'bi bi-layer-backward',
                exact: true,
                active: true
            },
            {
                name: 'NetScan',
                to: '/tools/netscan',
                icon:'bi bi-upc-scan',
                exact: true,
                active: true
            },
        ]
    }
]

export default dashRoutes;