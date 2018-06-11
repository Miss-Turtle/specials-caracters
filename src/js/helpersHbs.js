// Helpers HBS

// Verify if two values are equal
Handlebars.registerHelper('isEqual', function(dataSource, DataToCompare){
    if(dataSource == DataToCompare){
        return true;
    }
    return false;
});

// Transform a data table in a checkbox list for filter
Handlebars.registerHelper('filterCheckbox', function(dataSource, options){   
    var datasFilter = [];
    dataSource.reduce(function(currentElement, nextElement){
        if(datasFilter.length == 0){
            datasFilter.push(currentElement.type);
        } 
        else {
            if(datasFilter.indexOf(nextElement.type) < 0){
                datasFilter.push(nextElement.type);
            }
        }
        return datasFilter;
    });
    var htmlRenderer =  '';
    datasFilter.forEach(function(element){
        var idName = element.replace(/ /gi, '-').replace(/é/gi, 'e').replace(/è/gi, 'e');
        htmlRenderer += '<div class="form-check">';
        htmlRenderer += '<input class="form-check-input" type="checkbox" value="' + element + '" id="' + idName + '">';
        htmlRenderer += '<label class="form-check-label" for="' + idName + '">';
        htmlRenderer += element;
        htmlRenderer += '</label>';
        htmlRenderer += '</div>';
    });
    return htmlRenderer;
});

// Transform a data table in a checkbox list for filter
Handlebars.registerHelper('replaceHelper', function(dataSource, options){ 
    var replaceName = dataSource.replace(/ /gi, '-').replace(/é/gi, 'e').replace(/è/gi, 'e');
    return replaceName;
});