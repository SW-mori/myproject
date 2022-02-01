import $ from 'jquery';
import funcs from './functions';
import '../sass/style.scss';

$('#submmit').on('click',()=>{
    return funcs.addNewText('#app','#inputs');
})
