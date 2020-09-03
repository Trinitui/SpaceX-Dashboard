const { Router } = require("express");

window.addEventListener('load', () => {
    const el = $('#app');

    // Complile HandleBar Templates (What does this mean???)
    const errorTemplate = Handlebars.compile($('#error-template').html());
    const dashboardTemplate = Handlebars.compile($('#dash-template').html());
    const lastTemplate = Handlebars.compile($('#latest-launch-template').html());
    const upcomingTemplate = Handlebars.compile($('#upcoming-launch-template').html());

    //router declaration
        // This first section defines what happens when the route can not be matched to a template defined above and in index.html. The code uses errorTemplate
        // and then creates a Title and Message to be displayed
    const router = new Router({
        mode: 'history',
        page404: (path) => {
            const html = errorTemplate({
                color: 'white',
                title: 'Error 404 - Page NOT Found!',
                message: `The patch '/${path}' does not exist on this site`,
            });
            el.html(html);
        },
    });

        // This whole section, these three template declarations, tell the site what to do when each of these paths are hit
    router.add('/',() => {
        let html = dashboardTemplate();
        el = html(html);
    });

    router.add('/latest-launch', () => {
        let html = lastTemplate();
        el.html(html);
    });

    router.add('/upcoming-launch', () => {
        let html = upcomingTemplate();
        el.html(html);

    });

    // Navigate app to current URL
    router.navigateTo(window.location.pathname);

    // Highlight Active Menu on Refresh/Page Reload
    const link = $(`a[href$='${window.location.pathname}']`);
    link.addClass('active');

    $('a').on('click', (event) => {
        //block browser page load
        event.preventDefault();

        //Highlight active menu on click
        const target = $(event.target);
        $('.item').removeClass('active');
        target.addClass('active');

        //Navigate to a clicked URL
        const href = target.attr('href');
        const path = href.substr(href.lastIndexOf('/'));
        router.navigateTo(path);
    });








});