// Navigation
(function( $ ) {
    $(document).ready(function(){     
        $('#main').on('click', '.header', function(){
            console.log('test');
            var generation = '[';        
            for(var i = 0; i <= 10000 ; i++){
                generation += '{"';
                generation += i;
                generation += '" : "alt+0';
                generation += i;
                generation += '"},';
            }
            generation += ']';
            console.log(generation);  
        });        
        $('#main').on('click', '.filter-btn', function(){
            $('.filter-checkbox').slideToggle();
            $('.filter-btn .filter-arrow').toggleClass('rotateEffect'); 
            if($('input.form-check-input:checked').length == 0) {
                $('.character').removeClass('hideCheckedInput');
                $('.character').addClass('displayCheckedInput');
            }
            $('input.form-check-input').on('click', function(){
                if($(this).is(':checked')){      
                    if($('input.form-check-input:checked').length == 1) {
                        $('.character').addClass('hideCheckedInput');
                    }              
                    $('.character[attr-type=' + $(this).attr('id') + ']').removeClass('hideCheckedInput');
                    $('.character[attr-type=' + $(this).attr('id') + ']').addClass('displayCheckedInput');
                } 
                if($(this).is(':not(:checked)')) {
                    $('.character[attr-type=' + $(this).attr('id') + ']').removeClass('displayCheckedInput');
                    $('.character[attr-type=' + $(this).attr('id') + ']').addClass('hideCheckedInput');
                    if($('input.form-check-input:checked').length == 0) {
                        $('.character').removeClass('hideCheckedInput');
                        $('.character').addClass('displayCheckedInput');
                    }
                }                   
            }); 
        });
        var entityCharacters = [
            '.character-numerique',
            '.character-mnemonique',
            '.character-clavier'
        ]        
        entityCharacters.forEach(function(value){
            popupMessageOnItem('#main', 'mouseenter', '#htmlSpecialsCharacters', value + ' .bold', 'Cliquer pour copier<br>l\'entité dans<br>le presse papier', 'auto', 'hover');
            popupMessageOnItem('#main', 'mouseenter', '#htmlSpecialsCharacters', value, 'Entité copiée', 'top', 'click');
            copyTextOnClipboard('#main', value, 'pre.language-markup');
        });    

        // -------------------------------------------------------------------------------------------------------
        // FUNCTIONS
        // -------------------------------------------------------------------------------------------------------

        // Copy on clipboard a selected text after a button click
        function copyTextOnClipboard(template, button, elementToCopy){            
            $(template).on('click', button, function(){
                var copiedElement = $(this).find(elementToCopy);
                var temporaryInput = $('<input>');
                $(this).append(temporaryInput);
                temporaryInput.val(copiedElement.text()).select();
                document.execCommand('copy');
                temporaryInput.remove();                   
                window.setTimeout(function(){
                    $(button).popover('hide');
                }, 1200);  
            });
        }
        
        // Popup
        function popupMessageOnItem(template, eventLoad, target, referenceTarget, message, position, eventTrigger){
            $(template).on(eventLoad, target, function(){   
                var reference = $(referenceTarget);
                reference.popover({
                    animation: true,
                    container: 'body',
                    content: message,
                    html: true,
                    placement: position,
                    trigger: eventTrigger
                });                             
            });
        }
    });    
})(jQuery); 