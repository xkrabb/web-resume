$(document).ready(function() {
    $('#fullpage').fullpage({
        sectionsColor: ['whitesmoke', 'whitesmoke', 'whitesmoke', 'whitesmoke'],
        menu: $('#head-menu'),
        // navigation: true,
        paddingTop: '50px',
        verticalCentered: false,
        afterLoad: function(anchorLink, index) {
            if(index == 3){
                $('.hied-score-hander').addClass('show-socre');
            }

        },
        onLeave: function(index, nextIndex, direction) {
            if(index == 1){
                $('.navbar').removeClass('nav-bar-first');
                $('.navbar').addClass('nav-bar-others');
            }
             if(index == 3){
                $('.hied-score-hander').removeClass('show-socre');
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