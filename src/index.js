import Range from './Range.vue';

(function($){

    const elements = [];

    $.fn.multirange = function(){
        const name = this.attr('data-name');
        if(elements[name]) {
            console.info("Slider already created for this element");
            return;
        }
        this.append('<range ref="Range" :name="name"></range>');
        elements[name] = new Vue({
            el: '.multi-range',
            data: {
                name
            },
            components: {
                'range': Range
            }
        });
    }

    $.fn.getValues = function(){
        const name = this.attr('data-name');
        return elements[name].$refs.Range.getValues();
    };

})(jQuery);

$(document).ready(function(){
    $('.multi-range').multirange();
});