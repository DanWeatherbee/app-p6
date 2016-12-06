/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* All of these tests are within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        it('allFeeds is defined', function() {
            /* Make sure that the
             * allFeeds variable has been defined and that it is not
             * empty.
             */
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });
        it('feedUrl is defined', function() {
            /* Loop through each feed
             * in the allFeeds object and ensures it has a URL defined
             * and that the URL is not empty.
             */
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });
        it('feedName is defined', function() {
            /* Loop through each feed
             * in the allFeeds object and ensures it has a name defined
             * and that the name is not empty.
             */
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });
    describe('The menu', function() {
        it('menu is hidden', function() {
            /* Ensure the menu element is
             * hidden by default.
             */
            expect($('body').hasClass("menu-hidden")).toBeTruthy();
        });
        it('menu changes when clicked', function() {
            /* Ensure the menu changes
             * visibility when the menu icon is clicked. This test
             * has two expectations: does the menu display when
             * clicked and does it hide when clicked again.
             */
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass("menu-hidden")).not.toBeTruthy();
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass("menu-hidden")).toBeTruthy();
        });
    });
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        it('loadFeed is called and completed and a entrie exists', function(done) {
            /* Ensure when the loadFeed
             * function is called and completes its work, there is at least
             * a single .entry element within the .feed container.
             */
            expect($('.feed')[0].children.length).toBeGreaterThan(0);
            done();
        });
    });
    describe('New Feed Selection', function() {
        var feedTest0,
            feedTest1;
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedTest0 = $('.feed')[0].children[0].textContent;
                loadFeed(1, done);
            });
        });
        it('loadFeed ran and feed content changed', function(done) {
            /*  Ensure when a new feed is loaded
             * by the loadFeed function that the content actually changes.
             */
            feedTest1 = $('.feed')[0].children[0].textContent;
            expect(feedTest0).not.toEqual(feedTest1);
            done();
        });
    });
}());