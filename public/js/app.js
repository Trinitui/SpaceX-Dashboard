//const {Router} = require("express");

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
                color: 'black',
                title: 'Error 404 - Page NOT Found!',
                message: `The path '/${path}' does not exist on this site`,
            });
            el.html(html);
        },
    });

        // This whole section, these three template declarations, tell the site what to do when each of these paths are hit
    //router.add('/',() => {
    //    let html = dashboardTemplate();
    //    el.html(html);
    //});
    // Instantiate api handler  
  
  // Display Error Banner
  const showError = (error) => {
    const { title, message } = error.response.data;
    const html = errorTemplate({ color: 'red', title, message });
    el.html(html);
  };
  
  // Display SpaceX Flight Number and Success
  router.add('/', async() => {
    console.log("hit router add /")
    // Display loader first
    let html = dashboardTemplate();
    el.html(html);
    console.log("should have displayed header and hr")
    try {
      // Load Launch, Success data ---
      console.log("about to pull spacex data into object")
      const response = await axios.get("https://api.spacexdata.com/v3/launches/");
      const { flight_number, launch_success } = response.data[0];
      console.log({ flight_number, launch_success });
      // Display Launch, Success Table
      html = dashboardTemplate({ flight_number, launch_success });
      el.html(html);
    } catch (error) {
      showError(error);
    } finally {
      // Remove loader status
      $('.loading').removeClass('loading');
    }
  });

    router.add('/latest-launch', () => {
        console.log("Hit latest launch")
        let html = lastTemplate();
        el.html(html);
    });

    router.add('/upcoming-launch', () => {
        console.log("Hit upcoming launch")
        let html = upcomingTemplate();
        el.html(html);

    });

    // Navigate app to current url
    router.navigateTo(window.location.pathname);

    // Highlight Active Menu on Refresh/Page Reload
    const link = $(`a[href$='${window.location.pathname}']`);
    link.addClass('active');

    $('a').on('click', (event) => {
        // Block browser page load
        event.preventDefault();

        // Highlight Active Menu on Click
        const target = $(event.target);
        $('.item').removeClass('active');
        target.addClass('active');

        // Navigate to clicked url
        const href = target.attr('href');
        const path = href.substr(href.lastIndexOf('/'));
        router.navigateTo(path);
        });








});