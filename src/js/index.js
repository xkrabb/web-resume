$(document).ready(function() {
    $('#fullpage').fullpage({
        sectionsColor: ['whitesmoke', '#4BBFC3', '#7BAABE', '#1bbc9b'],
        menu: $('#head-menu'),
        navigation: true,
        paddingTop: '50px',
        verticalCentered: false,
        afterLoad: function(anchorLink, index) {
            if(index == 1){
                
            }

        },
        onLeave: function(index, nextIndex, direction) {
            if(index == 1){
                $('.navbar').removeClass('nav-bar-first');
                $('.navbar').addClass('nav-bar-others');
            }
            if(nextIndex==1){
                $('.navbar').addClass('nav-bar-first');
            }


        },
        afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex) {

        },
        onSlideLeave: function( anchorLink, index, slideIndex, direction, nextSlideIndex) {

        }
    });
});