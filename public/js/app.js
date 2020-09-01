window.addEventListener('load', () => {
    const el = $('#app');

    // Complile HandleBar Templates (What does this mean???)
    const errorTemplate = Handlebars.compile($('#error-template').html());
    const dashboardTemplate = Handlebars.compile($('#dash-template').html());
    const lastTemplate = Handlebars.compile($('#last-launch-template').html());
    const upcomingTemplate = Handlebars.compile($('#upcoming-launch-template').html());

    const html = lastTemplate();
    el.html(html);
    const html1 = dashboardTemplate();
    el.html(html1)
});