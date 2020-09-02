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

    router.addd('/upcoming-launch', () => {
        let html = upcomingTemplate();
        el.html(html);
    });






});