//共通の関数置き場

import $ from 'jquery';

export default {
    addNewText(to,input){
        let text = $(input).val();
        $(to).append('<p>'+text+'</p>');
        $(input).val('');
    }
}