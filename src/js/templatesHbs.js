// Templates HBS
(function( $ ) {
    $(document).ready(function(){           
        $.when(
            $.ajax({  
                dataType: "json",
                url: './datas/characters.json'
            })
        ).done(function(datasCharacters){   
            var allDatas = { characters: datasCharacters };
            $('#main').html(smaSpecialsCharacters.templates.main(allDatas));             
        });          
    });
})(jQuery); 