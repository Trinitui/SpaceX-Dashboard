window.addEventListener('load', () => {
    const el = $('#app');

    // Complile HandleBar Templates (What does this mean???)
    const errorTemplate = Handlebars.compile($('#error-template').html());
    const dashboardTemplate = Handlebars.compile($('#dash-template').html());
    const lastTemplate = Handlebars.compile($('#latest-launch-template').html());
    const upcomingTemplate = Handlebars.compile($('#upcoming-launch-template').html());

    const html = dashboardTemplate();
    el.html(html);
});